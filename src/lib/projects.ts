import { Building2, HeartHandshake, Rocket } from "lucide-react";

export type Project = {
  slug: string;
  title: string;
  industry: string;
  type: string;
  summary: string;
  problem: string;
  approach: string[];
  features: string[];
  results: string[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
};

export const projects: Project[] = [
  {
    slug: "appointment-conversion-rebuild",
    title: "Appointment-first local service redesign",
    industry: "Clinic / salon (appointment-driven)",
    type: "Conversion rebuild + local SEO basics",
    summary:
      "Rebuilt a mobile-first website to turn search traffic into calls and bookings with clearer services, stronger trust cues, and faster load.",
    problem:
      "Visitors weren’t booking—pages were slow on mobile, services were unclear, and the next step wasn’t obvious.",
    approach: [
      "Rewrote the homepage hierarchy around the top 3 services and common questions",
      "Designed a sticky mobile CTA (call / book) and simplified page layouts",
      "Optimized media and structure for performance and scanning",
    ],
    features: [
      "Service pages with intent-based structure",
      "Sticky “Call / Book” CTA on mobile",
      "Review highlights + trust block",
      "Local SEO hygiene (location signals + schema-ready structure)",
    ],
    results: [
      "Faster mobile load and improved UX",
      "Clearer navigation to services",
      "More users reaching booking/contact actions",
    ],
    icon: Building2,
  },
  {
    slug: "startup-landing-funnel",
    title: "B2B startup landing page + funnel",
    industry: "B2B SaaS (lead capture)",
    type: "Landing + messaging + analytics events",
    summary:
      "Created an experiment-ready landing page that explains value in seconds, handles objections, and tracks what actually drives demo requests.",
    problem:
      "High bounce rates from paid traffic because the offer wasn’t clear and the page didn’t address objections early.",
    approach: [
      "Built a narrative: problem → solution → outcomes → proof → FAQ",
      "Designed modular sections for quick iteration",
      "Instrumented key events to measure intent (CTA clicks, form starts, submits)",
    ],
    features: [
      "Clear positioning + use-cases block",
      "Objection-handling FAQ and comparisons",
      "Lead capture + event tracking",
      "Reusable components for rapid tests",
    ],
    results: [
      "Clearer message comprehension for new visitors",
      "Better visibility into drop-off points",
      "Faster iteration cycles for campaigns",
    ],
    icon: Rocket,
  },
  {
    slug: "ngo-donation-accessibility",
    title: "NGO donation + volunteer UX upgrade",
    industry: "Nonprofit / local NGO",
    type: "Accessibility-first redesign",
    summary:
      "Modernized the donation and volunteer experience with inclusive UI patterns, trust design, and simpler calls-to-action.",
    problem:
      "Users hesitated to donate or sign up due to low trust signals, inconsistent design, and accessibility gaps.",
    approach: [
      "Simplified donation and volunteer pathways to reduce cognitive load",
      "Applied WCAG-aware patterns (contrast, focus states, keyboard support)",
      "Rebuilt key pages around impact storytelling and reassurance",
    ],
    features: [
      "Donation flow optimization blocks",
      "Volunteer sign-up funnel",
      "Impact storytelling sections",
      "Accessibility-aware components and QA checklist",
    ],
    results: [
      "Clearer action paths for donors and volunteers",
      "Improved trust at first glance",
      "More inclusive experience across devices",
    ],
    icon: HeartHandshake,
  },
];

