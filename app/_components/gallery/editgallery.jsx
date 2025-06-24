"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";
import { gallerySchema } from "./gallerySchema";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { ChartBarStacked } from "lucide-react";
import { useEffect, useState } from "react";
import useMessageStore from "@/store/useMessageStore";
import { getgalleryById, getvariationsById } from "./galleryOperations";

// ✅ Zod validation schema


export function EditGallery() {
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const router = useRouter();
  const params = useParams();
  const galleryId = params.id;
  const { message, setMessage } = useMessageStore();

  const form = useForm({
    resolver: zodResolver(gallerySchema),
    defaultValues: {
      name: "",
      productId: "",
      size: "",
      color: "",
      description: "",
      price : 1,
      stock : 1,
      image: null,
      imageUrl: "",
      publicId: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data) => {
    try {
      console.log("Submit Button is Called!");
      setLoading(true);
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("productId", data.productId);
      formData.append("size", data.size);
      formData.append("color", data.color);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock);

      if (data.image && data.image.size > 0) {
        formData.append("image", data.image);
      }

      formData.append("galleryId", galleryId);
      formData.append("imageUrl", data?.imageUrl);
      formData.append("publicId", data?.publicId);

      const response = await fetch("/api/gallery/editgallery", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Success", "Gallery Image Updated Successfully!");
        setLoading(false);
        router.push("/gallery");
      }
    } catch (error) {
      console.log("Error submitting form:", error.message);
    }
  };

  const getVariationsHandle = async () => {
    const fetchedData = await getgalleryById(galleryId);
    setData(fetchedData);

    reset({
      name: fetchedData.name || "",
      productId: "noproductID" || "",
      size : fetchedData.size || "",
      color : fetchedData.color || "",
      description: fetchedData.description || "",
      price : fetchedData.price || "",
      stock : fetchedData.stock || "",
      image: null,
      imageUrl: fetchedData.image || "",
      publicId: fetchedData.publicId || "",
    });
  };

  useEffect(() => {
    setClient(true);
    getVariationsHandle();
  }, []);

  if (!client) return null;

  return (
    <section className="p-4 sm:p-6 md:p-10 bg-white rounded-md shadow-sm max-w-4xl mx-auto bg-">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <ChartBarStacked size={30} />
            <span>Gallery / Edit </span>
                 </h1>
          <div className="mt-4 md:mt-0">
            <Button variant="outline">Go Back</Button>
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Hidden Fields */}
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />
              <FormField
                control={form.control}
                name="publicId"
                render={({ field }) => (
                  <input type="hidden" {...field} />
                )}
              />

              {/* Name */}
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Category Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Sizw */}
              <FormField
                control={form.control}
                name="size"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Input placeholder="slug-name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

{/* color size and stock */}
 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              {/* Sizw */}
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input placeholder="Color" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Sizw */}
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="price" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              {/* Stock */}
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="Stock" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

 </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write description..."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Image Upload */}
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => field.onChange(e.target.files[0])}
                    />
                  </FormControl>
                  <FormDescription>Upload a category image.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
           
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
              >
                {!loading ? "Update Variations  " : "Updating..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
