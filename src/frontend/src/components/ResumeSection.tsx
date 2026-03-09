import { Badge } from "@/components/ui/badge";
import { useGetProfile } from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Briefcase, Download, GraduationCap, Users } from "lucide-react";

const experience = [
  {
    id: 1,
    role: "Analyst - Research and Investment Services",
    company: "Tresvista Analytics Pvt. Ltd.",
    location: "India",
    period: "Feb 2026 – Mar 2026",
    bullets: [
      "Worked mainly with Private Equity clients on research and investment analysis.",
    ],
    tags: ["Private Equity", "Investment Research", "Financial Analysis"],
  },
  {
    id: 2,
    role: "Associate – Corporate Account Manager",
    company: "Visit Health Private Limited",
    location: "Gurugram, India",
    period: "May 2025 – Dec 2025",
    bullets: [
      "Analyzed utilization and service consumption data for 1,000+ insured users, identifying OPD usage patterns, spend trends, benefit adoption rates, and YoY/MoM growth to inform annual renewal discussions.",
      "Built reporting models in Excel/Pivot (VLOOKUP, INDEX-MATCH) to quantify benefit utilization, unit economics, and insurer payout patterns, supporting pricing policy design decisions.",
      "Prepared client-facing presentations summarizing insights, performance metrics, and product improvement opportunities; influenced retention and renewal for a ₹12L annual revenue portfolio.",
      "Built relationships with HR, broker, insurer, and support teams to coordinate cases and prevent service breakdown.",
    ],
    tags: ["Account Management", "Data Analysis", "Excel", "Client Relations"],
  },
  {
    id: 3,
    role: "Sales Intern",
    company: "Curefit – House of Cult",
    location: "Bengaluru, India",
    period: "May 2024 – Jul 2024",
    bullets: [
      "Performed pricing & benchmarking research for corporate wellness packages to support enterprise sales cycle, generating ₹3,00,000+ in revenue during internship.",
      "Conducted structured discovery calls & demos for enterprise accounts, capturing buyer objections, product fit signals, and adoption blockers across 3 cities.",
      "Provided analytical support for decision-making in enterprise sales cycles.",
    ],
    tags: ["Sales", "Benchmarking", "Enterprise", "Market Research"],
  },
];

const education = [
  {
    id: 1,
    degree: "BBA – Finance and International Business",
    institution: "Christ University",
    location: "Bengaluru, India",
    period: "2022 – 2025",
    description:
      "Majored in Finance with focus on financial analysis, investment research, corporate finance, and international business strategy.",
  },
];

const skills: Record<string, string[]> = {
  "Technical Skills": [
    "Excel (Advanced: Pivot, VLOOKUP, What-if Analysis)",
    "PowerPoint (Storyboarding)",
    "Power BI",
    "Benchmarking",
    "Market Research",
    "Industry Research",
    "Unit Economics",
    "Sensitivity Modeling",
    "Due Diligence",
    "GTM Analysis",
  ],
  "Soft Skills": [
    "Customer Servicing",
    "Empathy",
    "Active Listening",
    "Expectation Management",
    "Conflict Resolution",
    "Problem Ownership",
  ],
  Certifications: [
    "EY Financial Risk Management",
    "Bloomberg Market Concepts",
    "Atlassian Agile Project Management Professional",
    "Six Sigma",
  ],
};

const positionsOfResponsibility = [
  {
    id: 1,
    role: "Consulting Intern",
    organization: "Christ Consulting Club",
    period: "2023 – 2024",
    bullets: [
      "Spearheaded a team of 4 interns to conduct competitive benchmarking study across 20+ universities (IIM/IIT/LSE), analyzing service models, pricing levers, and revenue pathways for consulting units.",
      "Brown Brews: Interviewed 120+ consumers across Bengaluru to assess product-market fit, pricing sensitivity, and demand drivers, informing launch and distribution strategy.",
      "Built a financial feasibility model for Hotel Daffodils projecting occupancy, RevPAR, unit economics & ROI sensitivity for funding readiness.",
    ],
  },
];

export function ResumeSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const { data: profile } = useGetProfile();

  return (
    <section
      id="resume"
      data-ocid="resume.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36 bg-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-apple-blue uppercase tracking-[0.2em]">
              02
            </span>
            <div className="w-6 h-px bg-apple-blue" />
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Resume
            </h2>
          </div>
          <button
            type="button"
            data-ocid="resume.download.button"
            onClick={() => {
              const url = profile?.resumeUrl;
              if (url && url !== "#") {
                window.open(url, "_blank", "noopener,noreferrer");
              }
            }}
            className="glass-button inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold self-start"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-xl bg-apple-blue/10 border border-apple-blue/20 flex items-center justify-center">
                <Briefcase className="w-4 h-4 text-apple-blue" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">
                Work Experience
              </h3>
            </div>

            <div className="space-y-6">
              {experience.map((job, idx) => (
                <TimelineItem
                  key={job.id}
                  isLast={idx === experience.length - 1}
                >
                  <div
                    data-ocid={`resume.experience.card.${idx + 1}`}
                    className="glass-card rounded-2xl p-5 hover:border-apple-blue/30 hover:shadow-[0_8px_30px_oklch(0_0_0/0.4)] transition-all duration-300"
                  >
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-display font-bold text-foreground text-base">
                          {job.role}
                        </h4>
                        <p className="text-apple-blue text-sm font-medium mt-0.5">
                          {job.company}
                        </p>
                        {job.location && (
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {job.location}
                          </p>
                        )}
                      </div>
                      <span className="font-mono text-xs text-muted-foreground bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                        {job.period}
                      </span>
                    </div>
                    <ul className="mb-4 space-y-1.5">
                      {job.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                        >
                          <span className="mt-[3px] shrink-0 text-apple-blue/60">
                            ·
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-white/[0.06] text-muted-foreground border-0 font-normal"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TimelineItem>
              ))}
            </div>
          </div>

          {/* Education + Skills */}
          <div className="space-y-12">
            {/* Education */}
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="w-8 h-8 rounded-xl bg-apple-blue/10 border border-apple-blue/20 flex items-center justify-center">
                  <GraduationCap className="w-4 h-4 text-apple-blue" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground">
                  Education
                </h3>
              </div>
              <div className="space-y-6">
                {education.map((edu, idx) => (
                  <TimelineItem
                    key={edu.id}
                    isLast={idx === education.length - 1}
                  >
                    <div
                      data-ocid={`resume.education.card.${idx + 1}`}
                      className="glass-card rounded-2xl p-5 hover:border-apple-blue/30 transition-all duration-300"
                    >
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-display font-bold text-foreground text-base">
                            {edu.degree}
                          </h4>
                          <p className="text-apple-blue text-sm font-medium mt-0.5">
                            {edu.institution}
                          </p>
                          {edu.location && (
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {edu.location}
                            </p>
                          )}
                        </div>
                        <span className="font-mono text-xs text-muted-foreground bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {edu.description}
                      </p>
                    </div>
                  </TimelineItem>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-display text-xl font-bold text-foreground mb-8">
                Skills &amp; Tools
              </h3>
              <div className="space-y-5">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category}>
                    <p className="font-mono text-[10px] text-apple-blue uppercase tracking-[0.2em] mb-3">
                      {category}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <Badge
                          key={skill}
                          variant="outline"
                          className="border-border bg-white/[0.03] text-foreground/70 hover:border-apple-blue hover:text-apple-blue hover:bg-apple-blue/10 transition-all text-xs font-normal"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Positions of Responsibility */}
        <div className="mt-16">
          <div className="border-t border-border mb-12" />
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 rounded-xl bg-apple-blue/10 border border-apple-blue/20 flex items-center justify-center">
              <Users className="w-4 h-4 text-apple-blue" />
            </div>
            <h3 className="font-display text-xl font-bold text-foreground">
              Positions of Responsibility
            </h3>
          </div>
          <div className="space-y-6">
            {positionsOfResponsibility.map((pos, idx) => (
              <TimelineItem
                key={pos.id}
                isLast={idx === positionsOfResponsibility.length - 1}
              >
                <div
                  data-ocid={`resume.position.card.${idx + 1}`}
                  className="glass-card rounded-2xl p-5 hover:border-apple-blue/30 hover:shadow-[0_8px_30px_oklch(0_0_0/0.4)] transition-all duration-300"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-display font-bold text-foreground text-base">
                        {pos.role}
                      </h4>
                      <p className="text-apple-blue text-sm font-medium mt-0.5">
                        {pos.organization}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground bg-white/[0.05] px-2.5 py-1 rounded-full border border-white/[0.08]">
                      {pos.period}
                    </span>
                  </div>
                  <ul className="space-y-1.5">
                    {pos.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                      >
                        <span className="mt-[3px] shrink-0 text-apple-blue/60">
                          ·
                        </span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TimelineItem>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TimelineItem({
  children,
  isLast,
}: {
  children: React.ReactNode;
  isLast: boolean;
}) {
  return (
    <div className="relative pl-6">
      <div className="absolute left-0 top-5 w-3 h-3 rounded-full border-2 border-apple-blue bg-background z-10" />
      {!isLast && (
        <div
          className="absolute left-[5px] top-5 bottom-0 w-px"
          style={{
            background:
              "linear-gradient(to bottom, oklch(0.52 0.18 248 / 0.3), transparent)",
          }}
        />
      )}
      {children}
    </div>
  );
}
