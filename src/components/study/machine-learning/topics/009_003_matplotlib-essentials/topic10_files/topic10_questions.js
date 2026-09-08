const questions = [
  {
    id: 1,
    question: "Why is `bbox_inches='tight'` considered essential when calling `plt.savefig()`?",
    options: [
      "It compresses the image by 90% using GZIP",
      "It recalculates the bounding box to ensure external elements like outside legends, super-titles, and tick labels are not clipped off at the canvas borders",
      "It converts the plot to 4K UHD automatically",
      "It makes the image background transparent"
    ],
    correctAnswer: 1,
    explanation: "By default, `savefig` uses the nominal figure dimensions, which often crops out legends placed with `bbox_to_anchor` or large titles. `bbox_inches='tight'` dynamically expands/crops the canvas to fit all artists."
  },
  {
    id: 2,
    question: "When embedding Matplotlib plots into a REST API response (FastAPI/Flask) without creating temporary files on the hard drive, which standard library module is used?",
    options: [
      "io.BytesIO()",
      "os.ram_disk()",
      "sys.tempfile()",
      "math.memory_buffer()"
    ],
    correctAnswer: 0,
    explanation: "`io.BytesIO()` creates an in-memory binary stream in RAM where `plt.savefig(buffer, format='png')` writes bytes directly for zero-disk I/O."
  },
  {
    id: 3,
    question: "Which file format preserves infinite mathematical scalability and selectable font text for Academic LaTeX publications?",
    options: [
      "PNG",
      "JPEG",
      "PDF or SVG (Vector formats)",
      "BMP"
    ],
    correctAnswer: 2,
    explanation: "Vector formats (PDF, SVG, EPS) store lines, text, and geometric curves as mathematical paths that scale infinitely without pixelation."
  },
  {
    id: 4,
    question: "Which class in Matplotlib allows combining multiple separate Figure plots into a single multi-page PDF document?",
    options: [
      "matplotlib.backends.backend_pdf.PdfPages",
      "plt.multi_save()",
      "matplotlib.document.PDFWriter",
      "plt.export_book()"
    ],
    correctAnswer: 0,
    explanation: "`PdfPages` acts as a context manager (`with PdfPages('doc.pdf') as pdf:`) allowing sequential calls to `pdf.savefig(fig)` to append pages."
  }
];

export default questions;
