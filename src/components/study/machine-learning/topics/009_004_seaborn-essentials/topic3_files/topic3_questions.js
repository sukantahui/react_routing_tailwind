const questions = [
  {
    id: 1,
    question: "Which modern Seaborn function replaces the deprecated `sns.distplot()` for univariate histogram visualization?",
    options: [
      "sns.barchart()",
      "sns.histplot()",
      "sns.barcount()",
      "sns.freqplot()"
    ],
    correctAnswer: 1,
    explanation: "`sns.histplot()` is the primary modern axes-level function for plotting histograms with optional KDE overlays."
  },
  {
    id: 2,
    question: "What happens when you increase `bw_adjust` (e.g. bw_adjust=2.5) in `sns.kdeplot()`?",
    options: [
      "The curve becomes more smoothed and may hide minor multi-modal peaks",
      "The plot turns into a scatterplot",
      "The bins become discrete rectangles",
      "The bandwidth shrinks to zero creating sharp spikes"
    ],
    correctAnswer: 0,
    explanation: "`bw_adjust` scales the KDE bandwidth. Increasing it creates a smoother curve, while reducing it makes the curve more sensitive to local spikes."
  },
  {
    id: 3,
    question: "How do you overlay a smooth KDE curve directly onto an `sns.histplot()`?",
    options: [
      "pass smooth=True",
      "pass kde=True",
      "pass density_curve=True",
      "pass gaussian=True"
    ],
    correctAnswer: 1,
    explanation: "`sns.histplot(..., kde=True)` automatically calculates and overlays the continuous KDE line."
  },
  {
    id: 4,
    question: "What parameter in `sns.kdeplot()` fills the area under the density curve with a gradient/color?",
    options: [
      "fill=True (or shade=True in older versions)",
      "color_area=True",
      "paint=True",
      "solid=True"
    ],
    correctAnswer: 0,
    explanation: "`fill=True` is the modern parameter in `sns.kdeplot()` to shade the area under the curve."
  }
];

export default questions;
