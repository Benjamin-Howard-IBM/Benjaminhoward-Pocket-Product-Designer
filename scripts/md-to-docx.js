/**
 * Converts MCSP FedRAMP research findings Markdown files to .docx
 * Usage: node scripts/md-to-docx.js
 */

const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, PageNumber, Header, Footer, PageBreak
} = require('docx');

// ── Colours ──────────────────────────────────────────────────────────────────
const IBM_BLUE   = "0043CE";
const DARK_GRAY  = "161616";
const MID_GRAY   = "525252";
const LIGHT_GRAY = "F4F4F4";
const HEADER_BG  = "DDE1E6";
const WHITE      = "FFFFFF";

// ── Table border helper ───────────────────────────────────────────────────────
const tb = { style: BorderStyle.SINGLE, size: 1, color: "C1C7CD" };
const cellBorders = { top: tb, bottom: tb, left: tb, right: tb };

// ── Styles ────────────────────────────────────────────────────────────────────
const docStyles = {
  default: { document: { run: { font: "Arial", size: 22, color: DARK_GRAY } } },
  paragraphStyles: [
    {
      id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 32, bold: true, color: IBM_BLUE, font: "Arial" },
      paragraph: { spacing: { before: 360, after: 120 }, outlineLevel: 0 }
    },
    {
      id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 26, bold: true, color: DARK_GRAY, font: "Arial" },
      paragraph: { spacing: { before: 280, after: 80 }, outlineLevel: 1 }
    },
    {
      id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, color: MID_GRAY, font: "Arial" },
      paragraph: { spacing: { before: 200, after: 60 }, outlineLevel: 2 }
    },
    {
      id: "Heading4", name: "Heading 4", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 22, bold: true, italics: true, color: DARK_GRAY, font: "Arial" },
      paragraph: { spacing: { before: 160, after: 40 }, outlineLevel: 3 }
    },
    {
      id: "MetaBlock", name: "Meta Block", basedOn: "Normal",
      run: { size: 20, italics: true, color: MID_GRAY, font: "Arial" },
      paragraph: {
        spacing: { before: 40, after: 40 },
        indent: { left: 360 },
        border: { left: { style: BorderStyle.SINGLE, size: 4, color: IBM_BLUE, space: 8 } }
      }
    },
    {
      id: "BlockQuote", name: "Block Quote", basedOn: "Normal",
      run: { size: 20, italics: true, color: MID_GRAY, font: "Arial" },
      paragraph: {
        spacing: { before: 80, after: 80 },
        indent: { left: 720 },
        border: { left: { style: BorderStyle.SINGLE, size: 6, color: "8D8D8D", space: 12 } }
      }
    },
    {
      id: "ClaimBlock", name: "Claim Block", basedOn: "Normal",
      run: { size: 20, color: MID_GRAY, font: "Arial" },
      paragraph: {
        spacing: { before: 40, after: 40 },
        indent: { left: 720 },
        border: { left: { style: BorderStyle.SINGLE, size: 4, color: "8D8D8D", space: 8 } }
      }
    }
  ]
};

// ── Numbering ─────────────────────────────────────────────────────────────────
const numbering = {
  config: [
    {
      reference: "bullet-list",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } }
      }]
    },
    {
      reference: "sub-bullet",
      levels: [{
        level: 0, format: LevelFormat.BULLET, text: "◦", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 1080, hanging: 360 } } }
      }]
    }
  ]
};

// ── Markdown parser ───────────────────────────────────────────────────────────

// Apply inline bold/italic to a string → array of TextRun
function inlineRuns(text, extraProps = {}) {
  const runs = [];
  // Strip leading > (blockquote marker already handled at line level)
  const segments = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/);
  for (const seg of segments) {
    if (!seg) continue;
    if (seg.startsWith('**') && seg.endsWith('**')) {
      runs.push(new TextRun({ text: seg.slice(2, -2), bold: true, ...extraProps }));
    } else if (seg.startsWith('*') && seg.endsWith('*')) {
      runs.push(new TextRun({ text: seg.slice(1, -1), italics: true, ...extraProps }));
    } else if (seg.startsWith('`') && seg.endsWith('`')) {
      runs.push(new TextRun({ text: seg.slice(1, -1), font: "Courier New", size: 20, ...extraProps }));
    } else {
      runs.push(new TextRun({ text: seg, ...extraProps }));
    }
  }
  return runs;
}

function parseMd(raw) {
  const lines = raw.split('\n');
  const elements = [];
  let i = 0;
  let inMeta = false;

  // Check for frontmatter-style meta block (lines starting with >)
  // Actually the meta block uses > prefix in these files

  while (i < lines.length) {
    const line = lines[i];

    // ── Blank line ──
    if (!line.trim()) {
      i++;
      continue;
    }

    // ── HR ──
    if (/^---+$/.test(line.trim())) {
      elements.push(new Paragraph({
        spacing: { before: 120, after: 120 },
        border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "C1C7CD" } },
        children: [new TextRun("")]
      }));
      i++;
      continue;
    }

    // ── Headings ──
    const h4 = line.match(/^####\s+(.*)/);
    const h3 = line.match(/^###\s+(.*)/);
    const h2 = line.match(/^##\s+(.*)/);
    const h1 = line.match(/^#\s+(.*)/);

    if (h1) {
      elements.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: inlineRuns(h1[1]) }));
      i++; continue;
    }
    if (h2) {
      elements.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: inlineRuns(h2[1]) }));
      i++; continue;
    }
    if (h3) {
      elements.push(new Paragraph({ heading: HeadingLevel.HEADING_3, children: inlineRuns(h3[1]) }));
      i++; continue;
    }
    if (h4) {
      elements.push(new Paragraph({ heading: HeadingLevel.HEADING_4, children: inlineRuns(h4[1]) }));
      i++; continue;
    }

    // ── Blockquote / meta block (lines starting with >) ──
    if (line.startsWith('> ') || line === '>') {
      const content = line.replace(/^>\s?/, '');
      // Meta block is the summary block at top — use MetaBlock style
      elements.push(new Paragraph({ style: "MetaBlock", children: inlineRuns(content, { italics: true, size: 20, color: MID_GRAY }) }));
      i++; continue;
    }

    // ── Table ──
    if (line.startsWith('|')) {
      const tableLines = [];
      while (i < lines.length && lines[i].startsWith('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      // Parse table
      const rows = tableLines.filter(l => !l.match(/^\|[-| :]+\|$/));
      const parsedRows = rows.map(r =>
        r.split('|').slice(1, -1).map(c => c.trim())
      );
      if (parsedRows.length === 0) continue;
      const colCount = parsedRows[0].length;
      const colWidth = Math.floor(9360 / colCount);
      const colWidths = Array(colCount).fill(colWidth);

      const tableRows = parsedRows.map((row, ri) =>
        new TableRow({
          tableHeader: ri === 0,
          children: row.map(cell =>
            new TableCell({
              borders: cellBorders,
              width: { size: colWidth, type: WidthType.DXA },
              shading: { fill: ri === 0 ? HEADER_BG : WHITE, type: ShadingType.CLEAR },
              verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({
                spacing: { before: 60, after: 60 },
                children: inlineRuns(cell, ri === 0 ? { bold: true, size: 20 } : { size: 20 })
              })]
            })
          )
        })
      );

      elements.push(new Table({
        columnWidths: colWidths,
        margins: { top: 80, bottom: 80, left: 120, right: 120 },
        rows: tableRows
      }));
      elements.push(new Paragraph({ children: [new TextRun("")], spacing: { after: 80 } }));
      continue;
    }

    // ── Bullet list (- or * prefix) ──
    if (/^(\s*[-*])\s+/.test(line)) {
      const indent = line.match(/^(\s*)/)[1].length;
      const content = line.replace(/^\s*[-*]\s+/, '');
      const ref = indent >= 2 ? "sub-bullet" : "bullet-list";
      elements.push(new Paragraph({
        numbering: { reference: ref, level: 0 },
        spacing: { before: 40, after: 40 },
        children: inlineRuns(content)
      }));
      i++; continue;
    }

    // ── Claim block (lines starting with "> Claim:" or indented claim metadata) ──
    // Already handled via blockquote above

    // ── Normal paragraph ──
    elements.push(new Paragraph({
      spacing: { before: 60, after: 60 },
      children: inlineRuns(line)
    }));
    i++;
  }

  return elements;
}

// ── Document builder ──────────────────────────────────────────────────────────
function buildDoc(mdPath, outputPath) {
  console.log(`Reading: ${mdPath}`);
  const raw = fs.readFileSync(mdPath, 'utf8');
  const content = parseMd(raw);

  const doc = new Document({
    styles: docStyles,
    numbering,
    sections: [{
      properties: {
        page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
      },
      headers: {
        default: new Header({
          children: [new Paragraph({
            alignment: AlignmentType.RIGHT,
            spacing: { after: 0 },
            border: { bottom: { style: BorderStyle.SINGLE, size: 1, color: "C1C7CD" } },
            children: [
              new TextRun({ text: "MCSP FedRAMP Adoption Research", color: MID_GRAY, size: 18, font: "Arial" }),
              new TextRun({ text: "  |  IBM Confidential", color: MID_GRAY, size: 18, font: "Arial" })
            ]
          })]
        })
      },
      footers: {
        default: new Footer({
          children: [new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { before: 0 },
            border: { top: { style: BorderStyle.SINGLE, size: 1, color: "C1C7CD" } },
            children: [
              new TextRun({ text: "Page ", color: MID_GRAY, size: 18, font: "Arial" }),
              new TextRun({ children: [PageNumber.CURRENT], color: MID_GRAY, size: 18, font: "Arial" }),
              new TextRun({ text: " of ", color: MID_GRAY, size: 18, font: "Arial" }),
              new TextRun({ children: [PageNumber.TOTAL_PAGES], color: MID_GRAY, size: 18, font: "Arial" })
            ]
          })]
        })
      },
      children: content
    }]
  });

  Packer.toBuffer(doc).then(buf => {
    fs.writeFileSync(outputPath, buf);
    console.log(`Saved:   ${outputPath}`);
  });
}

// ── Run ───────────────────────────────────────────────────────────────────────
const base = path.join(__dirname, '..', 'output', '06.Projects', 'MCSP', '07. Research');

buildDoc(
  path.join(base, '[Research Findings] MCSP FedRAMP Adoption - Session #1 Answered Script.md'),
  path.join(base, '[Research Findings] MCSP FedRAMP Adoption - Session #1 Answered Script.docx')
);

buildDoc(
  path.join(base, '[Research Findings] MCSP FedRAMP Adoption - Session #2 Answered Script.md'),
  path.join(base, '[Research Findings] MCSP FedRAMP Adoption - Session #2 Answered Script.docx')
);
