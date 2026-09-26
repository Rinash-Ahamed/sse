export const WHATSAPP_NUMBER = "919942406090"; // +91 99424 06090

export function serviceWhatsAppLink(service: string) {
  const text = `Hello Shree Sanjay Equipments,\nI would like to enquire about ${service.toLowerCase()}.\n\nEquipment / model:\nIssue or servicing requirement:`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function generalWhatsAppLink() {
  const text =
    "Hello Shree Sanjay Equipments,\nI would like to know more about your construction equipment.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

export function productWhatsAppLink(productName: string, pageUrl: string) {
  // Use the public URL on both server and client so hydration and shared links are consistent.
  const productUrl = new URL(pageUrl, "https://www.shreesanjayequipments.com").href;
  const text = `Hello Shree Sanjay Equipments,\nI'm interested in the ${productName}.\nPlease share the latest price and details.\n\nProduct:\n${productUrl}`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}
