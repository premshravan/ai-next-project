import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import Quiz from "../_components/quiz";

const MockInterviewPage = () => {
  return (
    <div className="container mx-auto space-y-4 py-6">
      <div className="flex flex-col space-y-2 mx-1">
        <Link href={"/interview"}>
          <Button variant="link" className=" gap-2 pl-0">
            <ArrowLeft className="h-4 w-4" />
            Back to interview Preperation
          </Button>
        </Link>
        <div>
          <h1 className="text-6xl font-bold gradient-title">Mock Interview</h1>
          <p>Test your knowledge with industry specific Questions </p>
        </div>
      </div>

      <Quiz />
    </div>
  );
};

export default MockInterviewPage;
