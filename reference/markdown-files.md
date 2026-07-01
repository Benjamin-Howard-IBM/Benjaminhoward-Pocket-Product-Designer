# Markdown Files and Converting Uploaded Documents

A guide to what a markdown file is and how to turn an uploaded document (such as a `.docx`, `.odt`, or `.pdf`) into a clean markdown file. The conversion steps are grounded in how this Pocket Product Designer (PPD) repo processes raw documents into artifacts.

## What a markdown file is

**Markdown** is a lightweight plain-text formatting syntax. A markdown file is a regular text file (extension `.md`) that uses simple punctuation marks to indicate structure - headings, lists, bold, links - which tools then render as formatted output.

Why it is used throughout this repo:

- **Plain text** - readable as-is, diff-friendly in git, and editable in any editor.
- **Portable** - renders on GitHub, in VS Code preview, in most note tools, with no special software.
- **Agent-readable** - consistent headings and structure let AI agents grep, cite, and build on the content. This is why every PPD artifact (meeting notes, strategy, PDRs) is markdown.
- **Lossless source** - it stores structure without locking content inside a proprietary binary format like `.docx`.

### Basic syntax

```markdown
# H1 heading
## H2 heading
### H3 heading

*italic*   **bold**   ~~strikethrough~~   `inline code`

- bullet item
  - nested item
1. numbered item

[Link text](https://example.com)
![Image alt text](path/to/image.png)

> blockquote

| Column A | Column B |
|----------|----------|
| cell 1   | cell 2   |

---  (horizontal rule)
```

Fenced code block with a language hint for highlighting:

````markdown
```js
console.log("hello");
```
````

## Steps to create a markdown file from an uploaded document

An uploaded document (`.docx`, `.odt`, `.pdf`) is a container format. `.docx` and `.odt` are ZIP archives holding XML; `.pdf` is a layout format. The goal is to extract the text and re-express its structure as markdown.

### Step 1: Locate the source and the destination

Confirm where the uploaded file lives and where the markdown should go. In this repo:

- Raw uploads and their converted markdown live in a project's `06. Raw Documents/` folder.
- Synthesized summaries live in `01. Meetings/` (or the relevant artifact stage).

Use a predictable filename, for example matching the source name or the PPD pattern `{NNN}.{YY}.{MM}.{DD}.{Slug}.md`.

### Step 2: Extract the text

Pick the method available in your environment.

- **Preferred: pandoc** (handles structure, headings, lists, tables):

  ```bash
  pandoc "MyDoc.docx" -o "MyDoc.md"
  ```

- **No pandoc available** - extract directly, since `.docx` / `.odt` are ZIP archives:

  ```bash
  mkdir extracted && cd extracted
  unzip -o "MyDoc.docx"          # text lives in word/document.xml (.odt uses content.xml)
  ```

  Then parse the XML paragraphs into text (each `<w:p>` is a paragraph, `<w:t>` holds the runs of text) and unescape HTML entities. A short Python script can walk the paragraphs and join the text runs into lines.

- **PDF** - use a text extractor (`pdftotext`, or pandoc with a PDF reader) and expect to clean up layout artifacts manually.

### Step 3: Re-apply structure as markdown

Raw extraction gives you text but flattens formatting. Add markdown structure back:

- Promote the title to `#`, sections to `##` / `###`.
- Convert bullet and numbered lists to `-` and `1.`.
- For transcripts, format each turn as a bold speaker label plus timestamp, then the text:

  ```markdown
  **Speaker Name** 0:08
  What they said...
  ```

- Rebuild tables with pipe syntax.
- Preserve the original text verbatim; do not paraphrase the source during conversion.

### Step 4: Add a metadata header

Put a scannable header at the top so the file is easy to filter and cite:

```markdown
# <Title>

**Recording / Source:** <original file name>
**Date:** <date>
**Participants / Author:** <names>

---

## Raw Transcript        (or ## Raw Source for non-transcripts)
```

### Step 5: Save to the correct location

Write the file into the project's raw-documents folder (or the appropriate write zone). Keep the verbatim conversion separate from any synthesized summary.

### Step 6 (optional): Synthesize a summary

For PPD work, follow the conversion with a meeting-notes synthesis: extract TL;DR, Context, Key Discussion Points, Decisions, Action Items, and Open Questions, and save that summary to the meetings stage. The verbatim conversion stays as the source of truth; the summary is the usable context artifact.

### Step 7: Verify

- Open the markdown in a preview (`Cmd+Shift+V` in VS Code) and confirm headings, lists, and tables render.
- Spot-check that no content was dropped during extraction.
- Clean up any temporary extraction folders.

## Quick reference: what goes where in this repo

| Item | Location |
|---|---|
| Uploaded source document | project `06. Raw Documents/` |
| Verbatim markdown conversion | project `06. Raw Documents/` (same name, `.md`) |
| Synthesized summary | project `01. Meetings/` |
| General how-to references like this one | `reference/` |
