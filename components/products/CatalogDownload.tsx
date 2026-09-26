"use client";

import { useState } from "react";
import { Download, LoaderCircle } from "lucide-react";
import { getCategoryBySlug, products } from "@/lib/products";

const WIDTH = 1800;
const PAGE_PADDING = 110;
const COLUMN_GAP = 42;
const CARD_WIDTH = (WIDTH - PAGE_PADDING * 2 - COLUMN_GAP) / 2;
const CARD_HEIGHT = 430;
const ROW_GAP = 34;
const HEADER_HEIGHT = 430;
const FOOTER_HEIGHT = 250;

function roundedRect(context: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) {
  const r = Math.min(radius, width / 2, height / 2);
  context.beginPath();
  context.moveTo(x + r, y);
  context.arcTo(x + width, y, x + width, y + height, r);
  context.arcTo(x + width, y + height, x, y + height, r);
  context.arcTo(x, y + height, x, y, r);
  context.arcTo(x, y, x + width, y, r);
  context.closePath();
}

function loadImage(source: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

function drawContainedImage(
  context: CanvasRenderingContext2D,
  image: HTMLImageElement,
  x: number,
  y: number,
  width: number,
  height: number,
) {
  const scale = Math.min(width / image.naturalWidth, height / image.naturalHeight);
  const drawWidth = image.naturalWidth * scale;
  const drawHeight = image.naturalHeight * scale;
  context.drawImage(image, x + (width - drawWidth) / 2, y + (height - drawHeight) / 2, drawWidth, drawHeight);
}

function wrapText(context: CanvasRenderingContext2D, text: string, maxWidth: number, maxLines: number) {
  const words = text.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (context.measureText(candidate).width <= maxWidth) {
      line = candidate;
      continue;
    }
    if (line) lines.push(line);
    line = word;
    if (lines.length === maxLines - 1) break;
  }
  if (line && lines.length < maxLines) lines.push(line);
  return lines;
}

export default function CatalogDownload() {
  const [status, setStatus] = useState<"idle" | "creating" | "error">("idle");

  async function downloadCatalog() {
    if (status === "creating") return;
    setStatus("creating");

    try {
      await document.fonts?.ready;
      const rows = Math.ceil(products.length / 2);
      const height = HEADER_HEIGHT + rows * CARD_HEIGHT + (rows - 1) * ROW_GAP + FOOTER_HEIGHT;
      const canvas = document.createElement("canvas");
      canvas.width = WIDTH;
      canvas.height = height;
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Canvas is unavailable");

      const [logo, ...productImages] = await Promise.all([
        loadImage("/images/brand/logo-mark.png"),
        ...products.map((product) => loadImage(product.featuredImage ?? product.images?.[0] ?? "")),
      ]);

      context.fillStyle = "#F6F4EF";
      context.fillRect(0, 0, WIDTH, height);

      context.fillStyle = "#B00018";
      context.fillRect(0, 0, WIDTH, 18);
      drawContainedImage(context, logo, PAGE_PADDING, 74, 116, 116);

      context.fillStyle = "#B00018";
      context.font = "800 24px Manrope, Inter, Arial";
      context.letterSpacing = "2px";
      context.fillText("SHREE SANJAY", 252, 112);
      context.fillStyle = "#202427";
      context.font = "700 17px Manrope, Inter, Arial";
      context.letterSpacing = "6px";
      context.fillText("EQUIPMENTS", 252, 148);
      context.fillStyle = "#62676A";
      context.font = "700 13px Inter, Arial";
      context.letterSpacing = "4px";
      context.fillText("SINCE 2004", 252, 180);

      context.textAlign = "right";
      context.fillStyle = "#7D0012";
      context.font = "700 15px Inter, Arial";
      context.letterSpacing = "4px";
      context.fillText("PRODUCT CATALOG", WIDTH - PAGE_PADDING, 112);
      context.fillStyle = "#62676A";
      context.font = "500 14px Inter, Arial";
      context.letterSpacing = "0px";
      context.fillText("Construction equipment, repairs and servicing", WIDTH - PAGE_PADDING, 148);
      context.textAlign = "left";

      context.fillStyle = "#202427";
      context.font = "800 64px Manrope, Inter, Arial";
      context.letterSpacing = "-2px";
      context.fillText("Built for every job site.", PAGE_PADDING, 300);
      context.fillStyle = "#62676A";
      context.font = "400 21px Inter, Arial";
      context.letterSpacing = "0px";
      context.fillText("Site-ready equipment supplied from Coimbatore, Tamil Nadu.", PAGE_PADDING, 346);

      products.forEach((product, index) => {
        const column = index % 2;
        const row = Math.floor(index / 2);
        const x = PAGE_PADDING + column * (CARD_WIDTH + COLUMN_GAP);
        const y = HEADER_HEIGHT + row * (CARD_HEIGHT + ROW_GAP);

        context.fillStyle = "#FFFFFF";
        roundedRect(context, x, y, CARD_WIDTH, CARD_HEIGHT, 26);
        context.fill();
        context.strokeStyle = "#E2DED6";
        context.lineWidth = 2;
        context.stroke();

        context.save();
        roundedRect(context, x + 18, y + 18, 290, CARD_HEIGHT - 36, 18);
        context.clip();
        context.fillStyle = "#F2EFE9";
        context.fillRect(x + 18, y + 18, 290, CARD_HEIGHT - 36);
        drawContainedImage(context, productImages[index], x + 34, y + 34, 258, CARD_HEIGHT - 68);
        context.restore();

        const copyX = x + 346;
        const copyWidth = CARD_WIDTH - 382;
        const category = getCategoryBySlug(product.category)?.name ?? "Equipment";
        context.fillStyle = "#B00018";
        context.font = "700 13px Inter, Arial";
        context.letterSpacing = "2.4px";
        context.fillText(category.toUpperCase(), copyX, y + 75);

        context.fillStyle = "#202427";
        context.font = "800 28px Manrope, Inter, Arial";
        context.letterSpacing = "-0.7px";
        const titleLines = wrapText(context, product.name, copyWidth, 2);
        titleLines.forEach((line, lineIndex) => context.fillText(line, copyX, y + 125 + lineIndex * 36));

        context.fillStyle = "#62676A";
        context.font = "400 17px Inter, Arial";
        context.letterSpacing = "0px";
        const descriptionLines = wrapText(context, product.shortDescription, copyWidth, 3);
        const descriptionY = y + 215;
        descriptionLines.forEach((line, lineIndex) => context.fillText(line, copyX, descriptionY + lineIndex * 27));

        context.fillStyle = "#202427";
        context.font = "700 14px Inter, Arial";
        context.fillText("CONTACT FOR PRICE", copyX, y + CARD_HEIGHT - 48);
        context.fillStyle = "#B00018";
        context.fillRect(copyX, y + CARD_HEIGHT - 32, 62, 3);
      });

      const footerY = height - FOOTER_HEIGHT;
      context.fillStyle = "#202427";
      context.fillRect(0, footerY, WIDTH, FOOTER_HEIGHT);
      context.fillStyle = "#FFFFFF";
      context.font = "800 26px Manrope, Inter, Arial";
      context.letterSpacing = "-.5px";
      context.fillText("Talk to us about your equipment requirement.", PAGE_PADDING, footerY + 78);
      context.fillStyle = "#D3D5D6";
      context.font = "400 17px Inter, Arial";
      context.letterSpacing = "0px";
      context.fillText("52/1, Avinashi Road, R.G. Pudur, Coimbatore 641062", PAGE_PADDING, footerY + 122);
      context.fillText("+91 98422 30721  |  +91 98421 06090  |  WhatsApp: +91 99424 06090", PAGE_PADDING, footerY + 158);
      context.textAlign = "right";
      context.fillStyle = "#FFFFFF";
      context.font = "700 18px Inter, Arial";
      context.fillText("shreesanjayequipments.com", WIDTH - PAGE_PADDING, footerY + 122);
      context.fillStyle = "#B00018";
      context.fillRect(WIDTH - PAGE_PADDING - 88, footerY + 148, 88, 4);

      const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.94));
      if (!blob) throw new Error("Catalog export failed");
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = "shree-sanjay-equipments-catalog.jpg";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      window.setTimeout(() => URL.revokeObjectURL(url), 1000);
      setStatus("idle");
    } catch (error) {
      console.error("Unable to create product catalog", error);
      setStatus("error");
    }
  }

  return (
    <div className="flex flex-col items-start gap-2 sm:items-end">
      <button
        type="button"
        onClick={downloadCatalog}
        disabled={status === "creating"}
        className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-accent px-5 text-[13px] font-semibold text-white shadow-[0_8px_22px_rgba(176,0,24,0.2)] transition-all hover:-translate-y-0.5 hover:bg-accent-strong disabled:cursor-wait disabled:opacity-65 disabled:hover:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {status === "creating" ? <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Download className="h-4 w-4" aria-hidden="true" />}
        {status === "creating" ? "Creating catalog..." : "Download Catalog"}
      </button>
      {status === "error" && <p role="alert" className="text-xs text-red-700">The catalog could not be created. Please try again.</p>}
    </div>
  );
}
