import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/useQueries";
import { ArrowDown, Download, Instagram, Linkedin } from "lucide-react";

export function HeroSection() {
  const { data: profile, isLoading } = useGetProfile();

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Atmospheric dark gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, oklch(0.52 0.18 248 / 0.08) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.42 0.12 248 / 0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 10%, oklch(0.30 0.05 255 / 0.12) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dark dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.18]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.60 0.008 250) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-32 pt-40 w-full">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="text-center md:text-left">
            {/* Eyebrow */}
            <p
              className="font-mono text-xs tracking-[0.2em] text-muted-foreground uppercase mb-6"
              style={{ animation: "fadeInUp 0.6s 0.0s ease both" }}
            >
              Finance Major · Research &amp; Investment Professional
            </p>

            {/* Name */}
            {isLoading ? (
              <div className="space-y-3 mb-6">
                <Skeleton className="h-20 w-64 bg-secondary" />
                <Skeleton className="h-20 w-72 bg-secondary" />
              </div>
            ) : (
              <h1
                className="font-display leading-[0.9] mb-6"
                style={{ animation: "fadeInUp 0.7s 0.1s ease both" }}
              >
                <span className="block text-[72px] md:text-[88px] lg:text-[100px] font-bold text-foreground tracking-tight">
                  Turya
                </span>
                <span className="block text-[72px] md:text-[88px] lg:text-[100px] font-bold text-foreground tracking-tight">
                  Mukherjee<span className="text-apple-blue">.</span>
                </span>
              </h1>
            )}

            {/* Sub-headline */}
            <p
              className="text-base md:text-lg text-muted-foreground mb-4 font-medium"
              style={{ animation: "fadeInUp 0.7s 0.2s ease both" }}
            >
              Finance Major (BBA) · Account Manager · Research &amp; Investment
              Analyst
            </p>

            {/* Bio */}
            <p
              className="text-sm md:text-base text-muted-foreground max-w-md mx-auto md:mx-0 mb-10 leading-relaxed"
              style={{ animation: "fadeInUp 0.7s 0.3s ease both" }}
            >
              I bridge the worlds of finance and strategy — from managing client
              accounts to producing in-depth investment research. Passionate
              about uncovering insights that drive decisions.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-10"
              style={{ animation: "fadeInUp 0.7s 0.4s ease both" }}
            >
              <button
                type="button"
                data-ocid="hero.resume.button"
                onClick={() => {
                  const url = profile?.resumeUrl;
                  if (url && url !== "#") {
                    window.open(url, "_blank", "noopener,noreferrer");
                  }
                }}
                className="blue-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </button>
              <a
                href="mailto:mukherjee.turya@gmail.com"
                data-ocid="hero.hireme.button"
                className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              >
                Hire Me
              </a>
            </div>

            {/* Social Links */}
            <div
              className="flex items-center gap-4 justify-center md:justify-start"
              style={{ animation: "fadeInUp 0.7s 0.5s ease both" }}
            >
              <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">
                Connect
              </span>
              <div className="w-5 h-px bg-border" />
              <a
                href={
                  profile?.socialLinks?.linkedin ??
                  "https://www.linkedin.com/in/turya-mukherjee"
                }
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.linkedin.link"
                aria-label="LinkedIn"
                className="glass-button w-9 h-9 rounded-full flex items-center justify-center transition-all hover:border-apple-blue hover:text-apple-blue"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={
                  profile?.socialLinks?.instagram ??
                  "https://www.instagram.com/turjo_mukherjee_"
                }
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.instagram.link"
                aria-label="Instagram"
                className="glass-button w-9 h-9 rounded-full flex items-center justify-center transition-all hover:border-apple-blue hover:text-apple-blue"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right: Photo */}
          <div
            className="flex flex-col items-center gap-4"
            style={{ animation: "fadeInUp 0.8s 0.2s ease both" }}
          >
            {/* Circle frame */}
            <div className="relative">
              {/* Decorative ring */}
              <div
                className="absolute -inset-4 rounded-full border border-apple-blue/20 animate-float"
                aria-hidden="true"
              />
              <div
                className="absolute -inset-8 rounded-full border border-white/[0.05] animate-float"
                aria-hidden="true"
                style={{ animationDelay: "1s" }}
              />

              {/* Photo container — dark glass ring */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden border-2 border-white/[0.12]"
                style={{
                  boxShadow:
                    "0 0 40px oklch(0.52 0.18 248 / 0.15), 0 20px 60px oklch(0 0 0 / 0.5)",
                }}
              >
                <img
                  src="/assets/uploads/Linkedin_DP_Professional_atire-1.png"
                  alt="Turya Mukherjee profile"
                  className="w-full h-full object-cover"
                />
                {/* Subtle dark vignette overlay */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, oklch(0 0 0 / 0.3) 100%)",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={scrollToAbout}
        data-ocid="hero.scroll.button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground hover:text-apple-blue transition-colors group"
        aria-label="Scroll to About section"
        style={{ animation: "fadeIn 1s 1.2s ease both" }}
      >
        <span className="text-[10px] font-mono uppercase tracking-widest opacity-60">
          Scroll
        </span>
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
