
import connectToDatabase from "@/lib/dbconfig";
// import { uploadImage } from "@/lib/helper";

import { v2 as cloudinary } from "cloudinary";
import { ObjectId } from "mongodb";
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
    let productId = formData.get("productId").toString();
   
 productId = new ObjectId(productId);
    const size = formData.get("size");
    const color = formData.get("color");
    const description = formData.get("description");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const image = formData.get("image"); 

    if (!name || !image) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and image are required" }),
        { status: 400 }
      );
    }
    const uploadResult = await uploadImage(image,"fashion/gallery");

   const conn = await connectToDatabase();
    const galleryCollection = conn.collection("Galleries");
console.log(uploadResult);
    const newDoc = {
      name,
      productId : productId,
      size,
      color,
      description,
      price,
      stock,
      image: uploadResult.secure_url,
      imageThumb: uploadResult.secure_url,
      publicId: uploadResult.public_id,
      createdAt: new Date(),
    };

    const result = await galleryCollection.insertOne(newDoc);
if (result.acknowledged) {
  console.log("✅ Data inserted successfully!");
  console.log("🆔 Inserted ID:", result.insertedId.toString());
  const galleryId = result.insertedId.toString();
  UpdateProductById(galleryId,productId)
}

if(result.acknowledged)
{

}

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

async function UpdateProductById(galleryId, productId) {
  const galleryObjectId = new ObjectId(galleryId);
  const productObjectId = new ObjectId(productId);

     const conn = await connectToDatabase();
    const productCollection = conn.collection("Products");
  const result = await productCollection.updateOne(
    { _id: productObjectId }, // find product by ID
    {
      $push: { galleryId: galleryObjectId }, // push variationId to array
    }
  );
}