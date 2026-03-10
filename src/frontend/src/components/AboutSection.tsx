import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const stats = [
  { label: "Finance Graduate" },
  { label: "Account Manager" },
  { label: "Research Analyst" },
  { label: "Case Study Semi-Finalist" },
];

const interests = [
  "Financial Analysis",
  "Investment Research",
  "Case Studies",
  "Strategy",
  "Public Speaking",
  "MUN",
];

export function AboutSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const gridRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="about"
      data-ocid="about.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36"
      style={{ background: "oklch(0.10 0.004 260)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div
          ref={headerRef}
          className="section-reveal flex items-center gap-3 mb-16"
        >
          <span className="font-mono text-xs text-apple-blue uppercase tracking-[0.2em]">
            01
          </span>
          <div className="w-6 h-px bg-apple-blue" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            About Me
          </h2>
        </div>

        <div
          ref={gridRef}
          className="section-reveal grid md:grid-cols-5 gap-12 lg:gap-20 items-start"
        >
          {/* Left: Photo + stats */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
            {/* Photo with ripple rings on hover */}
            <div className="relative photo-interactive group" data-interactive>
              {/* Static rings */}
              <div
                className="absolute -inset-3 rounded-3xl pointer-events-none"
                aria-hidden="true"
                style={{ border: "1px solid oklch(0.72 0.01 260 / 0.12)" }}
              />
              <div
                className="absolute -inset-6 rounded-3xl pointer-events-none"
                aria-hidden="true"
                style={{ border: "1px solid oklch(0.60 0.008 260 / 0.07)" }}
              />
              <div
                className="absolute -inset-10 rounded-3xl pointer-events-none"
                aria-hidden="true"
                style={{ border: "1px solid oklch(0.50 0.006 260 / 0.04)" }}
              />

              {/* Hover ripple rings */}
              <div
                className="photo-ring photo-ring-rect photo-ring-1 absolute rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="photo-ring photo-ring-rect photo-ring-2 absolute rounded-3xl pointer-events-none"
                aria-hidden="true"
              />
              <div
                className="photo-ring photo-ring-rect photo-ring-3 absolute rounded-3xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Photo */}
              <div
                className="relative w-56 h-56 md:w-full md:max-w-xs md:h-72 rounded-3xl overflow-hidden photo-glow-container"
                style={{
                  border: "1px solid oklch(1 0 0 / 0.1)",
                  boxShadow:
                    "0 20px 60px oklch(0 0 0 / 0.5), 0 0 0 1px oklch(1 0 0 / 0.05)",
                }}
              >
                <img
                  src="/assets/uploads/Linkedin_DP_Professional_atire-1.png"
                  alt="Turya Mukherjee"
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 h-20 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, oklch(0.09 0.006 255 / 0.5), transparent)",
                  }}
                />
              </div>
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start stagger-children">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="glass-button text-xs font-medium px-3 py-1.5 rounded-full"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div className="md:col-span-3">
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              I'm a finance graduate with experience in financial analysis,
              client management and investment research. My work focuses on
              using data and financial models to uncover insights that support
              business and investment decisions.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Outside of work, I thrive in competitive environments. I've been a
              semi-finalist in national case study competitions and a two-time
              MUN award winner — experiences that sharpened my research,
              communication, and problem-solving skills.
            </p>

            <div className="border-t border-border mb-8" />

            {/* Interests */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Areas of Interest
              </p>
              <div className="flex flex-wrap gap-2 stagger-children">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="border-border text-foreground/70 hover:border-apple-blue hover:text-apple-blue hover:bg-apple-blue/10 transition-all text-xs font-medium px-3 py-1.5 bg-white/[0.03]"
                  >
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
