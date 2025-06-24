"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

// ✅ Zod schema with file validation
const formSchema = z.object({
  name: z.string().min(2, {
    message: "Category Name must be at least 2 characters.",
  }),
  slug: z.string().min(2, {
    message: "Slug must be at least 2 characters.",
  }),
  description: z.string(),
  image: z
    .any()
  .refine((file) => file instanceof File || file?.length > 0, {
    message: "Image is required.",
  }),
});

export function AddCategory() {
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { message, setMessage } = useMessageStore();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "myname",
      slug: "slug",
      description: "this is descriptions",
      image: null,
    },
  });

  const onSubmit = async (data) => {


    try {


      setLoading(true);
      console.log("Form Data:", data);
      console.log("Uploaded Image File:", data.image); // File object



      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug)
      formData.append("description", data.description)    // text field
      formData.append("image", data.image);  // File object from input (use [0])
      console.log("Form Data", formData)
      const response = await fetch("/api/category/addCategory", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      console.log("Response from server:", result);
      if (result.success) {
        setMessage("Success", "Category Added Successfully!");
        setLoading(false);
        router.push("/categories");
      }
    }
    catch (error) {
      console.log(error.message)
    }

  };


  useEffect(() => {
    setClient(true);
  }, []);

  if (!client) return null;

  return (
  <section className="p-4 sm:p-6 md:p-10 bg-white rounded-md shadow-sm max-w-4xl mx-auto">
  <div className="flex flex-col gap-6">
    {/* Header */}
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4">
      <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
        <ChartBarStacked size={30} /> <span>Category / Add</span>
      </h1>
      <div className="mt-4 md:mt-0">
        {/* Optional: Link to go back */}
        <Button variant="outline">Go Back</Button>
      </div>
    </div>

    {/* Form */}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input placeholder="slug-name" {...field} />
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

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            disabled={loading}
            className="bg-black hover:bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
          >
            {!loading ? "Add Category" : "Adding..."}
          </Button>
        </div>
      </form>
    </Form>
  </div>
</section>

  );
}
