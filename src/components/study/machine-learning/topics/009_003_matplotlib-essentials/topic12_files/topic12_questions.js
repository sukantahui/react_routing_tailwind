const questions = [
  {
    id: 1,
    question: "When creating a Radar (Spider) chart in Matplotlib, which projection argument must be passed to `plt.subplots()`?",
    options: [
      "subplot_kw=dict(polar=True)",
      "projection='radar'",
      "polar_mode=True",
      "chart_type='spider'"
    ],
    correctAnswer: 0,
    explanation: "Radar charts in Matplotlib are constructed on a polar coordinate system by passing `subplot_kw=dict(polar=True)`."
  },
  {
    id: 2,
    question: "Why must the first score and angle be appended to the end of the arrays (`scores += scores[:1]`) when drawing a Radar plot?",
    options: [
      "To increase the average score",
      "To close the perimeter polygon loop back to the initial category vertex",
      "To prevent division by zero",
      "To enable 3D rendering"
    ],
    correctAnswer: 1,
    explanation: "Appending the first vertex coordinates to the end of the list ensures the line and shaded fill complete a full 360-degree closed polygon."
  },
  {
    id: 3,
    question: "In a 3-subject grouped bar chart with bar width = 0.25, what are the respective horizontal offsets applied to array `x` for the three bars?",
    options: [
      "`x - 0.25`, `x`, `x + 0.25`",
      "`x - 1`, `x`, `x + 1`",
      "`x / 3`, `x / 2`, `x`",
      "`x`, `x + 0.5`, `x + 1.0`"
    ],
    correctAnswer: 0,
    explanation: "Placing the middle bar at `x`, the left bar at `x - width`, and the right bar at `x + width` creates a symmetrically grouped cluster."
  },
  {
    id: 4,
    question: "Which visual element is best suited to denote an academic pass/fail or distinction benchmark (e.g. 75%) across all students?",
    options: [
      "ax.axhline(75, color='red', linestyle='--')",
      "ax.plot(75, 75)",
      "plt.grid(75)",
      "ax.set_ylim(75)"
    ],
    correctAnswer: 0,
    explanation: "`ax.axhline(75, linestyle='--')` draws a clean horizontal benchmark threshold across the full width of the Axes."
  }
];

export default questions;
