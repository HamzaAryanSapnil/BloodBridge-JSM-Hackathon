"use server";

import { signIn } from "@/auth";
import { revalidatePath } from "next/cache";

export const loginUser = async (formData) => {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  try {
    const response = await signIn("credentials", {
      redirect: false, // Ensures no page redirection occurs
      identifier,
      password,
    });

    console.log("SignIn Response: ", response);

    if (response) {
      return {
        success: true,
        message: `Welcome, ${identifier}! Enjoy using Mystri Message App.`,
        status: 200,
      };
    }
  } catch (error) {
    console.error("SignIn Error: ", error);
    return {
      message: `Invalid Credentials, ${identifier}! Unable to sign in. Please try again later.`,
      success: false,
      status: 400,
    };

    //  toast({
    //    title: "An error occurred",
    //    description: "Unable to sign in. Please try again later.",
    //    variant: "destructive",
    //  });
  }
};
