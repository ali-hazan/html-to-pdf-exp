import express from "express";
const app = express();
import { JSDOM } from "jsdom";
import pdf from "html-pdf";

const dom = new JSDOM(`<!DOCTYPE html><html><head></head><body>
  <p>Hello</p>
</body></html>`);
const document = dom.window.document;

app.get("/", function (req, res) {
  // Manipulate the virtual document
  const h1 = document.createElement("h1");
  h1.textContent = "Hello, World!";
  document.body.appendChild(h1);
  // Convert virtual DOM to HTML string
  const renderedHTML = dom.serialize();
  // PDF options (adjust as needed)
  const pdfOptions = { format: "A4" };
  // Convert HTML to PDF using html-pdf
  pdf.create(renderedHTML, pdfOptions).toFile("output.pdf", (err, res) => {
    if (err) {
      console.error("Error creating PDF:", err);
    } else {
      console.log("PDF created:", res.filename);
    }
  });
});

app.listen(3000, function () {
  console.log("Example app listening on port 3000!");
});
