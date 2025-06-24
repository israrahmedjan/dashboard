'use client';
import React, { useEffect, useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import Image from 'next/image';

function Login() {
  const [email, setEmail] = useState('israr12@gmail.com');
  const [password, setPassword] = useState('122222');
  const [response, setResponse] = useState('');
  const [client,setclient] = useState(false);
  const domain = process.env.NEXT_PUBLIC_FRONT_DOMAIN;


  const form = useForm({
    defaultValues: {
      email: 'demo@gmail.com',
      password: 'demo123',
    },
  });

  const onSubmit = async (data) => {
  //  console.log("Login Data:", data);
    const { email, password } = data;
    console.log("skdf", email,password)
    // API call, login logic etc.

    try {
      const res = await fetch(`${domain}/api/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', 
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        setResponse(`Login Success! Token: ${data.token}`);
        window.location.href= "/products"
        // Optional: store token in localStorage
        //localStorage.setItem('token', data.token);
      } else {
        setResponse(`Login Failed: ${data.message || 'Unknown error'}`);
      }
    } catch (error) {
      setResponse(`Error: ${error.message}`);
    }

  };

  useEffect(()=>
{
setclient(true);
},[])

if(!client) return null;

  
  return (
    <>
<div className="h-screen flex justify-center items-center flex-col gap-6">
  <div><Image src={`${domain}/images/logo.png`} width={150} height={150}  alt='logo Image'/></div>
   
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full md:w-[30%] mx-auto border-gray-100 border p-6 shadow-md rounded-xl">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">Login</Button>
      </form>
    </Form></div>
   
    </>
  );
}

export default Login;
