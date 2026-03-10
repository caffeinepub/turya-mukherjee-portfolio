import { Skeleton } from "@/components/ui/skeleton";
import { useGetProfile } from "@/hooks/useQueries";
import { ArrowDown, Download, Instagram, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const FULL_FIRST = "Turya";
const FULL_LAST = "Mukherjee";
const TYPING_SPEED = 80;

function useTypingAnimation() {
  const [phase, setPhase] = useState<"first" | "last" | "done">("first");
  const [firstText, setFirstText] = useState("");
  const [lastText, setLastText] = useState("");

  useEffect(() => {
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setFirstText(FULL_FIRST.slice(0, idx));
      if (idx >= FULL_FIRST.length) {
        clearInterval(interval);
        setPhase("last");
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (phase !== "last") return;
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setLastText(FULL_LAST.slice(0, idx));
      if (idx >= FULL_LAST.length) {
        clearInterval(interval);
        setPhase("done");
      }
    }, TYPING_SPEED);
    return () => clearInterval(interval);
  }, [phase]);

  return { firstText, lastText, done: phase === "done" };
}

function HireMeButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative inline-flex items-center">
      {/* Tooltip */}
      {showTooltip && !isOpen && (
        <div
          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 z-50 pointer-events-none"
          style={{ minWidth: "280px" }}
        >
          <div
            className="px-3 py-2 rounded-xl text-xs text-center leading-snug"
            style={{
              background: "oklch(0.16 0.006 260 / 0.92)",
              border: "1px solid oklch(0.70 0.01 260 / 0.30)",
              boxShadow:
                "0 4px 20px oklch(0 0 0 / 0.5), inset 0 1px 0 oklch(1 0 0 / 0.10)",
              backdropFilter: "blur(12px)",
              color: "oklch(0.85 0.005 260)",
              whiteSpace: "normal",
            }}
          >
            10 months of experience · Actively exploring full-time roles in
            finance and strategy
          </div>
          {/* Arrow */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-full"
            style={{
              width: 0,
              height: 0,
              borderLeft: "6px solid transparent",
              borderRight: "6px solid transparent",
              borderTop: "6px solid oklch(0.70 0.01 260 / 0.30)",
            }}
          />
        </div>
      )}

      {!isOpen ? (
        /* Closed state: Hire Me button */
        <button
          type="button"
          data-ocid="hero.hireme.button"
          className="glass-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all"
          onClick={() => setIsOpen(true)}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          Hire Me
        </button>
      ) : (
        /* Open state: expanded options */
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-2"
          style={{
            background: "oklch(0.16 0.006 260 / 0.85)",
            border: "1px solid oklch(0.70 0.01 260 / 0.35)",
            boxShadow:
              "0 4px 24px oklch(0 0 0 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.10)",
            backdropFilter: "blur(16px)",
            animation: "expandReveal 0.25s ease both",
          }}
        >
          {/* Close back to Hire Me */}
          <button
            type="button"
            data-ocid="hero.hireme.button"
            className="glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-semibold"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </button>

          <div
            className="w-px self-stretch"
            style={{ background: "oklch(0.70 0.01 260 / 0.25)" }}
          />

          {/* Email */}
          <a
            href="mailto:mukherjee.turya@gmail.com"
            data-ocid="hero.hireme.email.button"
            className="glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium"
          >
            <Mail className="w-3.5 h-3.5" />
            Email Me
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/turya-mukherjee"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="hero.hireme.linkedin.button"
            className="glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium"
          >
            <Linkedin className="w-3.5 h-3.5" />
            LinkedIn
          </a>

          {/* Resume */}
          <a
            href="/assets/Turya_Mukherjee_Resume_FA-2.pdf"
            download="Turya_Mukherjee_Resume.pdf"
            data-ocid="hero.hireme.resume.button"
            className="glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium"
          >
            <Download className="w-3.5 h-3.5" />
            Resume
          </a>
        </div>
      )}
    </div>
  );
}

export function HeroSection() {
  const { data: profile, isLoading } = useGetProfile();
  const { firstText, lastText, done } = useTypingAnimation();

  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      data-ocid="hero.section"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Atmospheric metallic gradient mesh */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 60% 40%, oklch(0.35 0.005 260 / 0.25) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, oklch(0.25 0.003 260 / 0.18) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 10%, oklch(0.18 0.003 260 / 0.30) 0%, transparent 60%)",
        }}
      />

      {/* Subtle dark dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.12]"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle, oklch(0.45 0.004 260) 1px, transparent 1px)",
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
              Finance Graduate · Investment Research &amp; Financial Analysis
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
                style={{ opacity: 1 }}
              >
                <span className="block text-[72px] md:text-[88px] lg:text-[100px] font-bold text-foreground tracking-tight">
                  {firstText}
                  {firstText.length < FULL_FIRST.length && (
                    <span className="inline-block w-[3px] h-[0.8em] align-middle bg-foreground/70 ml-1 animate-pulse" />
                  )}
                </span>
                <span className="block text-[72px] md:text-[88px] lg:text-[100px] font-bold text-foreground tracking-tight">
                  {lastText}
                  {firstText.length >= FULL_FIRST.length && !done && (
                    <span className="inline-block w-[3px] h-[0.8em] align-middle bg-foreground/70 ml-1 animate-pulse" />
                  )}
                  {done && (
                    <>
                      <span className="gradient-text">.</span>
                      <span
                        className="inline-block w-[3px] h-[0.8em] align-middle bg-foreground/70 ml-1"
                        style={{
                          animation: "blink 1.1s step-start infinite",
                        }}
                      />
                    </>
                  )}
                </span>
              </h1>
            )}

            {/* Sub-headline */}
            <p
              className="text-base md:text-lg text-muted-foreground mb-4 font-medium"
              style={{ animation: "fadeInUp 0.7s 0.2s ease both" }}
            >
              Finance Graduate | Investment Research &amp; Financial Analysis
            </p>

            {/* Bio */}
            <p
              className="text-sm md:text-base text-muted-foreground max-w-md mx-auto md:mx-0 mb-10 leading-relaxed"
              style={{ animation: "fadeInUp 0.7s 0.3s ease both" }}
            >
              I'm a finance graduate with experience in financial analysis,
              client management and investment research. My work focuses on
              using data and financial models to uncover insights that support
              business and investment decisions.
            </p>

            {/* CTAs */}
            <div
              className="flex flex-wrap gap-3 justify-center md:justify-start mb-10 items-center"
              style={{ animation: "fadeInUp 0.7s 0.4s ease both" }}
            >
              <a
                href="/assets/Turya_Mukherjee_Resume_FA-2.pdf"
                download="Turya_Mukherjee_Resume.pdf"
                data-ocid="hero.resume.button"
                className="blue-button inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>
              <HireMeButton />
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
                className="glass-button w-9 h-9 rounded-full flex items-center justify-center transition-all"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={
                  profile?.socialLinks?.instagram ??
                  "https://www.instagram.com/turjo_mukherjee_?igsh=eHhuNWNoeW1yM3Zl"
                }
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="hero.instagram.link"
                aria-label="Instagram"
                className="glass-button w-9 h-9 rounded-full flex items-center justify-center transition-all"
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
            {/* Circle frame with ripple rings */}
            <div className="relative photo-interactive group" data-interactive>
              {/* Static decorative rings */}
              <div
                className="absolute -inset-4 rounded-full animate-float pointer-events-none"
                aria-hidden="true"
                style={{ border: "1px solid oklch(0.72 0.01 260 / 0.25)" }}
              />
              <div
                className="absolute -inset-8 rounded-full animate-float pointer-events-none"
                aria-hidden="true"
                style={{
                  border: "1px solid oklch(1 0 0 / 0.05)",
                  animationDelay: "1s",
                }}
              />
              <div
                className="absolute -inset-12 rounded-full animate-float pointer-events-none"
                aria-hidden="true"
                style={{
                  border: "1px solid oklch(0.65 0.008 260 / 0.10)",
                  animationDelay: "1.8s",
                }}
              />
              <div
                className="absolute -inset-16 rounded-full animate-float pointer-events-none"
                aria-hidden="true"
                style={{
                  border: "1px solid oklch(0.55 0.006 260 / 0.06)",
                  animationDelay: "2.5s",
                }}
              />

              {/* Hover ripple rings — visible on hover */}
              <div
                className="photo-ring photo-ring-1 absolute rounded-full pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="photo-ring photo-ring-2 absolute rounded-full pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="photo-ring photo-ring-3 absolute rounded-full pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo container */}
              <div
                className="relative w-56 h-56 md:w-72 md:h-72 lg:w-80 lg:h-80 rounded-full overflow-hidden photo-glow-container"
                style={{
                  border: "2px solid oklch(0.65 0.008 260 / 0.35)",
                  boxShadow:
                    "inset 0 1px 0 oklch(1 0 0 / 0.15), 0 0 50px oklch(0.60 0.008 260 / 0.12), 0 25px 70px oklch(0 0 0 / 0.6)",
                }}
              >
                <img
                  src="/assets/uploads/Linkedin_DP_Professional_atire-1-1.png"
                  alt="Turya Mukherjee profile"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, transparent 60%, oklch(0 0 0 / 0.35) 100%)",
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
