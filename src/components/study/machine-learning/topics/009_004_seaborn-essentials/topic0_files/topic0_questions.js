const questions = [
  {
    id: 1,
    question: "Which foundational library is Seaborn directly built on top of?",
    options: [
      "PyTorch",
      "Matplotlib",
      "TensorFlow",
      "Scipy Engine only"
    ],
    correctAnswer: 1,
    explanation: "Seaborn is built directly on top of Matplotlib and integrates closely with Pandas data structures."
  },
  {
    id: 2,
    question: "What is a primary advantage of Seaborn when working with Pandas DataFrames?",
    options: [
      "It requires converting DataFrames to C++ structs first",
      "It allows passing the DataFrame via data=df and column names as strings",
      "It only accepts 1D Python tuples",
      "It replaces Pandas completely as a database engine"
    ],
    correctAnswer: 1,
    explanation: "Seaborn is DataFrame-aware, allowing you to pass `data=df` and specify column names as strings for x, y, hue, etc."
  },
  {
    id: 3,
    question: "In Seaborn, what parameter is used to split and color data points by a categorical group column?",
    options: [
      "color_group",
      "hue",
      "split_by",
      "category_color"
    ],
    correctAnswer: 1,
    explanation: "The `hue` parameter in Seaborn automatically groups and colors data points based on a categorical or continuous column, complete with auto-generated legends."
  },
  {
    id: 4,
    question: "What is the difference between Figure-level functions (like relplot) and Axes-level functions (like scatterplot)?",
    options: [
      "Figure-level functions can manage multiple subplots/facets automatically, while Axes-level functions draw onto a single Matplotlib Axes",
      "Axes-level functions only work with 3D graphics",
      "Figure-level functions cannot show legends",
      "There is no difference between them"
    ],
    correctAnswer: 0,
    explanation: "Figure-level functions (relplot, catplot, displot) wrap FacetGrid and manage the entire figure, while Axes-level functions (scatterplot, barplot) draw onto a provided `ax`."
  }
];

export default questions;
