
import connectToDatabase from "@/lib/dbconfig";
// import { uploadImage } from "@/lib/helper";
import { ObjectId } from "mongodb";

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
    const categoryId = formData.get("categoryId")

    // Convert to array of ObjectIds
const categoryIdArray = categoryId
  .split(",")
  .map(id => new ObjectId(id.trim()));
    const stock = formData.get("stock");
    const price = formData.get("price");
    const sku = formData.get("sku");
    const brand = formData.get("brand");
    const status = formData.get("status"); 
 const image = formData.get("image"); 
    

    if (!name || !image) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and image are required" }),
        { status: 400 }
      );
    }
    const uploadResult = await uploadImage(image,"fashion/Product");
    const thumbImage = uploadResult.secure_url.replace('/upload/', '/upload/w_278,h_365,c_fill/');

   const conn = await connectToDatabase();
    const productCollection = conn.collection("Products");
console.log(uploadResult);


    const newDoc = {
      name,
      slug,
      description,
      stock,
      price,
      sku,
      brand,
      //categoryId:categoryId.split(","),
       categoryId: categoryIdArray,
      image: uploadResult.secure_url,
      imageThumb: thumbImage,
      status,
      publicId: uploadResult.public_id,
      createdAt: new Date(),
    };

    const result = await productCollection.insertOne(newDoc);

    return new Response(
      JSON.stringify({
        success: true,
        name,
        imageUrl: uploadResult.secure_url,
        imageID: uploadResult.public_id,
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
