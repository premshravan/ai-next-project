import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center min-h-[100vh] gap-y-4">
      <div className="">
        <h1 className="text-red-500/90 text-4xl rounded-md mb-5">404</h1>
        <h1 className="gradient-tile text-2xl font-bold">NOT FOUND</h1>
      </div>
      <Link href="/">
      <Button>Return Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
