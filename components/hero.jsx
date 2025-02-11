"use client";

import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { useEffect, useRef } from "react";

const HeroSection = () => {
  const imageRef = useRef(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;
      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      }
      else {
        imageElement.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return ()=>window.removeEventListener('scroll',handleScroll)
  },[]);

  return (
    <section className="w-full pt-36 md:pt-48 pb-10">
      <div className="space-y-6 text-center">
        <div className="space-y-6 mx-auto">
          <h1 className="gradient-title text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl">
            Your AI career Coach for <br /> <span>Professional Success</span>
          </h1>
          <p className="text-muted-foreground mx-auto mx-w-[600px] md:text-xl">
            Advance your career with AI powered guidence,Interview preperations
            and AI Tools to build your projects.
          </p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link href="/dashboard">
            <Button className="px-8" size="lg">
              get Started
            </Button>
          </Link>
          <Link href="www.google.com">
            <Button className="px-8" size="lg" variant="outline">
              get Started
            </Button>
          </Link>
        </div>
        <div className="hero-image-wrapper mt-5 md:mt-0">
          <div ref={imageRef} className="hero-image">
            <Image
              src={"/ai-banner.jpg"}
              width={1500}
              height={100}
              alt="hero-preview"
              className="rounded-lg shadow-2xl border mx-auto scale-[85%]"
              priority
            ></Image>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
