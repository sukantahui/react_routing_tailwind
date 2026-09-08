const questions = [
  {
    id: 1,
    question: "In `ax.scatter(x, y, s=size_array, c=color_array)`, what physical quantity does the parameter `s` specify?",
    options: [
      "Marker radius in inches",
      "Marker area in points squared (pt²)",
      "Marker circumference in pixels",
      "Marker opacity percentage"
    ],
    correctAnswer: 1,
    explanation: "In Matplotlib's `scatter()`, the `s` parameter defines the marker's area in points squared (`pt^2`), meaning doubling `s` doubles the visual area."
  },
  {
    id: 2,
    question: "How do you attach an interactive/visual color scale legend (Colorbar) to a scatter plot colored by a continuous variable?",
    options: [
      "ax.legend(colorbar=True)",
      "fig.colorbar(scatter_artist, ax=ax)",
      "plt.color_scale(scatter_artist)",
      "ax.show_palette()"
    ],
    correctAnswer: 1,
    explanation: "`fig.colorbar(scatter_artist, ax=ax)` attaches a colorbar matching the colormap and normalization of the scatter plot artist."
  },
  {
    id: 3,
    question: "When plotting 50,000 overlapping continuous points where dots blend into an uninterpretable solid block (overplotting), what is a superior Matplotlib 2D alternative?",
    options: [
      "ax.hexbin(x, y, gridsize=30, cmap='inferno')",
      "ax.plot(x, y, 'o')",
      "ax.pie(x)",
      "ax.bar(x, y)"
    ],
    correctAnswer: 0,
    explanation: "`ax.hexbin()` computes 2D hexagonal spatial histogram bins, mapping point density to color intensity and avoiding overplotting bottlenecks."
  },
  {
    id: 4,
    question: "Which NumPy function is used alongside `ax.scatter()` to compute the slope and intercept for a linear trendline overlay?",
    options: [
      "np.linear_model()",
      "np.polyfit(x, y, 1)",
      "np.trendline(x, y)",
      "np.gradient(x, y)"
    ],
    correctAnswer: 1,
    explanation: "`np.polyfit(x, y, deg=1)` calculates the least-squares polynomial coefficients (slope and intercept) for a straight line."
  }
];

export default questions;
