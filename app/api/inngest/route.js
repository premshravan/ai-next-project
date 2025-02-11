
import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/functions";

import { serve } from "inngest/next";
//create an API
export const { GET, POST, PUT } = serve({
  // All serve handlers have the same arguments:

  client: inngest, // a client created with new Inngest()
  functions: [
    // Functions will be passed here...///
    generateIndustryInsights,
  ], // an array of Inngest functions to serve, created with inngest.createFunction()
  /* Optional extra configuration */
});


// import { helloworld } from "@/lib/inngest/functions";
// import { inngest } from "@/lib/inngest/client";
// import { serve } from "inngest/next";
// export const { GET, POST, PUT } = serve({
//   client: inngest,
//   functions: [helloworld], // Ensure functions array is provided
//   page: "/api/inngest",
// });
