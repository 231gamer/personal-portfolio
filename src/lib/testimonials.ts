export type Testimonial = {
  name: string;
  role: string;
  org: string;
  quote: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Maya R.",
    role: "Owner",
    org: "Bloom Studio (Salon)",
    quote:
      "The new site finally makes it easy for clients to book. The mobile experience is fast, clear, and we started getting better-quality inquiries within the first week.",
  },
  {
    name: "Daniel K.",
    role: "Founder",
    org: "Northbound SaaS",
    quote:
      "We needed a landing page that explained our value instantly and tracked what mattered. The structure and copy guidance saved us weeks of back-and-forth.",
  },
  {
    name: "Aisha S.",
    role: "Operations Lead",
    org: "Community Aid NGO",
    quote:
      "The donation and volunteer flows are much simpler now—and accessibility improvements were handled thoughtfully. Communication was fast and deadlines were met.",
  },
  {
    name: "Jon P.",
    role: "Marketing Manager",
    org: "Local Clinic",
    quote:
      "Clear process, clean design, and performance-focused delivery. It feels like a partner who understands conversion, not just development.",
  },
];

