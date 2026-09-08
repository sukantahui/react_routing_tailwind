const questions = [
  {
    id: 1,
    question: "What is the industry-standard alias for importing the Matplotlib scripting layer?",
    options: [
      "import matplotlib as mp",
      "import matplotlib.pyplot as plt",
      "import pyplot as pt",
      "from matplotlib import plot"
    ],
    correctAnswer: 1,
    explanation: "`import matplotlib.pyplot as plt` is the universal, standardized alias across the entire Python data science community."
  },
  {
    id: 2,
    question: "If running Python on a headless server without a display GUI (such as an AWS EC2 instance or Docker container), which backend should be selected before importing pyplot?",
    options: [
      "matplotlib.use('Agg')",
      "matplotlib.use('TkAgg')",
      "matplotlib.use('Qt5Agg')",
      "matplotlib.use('DisplayGUI')"
    ],
    correctAnswer: 0,
    explanation: "'Agg' (Anti-Grain Geometry) is a non-interactive raster backend that renders PNG images directly into memory without requiring an X11/GUI display server."
  },
  {
    id: 3,
    question: "How can you temporarily apply a style sheet to a single figure without mutating the global plotting defaults?",
    options: [
      "plt.style.temp('dark_background')",
      "plt.style.isolate('dark_background')",
      "with plt.style.context('dark_background'):",
      "plt.rcParams.scope('dark_background')"
    ],
    correctAnswer: 2,
    explanation: "Using the Python context manager `with plt.style.context('theme_name'):` scopes the style configuration strictly within that code block and automatically restores previous defaults afterwards."
  },
  {
    id: 4,
    question: "Which rcParams key controls the physical dimensions of newly created Figures in inches?",
    options: [
      "figure.size_in_pixels",
      "figure.figsize",
      "axes.dimensions",
      "plot.canvas_inches"
    ],
    correctAnswer: 1,
    explanation: "`figure.figsize` takes a tuple of floats `(width, height)` specified in inches (e.g., `(10, 6)`)."
  }
];

export default questions;
