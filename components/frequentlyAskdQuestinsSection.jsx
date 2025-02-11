import { faqs } from "@/Data/faqs";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const FrequentlyAskdQuestinsSection = () => {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-12">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground">
            Find answers to common questions
          </p>
        </div>
        <div className=" max-w-6xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => {
              return (
                <AccordionItem key={index} value= {`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FrequentlyAskdQuestinsSection;
