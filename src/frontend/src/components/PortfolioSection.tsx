import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink, FileText } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Fuel Cost Analysis \u2013 Aviation Sector",
    description:
      "Conducted econometric analysis on the impact of gasoline price volatility on Indian airline stocks using advanced statistical models, providing strategic insight for risk management and compliance considerations. Generated data-driven insights on risk exposure and stock sensitivity to inform strategic decision-making and long-term financial planning.",
    tags: ["Econometrics", "Aviation", "Risk Analysis", "Financial Modeling"],
    category: "Research",
    link: "https://drive.google.com/file/d/14Vpky9SIKYCfwCNo4zCcjRZ-i689_Blr/view",
    year: "2024",
  },
  {
    id: 2,
    title: "Ratio Analysis \u2013 TATA Motors",
    description:
      "Analyzed 10 years of Tata Motors financial statements (Income Statement, Balance Sheet, and ratio trends) to identify profitability, cost structure, and capital efficiency drivers using Excel-based financial modeling. Conducted margin, growth, and efficiency ratio analysis to evaluate operational performance and debt sustainability.",
    tags: ["Financial Modeling", "Ratio Analysis", "Excel", "Equity Research"],
    category: "Research",
    link: "https://docs.google.com/spreadsheets/d/1pyaltMWBJ7aFLbIi1pzRnXJCumuG7KX3/htmlview#gid=1655937798",
    year: "2024",
  },
  {
    id: 3,
    title: "CaseQuest Diversity Strategy",
    description:
      "Semi-finalist submission exploring innovative diversity hiring frameworks for modern enterprises. Comprehensive research with actionable recommendations on inclusive hiring practices.",
    tags: ["Strategy", "HR", "Case Study"],
    category: "Case Study",
    link: null,
    year: "2024",
  },
  {
    id: 4,
    title: "Gatorade Marketing Strategy",
    description:
      "PepsiCo case study semi-finalist. Developed a full marketing strategy for Gatorade's next growth phase, including consumer segmentation, channel strategy, and campaign recommendations.",
    tags: ["Marketing", "Strategy", "FMCG"],
    category: "Case Study",
    link: null,
    year: "2024",
  },
];

const achievements = [
  {
    id: 1,
    image: "/assets/generated/badge-casequest-transparent.dim_200x200.png",
    title: "CaseQuest Semi-Finalist",
    description:
      "Diversity Hiring Case Competition \u2014 Selected as semi-finalist among hundreds of participants for innovative insights on inclusive hiring practices.",
    badge: "Semi-Finalist",
    certificateLink:
      "/assets/CASEQuest Certificate_Team Beyond Barriers_Turya Mukherjee-1.pdf",
    sponsorLogo: "/assets/uploads/GT-4.png",
    sponsorName: "Grant Thornton",
  },
  {
    id: 2,
    image: "/assets/generated/badge-pepsico-transparent.dim_200x200.png",
    title: "PepsiCo Gatorade Semi-Finalist",
    description:
      "PepsiCo National Case Study Competition \u2014 Developed a winning go-to-market strategy for Gatorade's expansion, recognized as a top submission.",
    badge: "Semi-Finalist",
    certificateLink: null,
    sponsorLogo: null,
    sponsorName: null,
  },
  {
    id: 3,
    image: "/assets/generated/badge-mun-transparent.dim_200x200.png",
    title: "Model United Nations \u2014 2nd Place",
    description:
      "Two-time MUN award winner. Recognized for exceptional research, debate performance, and diplomatic communication skills.",
    badge: "2nd Place",
    certificateLink: null,
    sponsorLogo: null,
    sponsorName: null,
  },
];

export function PortfolioSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const projectsRef = useScrollReveal<HTMLDivElement>();
  const achievementsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="portfolio"
      data-ocid="portfolio.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36"
      style={{ background: "oklch(0.10 0.004 260)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div
          ref={headerRef}
          className="section-reveal flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-apple-blue uppercase tracking-[0.2em]">
            03
          </span>
          <div className="w-6 h-px bg-apple-blue" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Portfolio
          </h2>
        </div>
        <p className="text-muted-foreground mb-16 max-w-xl">
          A collection of research work, investment analyses, and strategic case
          studies.
        </p>

        {/* Projects Grid */}
        <div
          ref={projectsRef}
          className="section-reveal grid sm:grid-cols-2 lg:grid-cols-2 gap-6 mb-24 stagger-children"
        >
          {projects.map((project) => {
            const CardWrapper = project.link ? "a" : "div";
            const linkProps = project.link
              ? {
                  href: project.link,
                  target: "_blank" as const,
                  rel: "noopener noreferrer",
                }
              : {};

            return (
              <CardWrapper
                key={project.id}
                {...linkProps}
                data-ocid={`portfolio.project.card.${project.id}`}
                className="group glass-card metallic-shimmer rounded-2xl p-6 hover:border-white/20 hover:shadow-[0_8px_40px_oklch(0_0_0/0.6)] transition-all duration-300 flex flex-col"
              >
                {/* Category pill + year */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-apple-blue bg-apple-blue/10 px-2.5 py-1 rounded-full border border-white/10">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {project.year}
                    </span>
                    {project.link ? (
                      <ExternalLink className="w-3.5 h-3.5 text-apple-blue opacity-60 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    )}
                  </div>
                </div>

                <h3 className="font-display text-base font-bold text-foreground mb-3 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="text-xs bg-white/[0.06] text-muted-foreground border-0 font-normal"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardWrapper>
            );
          })}
        </div>

        {/* Achievements */}
        <div ref={achievementsRef} className="section-reveal">
          {/* Divider */}
          <div className="border-t border-border mb-16" />

          <div className="flex items-center gap-3 mb-4">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
              Achievements
            </h3>
          </div>
          <p className="text-muted-foreground mb-12">
            Recognition from competitive case study challenges and academic
            competitions.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                data-ocid={`portfolio.achievement.card.${achievement.id}`}
                className="glass-card metallic-shimmer rounded-2xl p-8 flex flex-col items-center text-center hover:border-white/20 hover:shadow-[0_8px_40px_oklch(0_0_0/0.6)] transition-all duration-300"
              >
                {/* Badge image */}
                <div className="w-24 h-24 mb-5 relative">
                  <img
                    src={achievement.image}
                    alt={achievement.title}
                    className="w-full h-full object-contain drop-shadow-md"
                  />
                </div>

                {/* Badge pill */}
                <span className="text-[10px] font-mono uppercase tracking-widest text-apple-blue bg-apple-blue/10 px-2.5 py-1 rounded-full mb-3 border border-white/10">
                  {achievement.badge}
                </span>

                <h4 className="font-display font-bold text-foreground text-base mb-3 leading-snug">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  {achievement.description}
                </p>

                {/* Sponsor logo if available */}
                {achievement.sponsorLogo && (
                  <div className="w-full mb-4">
                    <p className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground/60 mb-2">
                      Organized by
                    </p>
                    <div className="flex items-center justify-center bg-white/[0.92] rounded-lg px-3 py-2 border border-white/20">
                      <img
                        src={achievement.sponsorLogo}
                        alt={achievement.sponsorName ?? "Sponsor"}
                        className="h-7 w-auto max-w-[120px] object-contain"
                      />
                    </div>
                  </div>
                )}

                {/* Certificate link if available */}
                {achievement.certificateLink && (
                  <a
                    href={achievement.certificateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-ocid={`portfolio.achievement.certificate.${achievement.id}`}
                    className="glass-button inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium mt-auto"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    View Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
