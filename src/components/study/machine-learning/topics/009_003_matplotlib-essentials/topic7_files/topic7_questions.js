const questions = [
  {
    id: 1,
    question: "Which parameter in `plt.pie()` causes a specific slice to be pulled outward from the center for visual emphasis?",
    options: [
      "detach",
      "explode",
      "offset_slice",
      "pull"
    ],
    correctAnswer: 1,
    explanation: "`explode` takes a tuple/list of float offsets (e.g., `explode=(0, 0.1, 0)`) specifying how far each slice is offset radially from the center."
  },
  {
    id: 2,
    question: "What is the cleanest modern way to transform a standard Matplotlib Pie chart into a hollow Donut chart?",
    options: [
      "Passing `wedgeprops=dict(width=0.35)` to carve an inner hollow radius",
      "Setting `pie_type='donut'`",
      "Setting `hollow=True`",
      "Using `plt.donut()`"
    ],
    correctAnswer: 0,
    explanation: "Setting `wedgeprops=dict(width=0.35)` specifies the radial width of each wedge, leaving the center hollow to create a clean Donut chart."
  },
  {
    id: 3,
    question: "In `plt.pie()`, what does `autopct='%1.1f%%'` accomplish?",
    options: [
      "Automatically scales data so it totals 100",
      "Formats and prints the calculated percentage on each slice with 1 decimal place followed by a percent sign",
      "Automatically chooses colors for the wedges",
      "Enables interactive 3D rotation"
    ],
    correctAnswer: 1,
    explanation: "`autopct` uses standard Python string formatting (or a callable) to display percentages, where `%1.1f%%` outputs values like `45.2%`."
  },
  {
    id: 4,
    question: "Why do data visualization best practices discourage using pie charts for datasets with more than 6-7 categories?",
    options: [
      "Matplotlib crashes with more than 7 wedges",
      "Human perception struggles to accurately compare angles and wedge areas of many thin slices, making bar charts far more readable",
      "Pie charts do not support labels",
      "Pie charts only work with integer numbers"
    ],
    correctAnswer: 1,
    explanation: "Human vision is significantly better at comparing linear lengths (bars) than subtle angle or area differences among multiple thin pie slices."
  }
];

export default questions;
