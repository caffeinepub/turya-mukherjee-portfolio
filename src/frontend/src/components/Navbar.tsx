import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "About", href: "#about", ocid: "nav.about.link" },
  { label: "Resume", href: "#resume", ocid: "nav.resume.link" },
  { label: "Portfolio", href: "#portfolio", ocid: "nav.portfolio.link" },
  { label: "Contact", href: "#contact", ocid: "nav.contact.link" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "glass-nav" : "bg-transparent"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logotype */}
        <button
          type="button"
          onClick={() => handleNavClick("#hero")}
          data-ocid="nav.home.link"
          aria-label="Back to top"
          className="font-display font-bold text-xl tracking-tight text-foreground hover:text-apple-blue transition-colors"
        >
          Turya<span className="text-apple-blue">.</span>
        </button>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                data-ocid={link.ocid}
                onClick={() => handleNavClick(link.href)}
                className="underline-draw px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="ml-4">
            <a
              href="mailto:mukherjee.turya@gmail.com"
              data-ocid="nav.hireme.button"
              className="glass-button inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold"
            >
              Hire Me
            </a>
          </li>
        </ul>

        {/* Mobile Toggle */}
        <button
          type="button"
          className="md:hidden p-2 text-foreground hover:text-apple-blue transition-colors"
          onClick={() => setIsMobileOpen((v) => !v)}
          aria-label={isMobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMobileOpen}
          data-ocid="nav.mobile.toggle"
        >
          {isMobileOpen ? (
            <X className="w-5 h-5" />
          ) : (
            <Menu className="w-5 h-5" />
          )}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden glass-nav ${
          isMobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0 border-0"
        }`}
        style={{
          animation: isMobileOpen ? "slideDown 0.25s ease both" : undefined,
        }}
      >
        <ul className="max-w-6xl mx-auto px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <button
                type="button"
                data-ocid={link.ocid}
                onClick={() => handleNavClick(link.href)}
                className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/[0.05] rounded-xl transition-all"
              >
                {link.label}
              </button>
            </li>
          ))}
          <li className="mt-2 px-4">
            <a
              href="mailto:mukherjee.turya@gmail.com"
              data-ocid="nav.mobile.hireme.button"
              className="glass-button flex items-center justify-center py-3 rounded-full text-sm font-semibold"
            >
              Hire Me
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
