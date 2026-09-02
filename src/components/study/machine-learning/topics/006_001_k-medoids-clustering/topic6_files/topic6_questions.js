const questions = [
  {
    question: "Why is K-Medoids guaranteed to converge in a finite number of iterations?",
    shortAnswer: "Because there are only a finite number of ways to choose K medoids from N points (C(N, K)), and the total cost monotonically decreases at every step without repeating states.",
    explanation: "Finite discrete state space + strictly non-increasing objective function = guaranteed finite termination.",
    hint: "Finite discrete combinations + monotonic cost reduction.",
    level: "basic"
  },
  {
    question: "What is the most standard termination condition for K-Medoids algorithms?",
    shortAnswer: "When the set of medoid indices does not change between iteration t and iteration t+1.",
    explanation: "If medoids are identical, cluster assignments in the next step will not change, reaching a fixed point.",
    hint: "Medoid indices remain unchanged.",
    level: "basic"
  },
  {
    question: "Does K-Medoids guarantee convergence to the global minimum cost?",
    shortAnswer: "No, like K-Means, K-Medoids is a local search optimization heuristic that converges to a local minimum.",
    explanation: "The quality of the final local minimum depends on initial medoid selection.",
    hint: "Local minimum guarantee, not global.",
    level: "basic"
  },
  {
    question: "How do machine learning practitioners avoid getting trapped in poor local minima in K-Medoids?",
    shortAnswer: "By running multiple random restarts (`n_init=10` or `20`) with different initial seeds and choosing the configuration with the lowest total cost.",
    explanation: "Standard practice implemented in all professional ML libraries.",
    hint: "Multiple random restarts (n_init).",
    level: "basic"
  },
  {
    question: "What is the typical number of iterations required for K-Medoids to converge on well-separated clusters?",
    shortAnswer: "Typically between 3 and 15 iterations.",
    explanation: "Medoid points rapidly settle into the dense cluster cores within a few initial cycles.",
    hint: "Typically 3 to 15 iterations.",
    level: "intermediate"
  },
  {
    question: "What happens if `max_iter` is set too low (e.g. `max_iter = 2`)?",
    shortAnswer: "The algorithm stops prematurely before medoids stabilize, resulting in suboptimal cluster boundaries.",
    explanation: "Premature termination prevents reaching a local minimum.",
    hint: "Premature termination before convergence.",
    level: "basic"
  },
  {
    question: "What is the role of the tolerance parameter `tol` (e.g. `tol = 1e-4`) in convergence testing?",
    shortAnswer: "It stops iterations if the relative change in total dissimilarity cost between successive iterations falls below `tol`.",
    explanation: "Saves computational time when cost improvements become negligible.",
    hint: "Relative cost change threshold.",
    level: "intermediate"
  },
  {
    question: "Can K-Medoids experience oscillation (cycling between two medoid sets) during iteration?",
    shortAnswer: "Only if tie-breaking between equidistant candidates is non-deterministic; deterministic index rules prevent cycling completely.",
    explanation: "Deterministic tie-breaking preserves strict Lyapunov stability.",
    hint: "Prevented by deterministic tie-breaking.",
    level: "advanced"
  },
  {
    question: "How does the convergence trajectory curve look when plotting Total Cost vs Iteration Number?",
    shortAnswer: "A monotonically decreasing convex curve that drops steeply in the first 2-3 iterations and flattens out asymptotically to a plateau.",
    explanation: "Reflects rapid early gain followed by fine-tuning.",
    hint: "Monotonically decreasing curve leveling off.",
    level: "intermediate"
  },
  {
    question: "What is the total number of candidate medoid configurations for N=100 and K=3?",
    options: ["161,700 (100 * 99 * 98 / 6)", "1,000", "100,000", "300"],
    correctAnswer: 0,
    explanation: "C(100, 3) = (100 * 99 * 98) / 6 = 161,700 distinct combinations.",
    level: "intermediate"
  },
  {
    question: "Why does the greedy BUILD phase in PAM reduce the total number of iterations needed in the SWAP phase?",
    shortAnswer: "Because BUILD places initial medoids very close to optimal positions, requiring far fewer SWAP replacements to reach convergence.",
    explanation: "High-quality greedy warm start minimizes search time.",
    hint: "High-quality initial configuration reduces swap steps.",
    level: "intermediate"
  },
  {
    question: "In scikit-learn-extra, what parameter controls the number of random initializations?",
    shortAnswer: "`init='random'` or `'k-medoids++'`, and `'n_init'` for restart count.",
    explanation: "Configures initialization and restart strategies.",
    hint: "init and n_init parameters.",
    level: "basic",
    codeExample: "kmed = KMedoids(n_clusters=3, init='k-medoids++', n_init=10)"
  },
  {
    question: "What is K-Medoids++ initialization?",
    shortAnswer: "A probabilistic initialization strategy that seeds medoids far apart from each other proportional to squared distance, mirroring K-Means++.",
    explanation: "Greatly accelerates convergence and produces superior local optima.",
    hint: "Distance-weighted probabilistic seeding.",
    level: "intermediate"
  },
  {
    question: "If a cluster loses all its points during an intermediate assignment step, how is convergence preserved?",
    shortAnswer: "The empty cluster's medoid is reseeded to the data point farthest from all existing medoids.",
    explanation: "Prevents degenerate cluster collapse.",
    hint: "Reseeding empty cluster medoid.",
    level: "advanced"
  },
  {
    question: "How do you verify whether a K-Medoids model has successfully converged in Python?",
    shortAnswer: "Inspect `kmedoids.n_iter_` to check how many iterations were executed before reaching the stopping threshold.",
    explanation: "Returns the actual iteration count taken.",
    hint: "kmedoids.n_iter_ attribute.",
    level: "basic",
    codeExample: "print(f'Converged in {kmed.n_iter_} iterations')"
  },
  {
    question: "What happens if data contains extreme duplicates (many identical points)?",
    shortAnswer: "Convergence is unaffected; multiple identical points simply form high-density attraction centers for medoids.",
    explanation: "Distance between identical points is 0.",
    hint: "Duplicates form dense attraction centers.",
    level: "basic"
  },
  {
    question: "Why is tracking convergence via medoid index comparison faster than computing floating-point cost differences?",
    shortAnswer: "Comparing K integer array indices (`np.array_equal`) takes O(K) time, avoiding floating-point rounding ambiguities.",
    explanation: "Integer set equality is exact and fast.",
    hint: "Integer array comparison in O(K) time.",
    level: "intermediate"
  },
  {
    question: "What is the 'Early Stopping' heuristic in K-Medoids?",
    shortAnswer: "Stopping the algorithm if the cost reduction between successive iterations is less than 0.01% of the total cost.",
    explanation: "Prevents wasting CPU cycles on imperceptible boundary shifts.",
    hint: "Stopping when cost reduction is negligible.",
    level: "intermediate"
  },
  {
    question: "In distributed cluster computing (e.g. Apache Spark), how is K-Medoids convergence monitored across worker nodes?",
    shortAnswer: "Worker nodes broadcast local assignment distance sums to the driver node, which evaluates the global convergence condition.",
    explanation: "Driver aggregates partition cost sums.",
    hint: "Driver aggregates broadcasted partition sums.",
    level: "advanced"
  },
  {
    question: "Can different initial random seeds cause K-Medoids to converge to different cluster arrangements?",
    shortAnswer: "Yes, different initial medoids can lead to different local minima with varying total dissimilarity costs.",
    explanation: "This is why `n_init > 1` is standard practice.",
    hint: "Different seeds lead to different local minima.",
    level: "basic"
  },
  {
    question: "What is the relationship between the inertia (total cost) and the number of clusters K?",
    shortAnswer: "As K increases, total cost decreases monotonically, reaching 0 when K = N (Elbow Method).",
    explanation: "More clusters always reduce distance to closest medoids.",
    hint: "Total cost decreases as K increases.",
    level: "basic"
  },
  {
    question: "Why does K-Medoids converge in fewer iterations than continuous gradient descent models?",
    shortAnswer: "Because each step performs an exact discrete combinatorial optimization rather than small infinitesimal gradient steps.",
    explanation: "Discrete jump steps settle rapidly.",
    hint: "Discrete combinatorial jumps vs continuous gradient steps.",
    level: "intermediate"
  },
  {
    question: "What indicates that K-Medoids did NOT converge normally?",
    shortAnswer: "When the executed iteration count equals `max_iter` and cost was still decreasing actively.",
    explanation: "Suggests `max_iter` was set too low.",
    hint: "n_iter_ equals max_iter.",
    level: "basic"
  },
  {
    question: "How does feature scaling affect the number of iterations required to converge?",
    shortAnswer: "Scaled features create more spherical, isotropic metric spaces, allowing medoids to settle in fewer iterations.",
    explanation: "Eliminates elongated distance valleys.",
    hint: "Reduces iterations by balancing distance topography.",
    level: "intermediate"
  },
  {
    question: "What is the ultimate golden rule of convergence in K-Medoids?",
    shortAnswer: "Convergence guarantees a stable, optimal local partition where every medoid is the best possible real exemplar for its assigned group.",
    explanation: "Marks the completion of the clustering lifecycle.",
    hint: "Stable local optimum with best real exemplars.",
    level: "basic"
  }
];

export default questions;
