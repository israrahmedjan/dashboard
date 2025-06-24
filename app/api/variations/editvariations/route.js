
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
    const size = formData.get("size");
    const color = formData.get("color");
    const description = formData.get("description");
    const price = formData.get("price");
    const stock = formData.get("stock");
    const variationdId = formData.get("variationdId").toString();
    const imageUrl = formData.get("imageUrl").toString();
  const imageId = formData.get("publicId").toString();

  console.log("Image id for delete",imageId)
  
    
    

    
    const image = formData.get("image"); // File object
  

    if (!name) {
      return new Response(
        JSON.stringify({ success: false, message: "Name and are required" }),
        { status: 400 }
      );
    }
   let newImage;

let publicId="";   
if (image && image.name && image.size > 0) {
  // Image provided, upload it
  const uploadResult = await uploadImage(image, "fashion/variations");
  await deleteCloudinaryImage(imageId);
  if(uploadResult)
  {
    newImage = uploadResult.secure_url;
    publicId = uploadResult.public_id;
  }
  
} else {
  // No image provided, use old image
  newImage = imageUrl; 
  publicId = imageId; 
  // make sure you have 'oldImage' value from DB or request
}
    

   const conn = await connectToDatabase();
    const variationsCollection = conn.collection("Variations");

const result = await variationsCollection.updateOne(
    { _id: new ObjectId(variationdId) }, // Filter by _id
    {
      $set: {
        name: name,
        size: size,
        color: color,
        description: description,
        price: price,
        stock:stock,
        image: newImage,
        publicId: publicId,
        // status: "active",
        updatedAt: new Date() // Optional: update timestamp
      }
    }
  );

  console.log("Update Result:", result);


    


    return new Response(
      JSON.stringify({
        success: true,
        name,
        _id: "id",
        publicId: "id",
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