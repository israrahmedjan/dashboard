import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

export async function GET(request) {
    try {

        const { searchParams } = new URL(request.url);

        const page = parseInt(searchParams.get("page")) || 1;
        const sort = parseInt(searchParams.get("sort")) || 1;
        const limit = parseInt(searchParams.get("limit")) || 10;
        const search = searchParams.get("search") || "";

        const skip = (page - 1) * limit;
        console.log(`page = ${page} limit = ${limit} skip = ${skip} search= ${search}`);
        //console.table(page,limit,skip);

        const conn = await connectToDatabase();
        const categoryCollection = conn.collection("Categories");

        const data = await categoryCollection.aggregate(
            [
                {
                $match: {
                    name: { $regex: search, $options: 'i' }
                }
                },
                { $sort: { name: sort } },
                { $skip: skip },
                { $limit: limit }
            ], {
            maxTimeMS: 60000,
            allowDiskUse: true,
        }).toArray();

        const totaldata = await categoryCollection.aggregate(
  [
    {
      $match: {
        name: { $regex: search, $options: 'i' }
      }
    },
    { $count: 'total' }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
).toArray();




            

        // ✅ 1. Data Found
       
       let total = (totaldata.length>0)?totaldata[0].total:0
        console.log("Total Data",total)
        if (data && data.length > 0) {
            return NextResponse.json({ success: true, data,total:total }, { status: 200 });
        }

        // ✅ 2. Data Empty
        return NextResponse.json({ success: false, message: "No categories found." }, { status: 404 });

    } catch (error) {
        // ✅ 3. Error Occurred
        console.error("Error fetching categories:", error);
        return NextResponse.json(
            { success: false, message: "Server error", error: error.message },
            { status: 500 }
        );
    }
}
