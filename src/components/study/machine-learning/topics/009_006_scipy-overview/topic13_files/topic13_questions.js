const questions = [
  {
    id: 1,
    question: "In Problem 1, why was Welch's t-test (`equal_var=False`) chosen to compare blood glucose levels?",
    options: [
      "Because sample sizes or population variances of the two diet groups might not be equal, making Welch's t-test safer against Type I errors",
      "Because Group A has zero variance",
      "Because SciPy deprecated standard t-test",
      "Because glucose levels are categorical"
    ],
    correctAnswer: 0,
    explanation: "Welch's t-test avoids assuming homogeneity of variance, making it standard practice for real-world experimental data."
  },
  {
    id: 2,
    question: "In Problem 2, how does `cdist(incidents, stations, metric='euclidean')` simplify nearest ambulance dispatch?",
    options: [
      "It deletes distant stations",
      "It computes the full matrix of distances between all incidents and all stations, allowing `np.argmin()` to extract the nearest station index in one step",
      "It drives the ambulance automatically",
      "It requires a loop over every kilometer"
    ],
    correctAnswer: 1,
    explanation: "`cdist` computes all pairwise distances simultaneously in compiled C code, allowing instant nearest-neighbor selection via `np.argmin`."
  },
  {
    id: 3,
    question: "In Problem 3B, why does `scipy.optimize.minimize` converge rapidly on $J(w_1, w_2) = (w_1 - 3)^2 + (w_2 + 5)^2 + 8$?",
    options: [
      "Because the cost function is strictly convex and has a unique global minimum at (3.0, -5.0)",
      "Because it is an exponential function",
      "Because the learning rate is infinity",
      "Because no parameters exist"
    ],
    correctAnswer: 0,
    explanation: "Quadratic sum-of-squares cost functions are strictly convex with positive definite Hessians, allowing gradient and quasi-Newton methods (BFGS) to converge in few iterations."
  }
];

export default questions;
