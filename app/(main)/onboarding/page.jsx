import { getUserOnboardingStatus } from "@/actions/user";
import { industries } from "@/Data/industries";
import OnboardingForm from "./_components/onboarding-form";
import { redirect } from "next/navigation";

const OnboardingPage = async () => {
  //check if the user is already onboareded
  const { isOnboarded } = await getUserOnboardingStatus();
 
  if (isOnboarded) {
    redirect("/dashboard");
  }

  return (
    <main>
      <OnboardingForm industries={industries} />
    </main>
  );
};

export default OnboardingPage;
