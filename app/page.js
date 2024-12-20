import Image from "next/image";

import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";

export default async function Home() {
  const url = "https://jsonplaceholder.typicode.com/albums";
    // const options = { method: "GET", headers: { accept: "application/json" } };

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await response.json();
    
  return (
    <div className="min-h-screen flex justify-center items-center flex-col dark:bg-slate-900 text-white" >
      this is home page
      <Button className="bg-primary text-white" >
        <Camera className="mr-2 h-4 w-4" />
        Take a photo
      </Button>
    </div>
  );
}
