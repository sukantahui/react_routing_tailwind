# Rules for Study Topics Presentation & Printable Study Notes

## 1. Printable Plain-Text Study Notes (`PlainTextPrint`)
- **Download & Print Only**: The `PlainTextPrint` component MUST NOT render raw plain-text ASCII blocks (`<pre>`) expanded on screen by default.
- **Prop Requirement**: Always set `hidePreview={true}` on `<PlainTextPrint>` across all topic pages.
- **Functionality**: `PlainTextPrint` provides sleek action buttons (**Print Note**, **Download .txt**, **Copy Note**) and an optional "Preview Text" toggle, keeping the UI clean and clutter-free.

## 2. Rich Topic Presentation Requirements
- **Visual Presentation**: Topic pages MUST NOT rely on raw ASCII note text boxes to convey lesson content.
- **Structure**: Every topic page must contain:
  1. **Bilingual Language Toggle**: Smooth English / Bengali language switcher.
  2. **Hero Header**: Module code, topic title, sub-headline description, and metadata badges.
  3. **Visual Concept Breakdown**: Cards, grids, tables, and step-by-step frameworks explaining core concepts.
  4. **Interactive Workbench / Simulator**: Live interactive elements (scenarios, simulators, calculators, or interactive table filters) that let students test concepts hands-on.
  5. **Printable Note Action Bar**: `<PlainTextPrint hidePreview={true} showDownload={true} />`.
  6. **Diagnostic Practice Assessment**: `<FAQTemplate>` with unique questions in English and Bengali.
  7. **Teacher Profile Card**: `<Teacher>` summary note.
