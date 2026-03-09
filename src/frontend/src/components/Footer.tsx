import { Instagram, Linkedin } from "lucide-react";

const currentYear = new Date().getFullYear();

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Resume", href: "#resume" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/turya-mukherjee",
    label: "LinkedIn",
  },
  {
    icon: Instagram,
    href: "https://www.instagram.com/turjo_mukherjee_?igsh=eHhuNWNoeW1yM3Zl",
    label: "Instagram",
  },
];

export function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="relative border-t border-border py-12"
      style={{ background: "oklch(0.09 0.006 255)" }}
    >
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <button
            type="button"
            onClick={() => scrollTo("#hero")}
            data-ocid="footer.home.link"
            className="font-display font-bold text-xl tracking-tight text-foreground hover:text-apple-blue transition-colors"
          >
            Turya<span className="text-apple-blue">.</span>
          </button>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap items-center justify-center gap-6">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <button
                    type="button"
                    onClick={() => scrollTo(link.href)}
                    data-ocid={`footer.${link.label.toLowerCase()}.link`}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="glass-button w-9 h-9 rounded-full flex items-center justify-center hover:border-apple-blue hover:text-apple-blue transition-all"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border/50 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {currentYear} Turya Mukherjee. All rights reserved.</p>
          <p>
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-blue hover:underline transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
