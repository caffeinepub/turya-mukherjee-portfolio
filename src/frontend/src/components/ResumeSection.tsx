import { Badge } from "@/components/ui/badge";
import { useGetProfile } from "@/hooks/useQueries";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { Briefcase, Download, GraduationCap } from "lucide-react";

const experience = [
  {
    id: 1,
    role: "Research & Investment Services Analyst",
    company: "Research Firm · To be updated",
    period: "2023 – Present",
    description:
      "Conducted in-depth equity and market research, produced detailed investment reports, and provided data-driven recommendations. Analyzed macroeconomic trends and sector performance to support portfolio decisions.",
    tags: ["Financial Analysis", "Investment Research", "Equity", "Macro"],
  },
  {
    id: 2,
    role: "Account Manager",
    company: "Company · To be updated",
    period: "2022 – 2023",
    description:
      "Managed a portfolio of client accounts, built long-term relationships, and delivered tailored financial solutions. Coordinated cross-functional teams to ensure seamless service delivery and client satisfaction.",
    tags: [
      "Client Relations",
      "Account Management",
      "Financial Services",
      "CRM",
    ],
  },
];

const education = [
  {
    id: 1,
    degree: "Bachelor of Commerce / Finance",
    institution: "University · To be updated",
    period: "2019 – 2022",
    description:
      "Finance specialization with focus on investment analysis, financial modeling, and corporate finance. Graduated with strong academic performance.",
  },
];

const skills: Record<string, string[]> = {
  Analysis: [
    "Financial Modeling",
    "Equity Research",
    "Macro Analysis",
    "Valuation",
  ],
  Tools: ["Excel", "PowerPoint", "Bloomberg (basic)", "Research Databases"],
  "Soft Skills": [
    "Public Speaking",
    "Presentation",
    "Communication",
    "Team Leadership",
  ],
  Competitions: ["Case Study Analysis", "MUN", "Strategy"],
};

export function ResumeSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const { data: profile } = useGetProfile();

  return (
    <section
      id="resume"
      data-ocid="resume.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36"
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
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-foreground/20 text-sm font-semibold text-foreground hover:border-apple-blue hover:text-apple-blue hover:bg-apple-blue/5 transition-all self-start"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Experience */}
          <div>
            <div className="flex items-center gap-3 mb-10">
              <div className="w-8 h-8 rounded-xl bg-apple-blue/8 border border-apple-blue/15 flex items-center justify-center">
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
                  <div className="bg-card rounded-2xl p-5 border border-border hover:border-apple-blue/30 hover:shadow-card-hover transition-all duration-300">
                    <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-display font-bold text-foreground text-base">
                          {job.role}
                        </h4>
                        <p className="text-apple-blue text-sm font-medium mt-0.5">
                          {job.company}
                        </p>
                      </div>
                      <span className="font-mono text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
                        {job.period}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                      {job.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {job.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="text-xs bg-secondary text-muted-foreground border-0 font-normal"
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
                <div className="w-8 h-8 rounded-xl bg-apple-blue/8 border border-apple-blue/15 flex items-center justify-center">
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
                    <div className="bg-card rounded-2xl p-5 border border-border hover:border-apple-blue/30 transition-all duration-300">
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-display font-bold text-foreground text-base">
                            {edu.degree}
                          </h4>
                          <p className="text-apple-blue text-sm font-medium mt-0.5">
                            {edu.institution}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-muted-foreground bg-secondary px-2.5 py-1 rounded-full border border-border">
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
                          className="border-border text-foreground/70 hover:border-apple-blue hover:text-apple-blue hover:bg-apple-blue/5 transition-all text-xs font-normal"
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
