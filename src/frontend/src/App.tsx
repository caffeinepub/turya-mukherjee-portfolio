import { AboutSection } from "@/components/AboutSection";
import { BackToTop } from "@/components/BackToTop";
import { ContactSection } from "@/components/ContactSection";
import { CursorGlow } from "@/components/CursorGlow";
import { Footer } from "@/components/Footer";
import { HeroSection } from "@/components/HeroSection";
import { Navbar } from "@/components/Navbar";
import { PortfolioSection } from "@/components/PortfolioSection";
import { ResumeSection } from "@/components/ResumeSection";
import { ScrollProgressBar } from "@/components/ScrollProgressBar";
import { Toaster } from "@/components/ui/sonner";
import { useCursorProximity } from "@/hooks/useCursorProximity";

function AppInner() {
  useCursorProximity();
  return (
    <div className="min-h-screen bg-background text-foreground">
      <ScrollProgressBar />
      <CursorGlow />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ResumeSection />
        <PortfolioSection />
        <ContactSection />
      </main>
      <Footer />
      <BackToTop />
      <Toaster position="bottom-right" richColors />
    </div>
  );
}

export default function App() {
  return <AppInner />;
}
