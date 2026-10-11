import pdf from "pdf-parse/lib/pdf-parse.js";

export async function extractPdfText(buffer) {
  const parsedPdf = await pdf(buffer);
  return parsedPdf.text.trim();
}
