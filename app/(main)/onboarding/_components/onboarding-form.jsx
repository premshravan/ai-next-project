"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { onboardingSchema } from "@/app/lib/schema";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select } from "@radix-ui/react-select";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import useFetch from "@/hooks/use-fetch";
import { updateUser } from "@/actions/user";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const OnboardingForm = ({ industries }) => {
  const [selectedIndustry, setSelectedIndustry] = useState(null);
  const router = useRouter();

  const {
    loading: updateLoading,
    fn: updateUserFn,
    data: updateResult,
  } = useFetch(updateUser);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(onboardingSchema),
  });
  const onSubmitt = async (values) => {
    try {
      const formattedIndustry = `${values.industry} - ${values.subIndustry
        .toLowerCase()
        .replace(/ /g, "-")}`;

      await updateUserFn({
        ...values,
        industry: formattedIndustry,
      });
    } catch (error) {
      console.error("onboarding error", error);
    }
  };
  // useEffect(()=>{
  //   if(updateResult?.success && !updateLoading){
  //     toast.success("profile completed Successfully!")
  //     router.push('/dashboard');
  //     router.refresh();
  //   }
  // },[updateResult,updateLoading])
  
  useEffect(() => {
    if (updateResult?.success && !updateLoading) {
      toast.success("Profile completed successfully!");
      
      // Force a full refresh to ensure the latest data is fetched
      router.refresh();  
  
      setTimeout(() => {
        router.push("/dashboard");
      }, 1000); // Add a short delay to ensure data updates
    }
  }, [updateResult, updateLoading]);
  

  const watchIndustry = watch("industry");

  return (
    <div className="flex items-center justify-center bg-background">
      <Card className="w-full max-w-lg mt-10 mx-2">
        <CardHeader>
          <CardTitle className="gradient-title text-4xl">
            Complete Your profile
          </CardTitle>
          <CardDescription>
            Select your industry to get the personlised career insigts and
            recommendations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmitt)}>
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select
                onValueChange={(value) => {
                  setValue("industry", value);
                  setSelectedIndustry(
                    industries.find((ind) => ind.id === value)
                  );
                  setValue("subIndustry", "");
                }}
              >
                <SelectTrigger id="industry" className="w-[180px]">
                  <SelectValue placeholder="Select an Industry"></SelectValue>
                </SelectTrigger>
                <SelectContent>
                  {industries.map((ind) => {
                    return (
                      <SelectItem value={ind.id} key={ind.id}>
                        {ind.name}
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
              {errors.industry && (
                <p className="text-sm text-red-400">
                  {errors.industry.message}
                </p>
              )}
            </div>

            {/* //sub industry// */}

            {watchIndustry && (
              <div className="space-y-2">
                <Label htmlFor="subIndustry">Specialisation</Label>
                <Select
                  onValueChange={(value) => {
                    setValue("subIndustry", value);
                  }}
                >
                  <SelectTrigger id="subIndustry" className="w-[180px]">
                    <SelectValue placeholder="Select a Sub"></SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {selectedIndustry?.subIndustries.map((ind) => {
                      return (
                        <SelectItem value={ind} key={ind}>
                          {ind}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
                {errors.subIndustry && (
                  <p className="text-sm text-red-400">
                    {errors.subIndustry.message}
                  </p>
                )}
              </div>
            )}

            {/* Years of experience */}

            <div className="space-y-2">
              <Label htmlFor="subIndustry">Years of Experience</Label>
              <Input
                id="experience"
                type="number"
                min="0"
                max="50"
                placeholder="Enter years of Experience"
                {...register("experience")}
              />

              {errors.experience && (
                <p className="text-sm text-red-400">
                  {errors.experience.message}
                </p>
              )}
            </div>

            {/* Skills */}
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="experience"
                placeholder="e.g:,Python,JS,Project Manangement"
                {...register("skills")}
              />
              <p className="text-sm text-muted-foreground">
                Seperate mulitiple skills by commas
              </p>
              {errors.skills && (
                <p className="text-sm text-red-400">{errors.skills.message}</p>
              )}
            </div>

            {/* Professional bio */}
            <div className="space-y-2">
              <Label htmlFor="bio">Professional bio</Label>
              <Textarea
                id="bio"
                placeholder="tell us about your professional background"
                className="h-32"
                {...register("bio")}
              />
              {errors.bio && (
                <p className="text-sm text-red-400">{errors.bio.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={updateLoading}>
              {updateLoading ? (
                <>
                  <Loader2  className="mr-2 h-4 w-4 animate-spin"/>
                  Saving...
                </>
              ):(
                ""
              )}
              Complete Profile
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingForm;
