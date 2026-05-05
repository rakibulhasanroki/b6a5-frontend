import HeroSection from "@/components/modules/home/HeroSection";
import UpcomingEvents from "@/components/modules/home/UpcomingEvents";
import Categories from "@/components/modules/home/Categories";
import CTASection from "@/components/modules/home/CTASection";
import Testimonials from "@/components/modules/home/Testimonials";
import FAQ from "@/components/modules/home/FAQ";
import HowItWorks from "@/components/modules/home/HowItWorks";
import PlatformStats from "@/components/modules/home/PlatformStats";

export const metadata = {
  title: "Home",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <UpcomingEvents />
      <Categories />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <PlatformStats />
      <CTASection />
    </>
  );
}
