const questions = [
  {
    id: 1,
    question: "What combination of Matplotlib functions is used to plot a 2D Machine Learning classification decision boundary with overlaid sample points?",
    options: [
      "`ax.contourf(xx, yy, zz)` for background regions and `ax.scatter(X[:,0], X[:,1], c=y)` for points",
      "`plt.pie()` and `plt.bar()`",
      "`ax.plot()` only",
      "`ax.hist2d()` and `ax.boxplot()`"
    ],
    correctAnswer: 0,
    explanation: "`ax.contourf` colors the 2D grid predicted by the ML model, and `ax.scatter` overlays the actual training/test data points on top."
  },
  {
    id: 2,
    question: "When plotting 2D Principal Component Analysis (PCA) projections, what metadata should ideally be displayed on the axis labels or annotations?",
    options: [
      "The Explained Variance Ratio of each Principal Component (e.g. PC1: 64.2%, PC2: 21.8%)",
      "The model's random seed number",
      "The CPU temperature",
      "The file save path"
    ],
    correctAnswer: 0,
    explanation: "Including the explained variance ratio informs viewers how much of the original dataset's total information/spread is captured by each 2D axis."
  },
  {
    id: 3,
    question: "In the famous Iris dataset, which pair of features achieves nearly 100% linear separation of Iris Setosa from the other two species?",
    options: [
      "Petal Length vs Petal Width",
      "Sepal Width vs Sepal Width",
      "ID vs Index",
      "Target vs Target"
    ],
    correctAnswer: 0,
    explanation: "Petal Length and Petal Width have completely distinct clusters for Iris Setosa (under 2.5 cm length) compared to Versicolor and Virginica."
  },
  {
    id: 4,
    question: "Why is `np.meshgrid()` used prior to calling `ax.contourf()` for ML decision boundaries?",
    options: [
      "To generate a dense 2D coordinate grid of evaluation points across the entire feature plane",
      "To sort the data array alphabetically",
      "To compress memory",
      "To calculate standard deviation"
    ],
    correctAnswer: 0,
    explanation: "`np.meshgrid(x_range, y_range)` constructs 2D matrices of coordinates covering every pixel in the plot window so the classifier can predict labels at every grid coordinate."
  }
];

export default questions;
