import { ObjectId } from "mongodb";
import connectToDatabase from "@/lib/dbconfig";
import { NextResponse } from "next/server";

import { v2 as cloudinary } from "cloudinary";
// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get("id"); // e.g., /api/category?id=123
    const imageID = searchParams.get("imageID").toString();
    

   

  console.log("Image id is", imageID);

    if (!categoryId) {
      return NextResponse.json({ success: false, message: "ID is required" }, { status: 400 });
    }

    const conn = await connectToDatabase();
    const categoriesCollection = conn.collection("Categories");

    // Delete document by ID
    const result = await categoriesCollection.deleteOne({
      _id: new ObjectId(categoryId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ success: false, message: "Category not found or already deleted" }, { status: 404 });
    }
        await deleteCloudinaryImage(imageID);
    return NextResponse.json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function deleteCloudinaryImage(publicId) {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    console.log("Deleted from Cloudinary:", result);
    return result;
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    return null;
  }
}
