import { Badge } from "@/components/ui/badge";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ExternalLink } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Investment Market Analysis",
    description:
      "A deep-dive sector analysis examining market trends, valuation multiples, and investment opportunities across emerging markets.",
    tags: ["Equity Research", "Valuation", "Macro"],
    category: "Research",
  },
  {
    id: 2,
    title: "CaseQuest Diversity Strategy",
    description:
      "Semi-finalist submission exploring innovative diversity hiring frameworks for modern enterprises. Comprehensive research with actionable recommendations.",
    tags: ["Strategy", "HR", "Case Study"],
    category: "Case Study",
  },
  {
    id: 3,
    title: "Gatorade Marketing Strategy",
    description:
      "PepsiCo case study semi-finalist. Developed a full marketing strategy for Gatorade's next growth phase, including consumer segmentation and campaign recommendations.",
    tags: ["Marketing", "Strategy", "FMCG"],
    category: "Case Study",
  },
];

const achievements = [
  {
    id: 1,
    image: "/assets/generated/badge-casequest-transparent.dim_200x200.png",
    title: "CaseQuest Semi-Finalist",
    description:
      "Diversity Hiring Case Competition — Selected as semi-finalist among hundreds of participants for innovative insights on inclusive hiring practices.",
    badge: "Semi-Finalist",
  },
  {
    id: 2,
    image: "/assets/generated/badge-pepsico-transparent.dim_200x200.png",
    title: "PepsiCo Gatorade Semi-Finalist",
    description:
      "PepsiCo National Case Study Competition — Developed a winning go-to-market strategy for Gatorade's expansion, recognized as a top submission.",
    badge: "Semi-Finalist",
  },
  {
    id: 3,
    image: "/assets/generated/badge-mun-transparent.dim_200x200.png",
    title: "Model United Nations — 2nd Place",
    description:
      "Two-time MUN award winner. Recognized for exceptional research, debate performance, and diplomatic communication skills.",
    badge: "2nd Place",
  },
];

export function PortfolioSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const achievementsRef = useScrollReveal<HTMLDivElement>();

  return (
    <section
      id="portfolio"
      data-ocid="portfolio.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36 bg-secondary/30"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {projects.map((project) => (
            <article
              key={project.id}
              data-ocid={`portfolio.project.card.${project.id}`}
              className="group bg-card rounded-2xl border border-border p-6 hover:border-apple-blue/30 hover:shadow-card-hover transition-all duration-300 flex flex-col"
            >
              {/* Category pill */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-apple-blue bg-apple-blue/8 px-2.5 py-1 rounded-full">
                  {project.category}
                </span>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
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
                    className="text-xs bg-secondary text-muted-foreground border-0 font-normal"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </article>
          ))}
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

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                data-ocid={`portfolio.achievement.card.${achievement.id}`}
                className="bg-card rounded-2xl border border-border p-8 flex flex-col items-center text-center hover:border-apple-blue/30 hover:shadow-card-hover transition-all duration-300"
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
                <span className="text-[10px] font-mono uppercase tracking-widest text-apple-blue bg-apple-blue/8 px-2.5 py-1 rounded-full mb-3">
                  {achievement.badge}
                </span>

                <h4 className="font-display font-bold text-foreground text-base mb-3 leading-snug">
                  {achievement.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
