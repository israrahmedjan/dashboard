import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const variationdId = searchParams.get("id"); // e.g., /api/category?id=123
    

    if (!variationdId) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const conn = await connectToDatabase();
    const variationsCollection = conn.collection("Variations");

    // Convert string ID to ObjectId and fetch
    const category = await variationsCollection.findOne({
      _id: new ObjectId(variationdId),
    });
console.log("publi id find!",category)
    if (!category) {
      return NextResponse.json({ success: false, message: "Variations not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Error fetching Variations by ID:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
