"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter, useParams } from "next/navigation";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ChartBarStacked } from "lucide-react";
import { useEffect, useState } from "react";
import useMessageStore from "@/store/useMessageStore";
import { getCategories, getProductById } from "./productFunc";

// ✅ Full schema to match AddProduct
import { formSchema } from "./formSchems";
export function EditProduct() {
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [catData, setCatData] = useState([]);
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  const { setMessage } = useMessageStore();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
      price: 0,
      productType: "simple",
      description: "",
      categories: [],
      stock: 1,
      brand: "",
      sku: "",
      status: "draft",
      image: null,
      imageUrl: "",
      publicId: "",
    },
  });

  const { reset } = form;

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = new FormData();

      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("price", data.price);
      formData.append("productType", data.productType);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("brand", data.brand);
      formData.append("sku", data.sku);
      formData.append("status", data.status);
      formData.append("imageUrl", data.imageUrl || "");
      formData.append("image", data.image || "");
      formData.append("productId", data.productId || "");
      formData.append("publicId", data.publicId || "");
      formData.append("categoryId", data.categories.join(","));
console.log("Form Data",data);
      if (data.image && data.image.size > 0) {
        formData.append("image", data.image);
      }

      const response = await fetch("/api/products/editProduct", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Success", "Product Updated Successfully!");
        setLoading(false);
        router.push("/products");
      }
    } catch (error) {
      console.log("Error:", error.message);
    }
  };

  const fetchData = async () => {
    const [product, cats] = await Promise.all([
      getProductById(productId),
      getCategories(),
    ]);

    setData(product);
    setCatData(cats);

    reset({
      name: product.name || "",
      slug: product.slug || "",
      price: product.price || 0,
      productType: product.productType || "simple",
      description: product.description || "",
      stock: product.stock || 1,
      brand: product.brand || "",
      sku: product.sku || "",
      status: product.status || "draft",
      categories: product.categoryId || [],
     productId: product._id || [],
      image: null,
      imageUrl: product.image || "",
      publicId: product.publicId || "",
    });
  };

  useEffect(() => {
    setClient(true);
    fetchData();
  }, []);

  if (!client) return null;

  return (
    <section className="p-4 sm:p-6 md:p-10 bg-white rounded-md shadow-sm max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-200 pb-4">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <ChartBarStacked size={30} />
            <span>Product / Edit</span>
          </h1>
          <Button variant="outline">Go Back</Button>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
            {/* Hidden fields */}
            <FormField name="imageUrl" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />
            <FormField name="publicId" control={form.control} render={({ field }) => <input type="hidden" {...field} />} />

            {/* Product Info */}
            <div>
              <h2 className="text-lg font-medium mb-4">Product Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="name" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Product Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="slug" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl><Input placeholder="slug-name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Price & Type */}
            <div>
              <h2 className="text-lg font-medium mb-4">Pricing & Product Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               
                <FormField name="price" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" placeholder="Price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="productType" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full"><SelectValue placeholder="Select product type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="simple">Simple</SelectItem>
                        <SelectItem value="variable">Variable</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Category & SKU */}
            <div>
              <h2 className="text-lg font-medium mb-4">Categories & SKU</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="categories" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <select
                      multiple
                      value={field.value}
                      onChange={(e) => field.onChange(Array.from(e.target.selectedOptions, o => o.value))}
                      className="w-full border rounded-md p-2"
                    >
                      {catData?.map((cat, i) => (
                        <option key={i} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="sku" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl><Input placeholder="sku" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="text-lg font-medium mb-4">Description</h2>
              <FormField name="description" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Write description..." className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Inventory */}
            <div>
              <h2 className="text-lg font-medium mb-4">Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="stock" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl><Input type="number" placeholder="Stock" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="brand" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl><Input placeholder="brand" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            {/* Image & Status */}
            <div>
              <h2 className="text-lg font-medium mb-4">Image & Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField name="image" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files[0])} /></FormControl>
                    
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField name="status" control={form.control} render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full"><SelectValue placeholder="Select Status" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                        <SelectItem value="published">Published</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={loading}
                className="bg-black hover:bg-blue-600 text-white px-6 py-2 rounded w-full sm:w-auto"
              >
                {!loading ? "Update Product" : "Updating..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
