import { NextResponse } from "next/server";
import connectToDatabase from "@/lib/dbconfig";

export async function GET(request) {
    try {

        

        const conn = await connectToDatabase();
        const categoryCollection = conn.collection("Categories");

        const data = await categoryCollection.aggregate(
            [
                { $sort: { name: 1 } },
              
            ], {
            maxTimeMS: 60000,
            allowDiskUse: true,
        }).toArray();

        




            

        // ✅ 1. Data Found
       
      
        if (data && data.length > 0) {
            return NextResponse.json({ success: true, data,data }, { status: 200 });
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
