import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AlertCircle, CheckCircle2, Clock, Mail, Send } from "lucide-react";
import { useState } from "react";

const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyN9NnC1RVPeDxktRxqhfiqY1jSN4pYTh7l_w-q4amdrkTdYjMDln1NSNohRWoRcqyYFQ/exec";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "mukherjee.turya@gmail.com",
    href: "mailto:mukherjee.turya@gmail.com",
  },
  {
    icon: Clock,
    label: "Response time",
    value: "1 - 2 hours",
    href: null,
  },
];

export function ContactSection() {
  const sectionRef = useScrollReveal<HTMLElement>();
  const headerRef = useScrollReveal<HTMLDivElement>();
  const contentRef = useScrollReveal<HTMLDivElement>();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Please enter a valid email";
    if (!form.message.trim()) newErrors.message = "Message is required";
    else if (form.message.trim().length < 10)
      newErrors.message = "Message must be at least 10 characters";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      (document.querySelector(`[name="${firstKey}"]`) as HTMLElement)?.focus();
      return;
    }
    setErrors({});
    setIsSubmitting(true);
    try {
      const body = new URLSearchParams({
        fullName: form.name,
        email: form.email,
        message: form.message,
      });
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body,
      });
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (status !== "idle") setStatus("idle");
  };

  return (
    <section
      id="contact"
      data-ocid="contact.section"
      ref={sectionRef}
      className="section-reveal py-28 md:py-36 bg-background"
    >
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div
          ref={headerRef}
          className="section-reveal flex items-center gap-3 mb-4"
        >
          <span className="font-mono text-xs text-apple-blue uppercase tracking-[0.2em]">
            04
          </span>
          <div className="w-6 h-px bg-apple-blue" />
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Contact
          </h2>
        </div>
        <p className="text-muted-foreground mb-16 max-w-lg">
          Whether you have an opportunity, want to collaborate on research, or
          just want to say hello \u2014 reach out.
        </p>

        <div
          ref={contentRef}
          className="section-reveal grid lg:grid-cols-5 gap-12 lg:gap-16"
        >
          {/* Left: Info */}
          <div className="lg:col-span-2">
            <h3 className="font-display text-2xl font-bold text-foreground mb-3">
              Let's connect
            </h3>
            <p className="text-muted-foreground leading-relaxed mb-8 text-sm">
              I'm always open to interesting conversations, new opportunities,
              or collaborating on impactful research.
            </p>

            <div className="space-y-4 stagger-children">
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div key={label} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-2xl bg-apple-blue/10 border border-apple-blue/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-apple-blue" />
                  </div>
                  <div>
                    <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                      {label}
                    </p>
                    {href ? (
                      <a
                        href={href}
                        className="text-sm font-medium text-foreground hover:text-apple-blue transition-colors"
                      >
                        {value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">
                        {value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Hire Me CTA */}
            <div className="mt-10 p-5 rounded-2xl glass-card">
              <p className="text-sm font-medium text-foreground mb-1">
                Ready to work together?
              </p>
              <p className="text-xs text-muted-foreground mb-4">
                Send a direct email for faster response.
              </p>
              <a
                href="mailto:mukherjee.turya@gmail.com"
                data-ocid="contact.hireme.button"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-apple-blue hover:underline underline-offset-2 transition-all"
              >
                <Mail className="w-3.5 h-3.5" />
                mukherjee.turya@gmail.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:col-span-3">
            {status === "success" ? (
              <div
                data-ocid="contact.success_state"
                className="glass-card rounded-2xl p-10 flex flex-col items-center justify-center text-center min-h-80"
              >
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-7 h-7 text-green-400" />
                </div>
                <h3 className="font-display text-2xl font-bold text-foreground mb-3">
                  Message sent!
                </h3>
                <p className="text-muted-foreground mb-6 max-w-sm text-sm">
                  Thanks for reaching out. I'll be in touch within 1-2 hours.
                </p>
                <button
                  type="button"
                  className="text-sm text-apple-blue hover:underline transition-all"
                  onClick={() => setStatus("idle")}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass-card rounded-2xl p-8 space-y-5"
              >
                {status === "error" && (
                  <div
                    data-ocid="contact.error_state"
                    role="alert"
                    className="flex items-start gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/25 text-sm"
                  >
                    <AlertCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-destructive">
                        Something went wrong
                      </p>
                      <p className="text-muted-foreground mt-0.5 text-xs">
                        Unable to send your message. Please try again or email
                        directly.
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-foreground"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={handleChange}
                      data-ocid="contact.name.input"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? "name-error" : undefined}
                      className={`bg-white/[0.05] border-border focus:border-apple-blue transition-colors rounded-xl text-foreground placeholder:text-muted-foreground ${
                        errors.name ? "border-destructive" : ""
                      }`}
                    />
                    {errors.name && (
                      <p
                        id="name-error"
                        data-ocid="contact.name.error_state"
                        className="text-xs text-destructive"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-foreground"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="hello@example.com"
                      value={form.email}
                      onChange={handleChange}
                      data-ocid="contact.email.input"
                      aria-invalid={!!errors.email}
                      aria-describedby={
                        errors.email ? "email-error" : undefined
                      }
                      className={`bg-white/[0.05] border-border focus:border-apple-blue transition-colors rounded-xl text-foreground placeholder:text-muted-foreground ${
                        errors.email ? "border-destructive" : ""
                      }`}
                    />
                    {errors.email && (
                      <p
                        id="email-error"
                        data-ocid="contact.email.error_state"
                        className="text-xs text-destructive"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <Label
                    htmlFor="message"
                    className="text-sm font-medium text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell me about your project, opportunity, or question..."
                    value={form.message}
                    onChange={handleChange}
                    data-ocid="contact.message.textarea"
                    rows={5}
                    aria-invalid={!!errors.message}
                    aria-describedby={
                      errors.message ? "message-error" : undefined
                    }
                    className={`bg-white/[0.05] border-border focus:border-apple-blue transition-colors resize-none rounded-xl text-foreground placeholder:text-muted-foreground ${
                      errors.message ? "border-destructive" : ""
                    }`}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      data-ocid="contact.message.error_state"
                      className="text-xs text-destructive"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  size="lg"
                  data-ocid="contact.submit.button"
                  disabled={isSubmitting}
                  className="w-full blue-button font-semibold gap-2 rounded-full transition-all border-0"
                  style={{
                    background:
                      "linear-gradient(145deg, oklch(0.78 0.008 260), oklch(0.60 0.006 260))",
                    color: "oklch(0.10 0.004 260)",
                  }}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
