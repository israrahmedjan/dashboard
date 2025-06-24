
import connectToDatabase from "@/lib/dbconfig";
// import { uploadImage } from "@/lib/helper";

import { v2 as cloudinary } from "cloudinary";
// Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export async function POST(request) {
  try {
    const formData = await request.formData();
    const name = formData.get("name");
    const slug = formData.get("slug");
    const description = formData.get("description");
    const image = formData.get("image"); // File object

    if (!name || !image) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and image are required" }),
        { status: 400 }
      );
    }
    const uploadResult = await uploadImage(image,"fashion/Category");
    const thumbImage = uploadResult.secure_url.replace('/upload/', '/upload/w_326,h_295,c_fill/');

   const conn = await connectToDatabase();
    const categoriesCollection = conn.collection("Categories");
console.log(uploadResult);
    const newDoc = {
      name,
      slug,
      description,
      image: uploadResult.secure_url,
      imageThumb: thumbImage,
      publicId: uploadResult.public_id,
      createdAt: new Date(),
    };

    const result = await categoriesCollection.insertOne(newDoc);
    // Cloudinary transformation URL for thumbnail (150x150, cropped)


    return new Response(
      JSON.stringify({
        success: true,
        name,
        imageUrl: uploadResult.secure_url,
        publicId: uploadResult.public_id,
      }),
      { status: 200 }
    );
  
  } catch (error) {
    console.error("Image upload failed:", error);
    return new Response(
      JSON.stringify({
  success: false,
  message: error.message,
  errorType: error.name,
  stack: error.stack, // optional: dev env mein hi dikhayen
}),
      { status: 500 }
    );
  }
}



export async function uploadImage(image,dir="fashion")
{

      // Buffer se base64 string banayein
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");
    const dataURI = `data:${image.type};base64,${base64Image}`;

    // Direct upload using base64 dataURI
    const uploadResult = await cloudinary.uploader.upload(dataURI, {
      folder: dir, // optional
    });

    return uploadResult;
}
