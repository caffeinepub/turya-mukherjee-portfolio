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

  return (
    <section
      id="about"
      data-ocid="about.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-xs text-apple-blue uppercase tracking-[0.2em]">
            01
          </span>
          <div className="w-6 h-px bg-apple-blue" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            About Me
          </h2>
        </div>

        <div className="grid md:grid-cols-5 gap-12 lg:gap-20 items-start">
          {/* Left: Photo + stats */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start gap-6">
            {/* Photo */}
            <div className="relative w-56 h-56 md:w-full md:max-w-xs md:h-72 rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src="/assets/uploads/Linkedin_DP_Professional_atire-1.png"
                alt="Turya Mukherjee"
                className="w-full h-full object-cover"
              />
              {/* Subtle gradient overlay at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 h-16"
                style={{
                  background:
                    "linear-gradient(to top, oklch(0.14 0.004 250 / 0.06), transparent)",
                }}
              />
            </div>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {stats.map((s) => (
                <span
                  key={s.label}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-background border border-border text-foreground shadow-xs"
                >
                  {s.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Bio */}
          <div className="md:col-span-3">
            <p className="text-lg text-foreground/80 leading-relaxed mb-6">
              I'm a Finance graduate who has navigated diverse professional
              landscapes — from building client relationships as an Account
              Manager to diving deep into markets as a Research &amp; Investment
              Services Analyst. I'm drawn to problems where analytical rigor
              meets strategic thinking.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed mb-10">
              Outside of work, I thrive in competitive environments. I've been a
              semi-finalist in national case study competitions and a two-time
              MUN award winner — experiences that sharpened my research,
              communication, and problem-solving skills.
            </p>

            {/* Divider */}
            <div className="border-t border-border mb-8" />

            {/* Interests */}
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground mb-4">
                Areas of Interest
              </p>
              <div className="flex flex-wrap gap-2">
                {interests.map((interest) => (
                  <Badge
                    key={interest}
                    variant="outline"
                    className="border-border text-foreground/70 hover:border-apple-blue hover:text-apple-blue hover:bg-apple-blue/5 transition-all text-xs font-medium px-3 py-1.5"
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
