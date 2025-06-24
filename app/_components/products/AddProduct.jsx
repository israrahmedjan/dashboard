"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import {
  Form,
  FormControl,
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

import { formSchema } from "./formSchems";
import { getCategories } from "./productFunc";

export function AddProduct() {
  const [client, setClient] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setMessage } = useMessageStore();
  const [catData, setCatdata] = useState(null);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "myname",
      slug: "slug",
      price: 0,
      productType: "simple",
      description: "this is descriptions",
      categories: [],
      stock: 0,
      status: "draft",
      brand: "",
      sku: "test",
      productId:"",
      imageUrl:"",
      image: null,
    },
  });

  const onSubmit = async (data) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("slug", data.slug);
      formData.append("description", data.description);
      formData.append("stock", data.stock);
      formData.append("price", data.price);
      formData.append("sku", data.sku);
      formData.append("image", data.image);
      const categoryString = data.categories.join(", ");
      formData.append("categoryId", categoryString);
      formData.append("categoryIdArray", data.categories);
      formData.append("brand", data.brand);
      formData.append("status", data.status);
      

      const response = await fetch("/api/products/addProduct", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setMessage("Success", "Product Added Successfully!");
        setLoading(false);
        router.push("/products");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setClient(true);
    async function fetchData() {
      const data = await getCategories();
      setCatdata(data);
    }
    fetchData();
  }, []);

  if (!client) return null;

  return (
    <section className="p-4 sm:p-6 md:p-10 bg-white rounded-md shadow-sm max-w-4xl mx-auto">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <h1 className="text-xl md:text-2xl font-semibold flex items-center gap-2 text-gray-800">
            <ChartBarStacked size={30} /> <span>Product / Add</span>
          </h1>
          <div className="mt-4 md:mt-0">
            <Button variant="outline">Go Back</Button>
          </div>
        </div>

        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit, (errors) => {
  console.log("Validation Errors:", errors);
})} className="space-y-6">
            <div>
              <h2 className="text-lg font-medium mb-4">Product Info</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Product Name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="slug" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl><Input placeholder="slug-name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Pricing & Product Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="price" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl><Input type="number" placeholder="Price" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="productType" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
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

            <div>
              <h2 className="text-lg font-medium mb-4">Categories & SKU</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="categories" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categories</FormLabel>
                    <select
                      multiple
                      value={field.value}
                      onChange={(e) => field.onChange(Array.from(e.target.selectedOptions, (o) => o.value))}
                      className="w-full border rounded-md p-2"
                    >
                      {catData?.map((cat, index) => (
                        <option key={index} value={cat._id}>{cat.name}</option>
                      ))}
                    </select>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="sku" render={({ field }) => (
                  <FormItem>
                    <FormLabel>SKU</FormLabel>
                    <FormControl><Input placeholder="sku" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Description</h2>
              <FormField control={form.control} name="description" render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl><Textarea placeholder="Write description..." className="resize-none" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Inventory</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="stock" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl><Input type="number" placeholder="Stock" {...field} onChange={(e) => field.onChange(Number(e.target.value))} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="brand" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl><Input placeholder="brand" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium mb-4">Image & Status</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField control={form.control} name="image" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image</FormLabel>
                    <FormControl><Input type="file" accept="image/*" onChange={(e) => field.onChange(e.target.files[0])} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />

                <FormField control={form.control} name="status" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">draft</SelectItem>
                        <SelectItem value="archived">archived</SelectItem>
                        <SelectItem value="published">published</SelectItem>
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
                {!loading ? "Add Product" : "Saving..."}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
