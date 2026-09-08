const questions = [
  {
    id: 1,
    question: "How does the coding paradigm differ between Matplotlib and Seaborn?",
    options: [
      "Matplotlib is purely functional, while Seaborn is purely assembly language",
      "Matplotlib is imperative (telling step-by-step how to draw), while Seaborn is declarative (stating what statistical graphic to show)",
      "Matplotlib only works on web servers, while Seaborn works on GPUs",
      "There is no paradigm difference"
    ],
    correctAnswer: 1,
    explanation: "Matplotlib follows an imperative paradigm requiring low-level geometry commands, whereas Seaborn follows a declarative high-level paradigm."
  },
  {
    id: 2,
    question: "When plotting categorical groups in Matplotlib vs Seaborn, what must you do in Matplotlib?",
    options: [
      "Nothing, Matplotlib automatically creates legends and color groups by default",
      "Manually split/loop over DataFrame groups and create individual scatter calls with custom color dictionaries",
      "Recompile Python with C flags",
      "Matplotlib cannot plot multiple groups"
    ],
    correctAnswer: 1,
    explanation: "In Matplotlib, multi-group categorization requires manual `groupby` loops, manual color mapping, and explicit legend calls. Seaborn simplifies this to `hue='group'`."
  },
  {
    id: 3,
    question: "How do you render a Seaborn plot onto an existing Matplotlib Axes object `ax`?",
    options: [
      "Pass ax=ax into the Seaborn plotting function",
      "Call sns.render_to(ax)",
      "Pass canvas=ax",
      "It is impossible to combine Matplotlib axes with Seaborn"
    ],
    correctAnswer: 0,
    explanation: "Most Seaborn axes-level functions accept an `ax=...` argument allowing seamless embedding into Matplotlib `plt.subplots()` grids."
  },
  {
    id: 4,
    question: "What statistical feature does `sns.barplot()` calculate automatically that raw `plt.bar()` does not?",
    options: [
      "Mean aggregation and bootstrap confidence intervals",
      "Eigenvalue decomposition",
      "Linear regression coefficients",
      "Fourier transform spectra"
    ],
    correctAnswer: 0,
    explanation: "`sns.barplot()` automatically calculates category means and computes 95% bootstrap confidence intervals for error bars."
  }
];

export default questions;
