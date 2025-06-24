import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/dbconfig";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const galleryId = searchParams.get("id"); // e.g., /api/category?id=123
    

    if (!galleryId) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const conn = await connectToDatabase();
    const galleryCollection = conn.collection("Galleries");

    // Convert string ID to ObjectId and fetch
    const category = await galleryCollection.findOne({
      _id: new ObjectId(galleryId),
    });
//console.log("publi id find!",category)
    if (!category) {
      return NextResponse.json({ success: false, message: "Variations not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    console.error("Error fetching Variations by ID:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
