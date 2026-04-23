export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function whatsappLink(phoneE164: string, message: string) {
  const phone = phoneE164.replace(/[^\d+]/g, "");
  const text = encodeURIComponent(message);
  // wa.me requires number without '+'
  const digits = phone.startsWith("+") ? phone.slice(1) : phone;
  return `https://wa.me/${digits}?text=${text}`;
}

