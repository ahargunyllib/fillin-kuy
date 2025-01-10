import { BlogSection } from "@/features/home/components/BlogSection";
import { CTASection } from "@/features/home/components/CTASection";
import { ContactSection } from "@/features/home/components/ContactSection";
import { FAQSection } from "@/features/home/components/FAQSection";
import { FeatureSection } from "@/features/home/components/FeatureSection";
import { HeroSection } from "@/features/home/components/HeroSection";
import { SponsorSection } from "@/features/home/components/SponsorSection";
import { StatsSection } from "@/features/home/components/StatsSection";
import { TestimonialSection } from "@/features/home/components/TestimonialSection";
import { Footer } from "@/shared/components/Footer";
import { Header } from "@/shared/components/Header";

export default function Home() {
	return (
		<>
			<Header />
			<HeroSection />
			<SponsorSection />
			<FeatureSection />
			<StatsSection />
			<TestimonialSection />
			<CTASection />
			<FAQSection />
			<BlogSection />
			<ContactSection />
			<Footer />
		</>
	);
}
