import CardSection from "@/components/cardSection";
import CareerSection from "@/components/career";
import CommentsSection from "@/components/commentsSection";
import FeaturedSection from "@/components/featuredSection";
import FrequentlyAskdQuestinsSection from "@/components/frequentlyAskdQuestinsSection";
import HeroSection from "@/components/hero";
import StatisticsSection from "@/components/statisticsSection";
import NotFound from "./not-found";

export default function Home() {
  return (
    <div>
      <div className="grid-background"></div>
      <HeroSection />

      <CardSection />

      <StatisticsSection />

      <FeaturedSection />

      <CommentsSection />

      <FrequentlyAskdQuestinsSection />

      <CareerSection />

      
    </div>
  );
}
