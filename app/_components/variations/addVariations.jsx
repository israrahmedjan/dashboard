"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";


import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";

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
import { variationsSchema } from "./variationsSchema";
import { number } from "zod";
import { getProducts } from "./variationsFunc";

// ✅ Zod schema with file validation

export function AddVariations() {
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message, setMessage } = useMessageStore();
  const [product,setProduct] = useState([]);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(variationsSchema),
    defaultValues: {
      name: "myname",
      productId: "",
      size: "Small",
      color: "Green",
      description: "this is descriptions",
      price : 1,
      stock: 1,
      image: null,
      imageUrl: "none"
    },
  });

 
  const onSubmit = async (data) => {


    try {


      setLoading(true);
      console.log("Form Data:", data);
      console.log("Uploaded Image File:", data.image); // File object


 


      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("productId", data.productId);
      formData.append("size", data.size);
      formData.append("color", data.color);
      formData.append("description", data.description);
      formData.append("price", data.price);
      formData.append("stock", data.stock); 
      formData.append("image", data.image);  
      console.log("Form Data", formData)
      const response = await fetch("/api/variations/addvariations", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Response from server:", result);
      if (result.success) {
        setMessage("Success", "Variations Added Successfully!");
        setLoading(false);
        router.push("/variations");
      }
    }
    catch (error) {
      console.log(error.message)
    }

  };


  useEffect(() => {
    setClient(true);

    const fetchProducts = async ()=>
    {
      const data = await getProducts();
      setProduct(data);
      console.log("Get Products data",data);
    }
    fetchProducts();
  }, []);

  if (!client) return null;

  return (
  <section className="p-4 sm:p-6 md:p-10 bg-white rounded-md shadow-sm max-w-4xl mx-auto">
  <div className="flex flex-col gap-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4">
      <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
        <ChartBarStacked size={30} /> <span>Variations / Add</span>
      </h1>
      <div className="mt-4 md:mt-0">
        {/* Optional: Link to go back */}
        <Button variant="outline">Go Back</Button>
      </div>
    </div>

    {/* Form */}
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
  console.log("Validation Errors:", errors);
})} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Name Field */}
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

          {/* Slug Field */}
          <FormField
            control={form.control}
            name="size"
            render={({ field }) => (
              <FormItem>
                <FormLabel>size</FormLabel>
                <FormControl>
                  <Input placeholder="Size" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
               <FormField control={form.control} name="productId" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Products</FormLabel>
                   <select
  value={field.value}
  onChange={(e) => field.onChange(e.target.value)} // not array
  className="w-full border rounded-md p-2"
>
        <option value="">-- Select One Product --</option> {/* This is the placeholder option */}
                      {product?.map((prod, index) => (
                        <option key={index} value={prod._id}>{prod.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )} />

        </div>

        {/* color price and stock */}


        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Color Field */}
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

          {/* Price Field */}
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

                {/* Stock Field */}
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

        {/* Description Field */}
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

        {/* Image Field */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            {!loading ? "Add Variations" : "Adding..."}
          </Button>
        </div>
      </form>
    </Form>
  </div>
</section>

  );
}
