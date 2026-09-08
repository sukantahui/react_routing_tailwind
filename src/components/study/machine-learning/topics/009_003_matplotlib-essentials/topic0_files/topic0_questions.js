const questions = [
  {
    id: 1,
    question: "Which of the following describes the three-layer architecture of Matplotlib from lowest to highest level?",
    options: [
      "Backend Layer -> Artist Layer -> Scripting Layer (pyplot)",
      "Scripting Layer -> Backend Layer -> Artist Layer",
      "Artist Layer -> Canvas Layer -> UI Layer",
      "Data Layer -> Model Layer -> View Layer"
    ],
    correctAnswer: 0,
    explanation: "Matplotlib is structured into the Backend Layer (rendering/output), Artist Layer (visual primitives & hierarchy), and Scripting Layer (matplotlib.pyplot procedural interface)."
  },
  {
    id: 2,
    question: "What is the primary difference between the stateful pyplot interface and the Object-Oriented (OO) interface?",
    options: [
      "Pyplot is written in C while OO is written in Python.",
      "Pyplot implicitly manages the current active Figure and Axes, whereas OO explicitly instantiates and calls methods on Figure and Axes objects.",
      "OO is deprecated in Matplotlib 3.x and only pyplot is recommended.",
      "Pyplot requires GPU acceleration while OO runs on CPU."
    ],
    correctAnswer: 1,
    explanation: "The stateful pyplot interface tracks active canvas state using internal pointers (like plt.gca() and plt.gcf()), whereas OO explicitly returns (fig, ax) objects for direct manipulation."
  },
  {
    id: 3,
    question: "When generating multiple plots inside a high-throughput loop or web backend, what command must be called to prevent memory leaks?",
    options: [
      "plt.free()",
      "plt.clear_memory()",
      "plt.close(fig) or plt.close('all')",
      "plt.gc.collect()"
    ],
    correctAnswer: 2,
    explanation: "Matplotlib retains Figure objects in memory until they are explicitly destroyed with `plt.close(fig)` or `plt.close('all')`."
  },
  {
    id: 4,
    question: "In the Matplotlib hierarchy, what is an 'Axes'?",
    options: [
      "The plural of axis only (X and Y lines)",
      "The bounding region/subplot where data is actually plotted, containing its own coordinate system, ticks, labels, and plot elements",
      "The entire desktop application window",
      "The raster image encoder"
    ],
    correctAnswer: 1,
    explanation: "An Axes is the actual plot/canvas area inside a Figure with a coordinate system where lines, bars, dots, ticks, and legends live. A single Figure can contain multiple Axes."
  }
];

export default questions;
