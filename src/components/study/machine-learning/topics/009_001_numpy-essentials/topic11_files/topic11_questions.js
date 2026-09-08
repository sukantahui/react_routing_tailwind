// topic11_questions.js
// NumPy Essentials — Topic 11: Broadcasting Concept
// Coder & AccoTax | Sukanta Hui | Barrackpore, West Bengal

const topic11_questions = [
  {
    id: 1,
    question: "What is Broadcasting in NumPy?",
    options: [
      "A set of rules allowing arithmetic operations between arrays of different shapes without physically copying or duplicating data in RAM",
      "Transmitting array data over WiFi networks to cloud servers",
      "Converting multidimensional arrays into radio waves",
      "A technique that only works on 1D arrays"
    ],
    correctAnswer: 0,
    explanation: "Broadcasting is NumPy's ability to treat arrays of different shapes during arithmetic operations as if the smaller array were stretched to match the larger array, achieved via zero-copy striding in C."
  },
  {
    id: 2,
    question: "In what direction does NumPy compare dimension sizes when checking broadcasting compatibility?",
    options: [
      "From RIGHT to LEFT (starting with the trailing dimensions)",
      "From LEFT to RIGHT (starting with axis 0)",
      "From highest value to lowest value",
      "Randomly across all axes"
    ],
    correctAnswer: 0,
    explanation: "Broadcasting rule comparison begins with the trailing (rightmost) dimension and moves backward (to the left). For example, in comparing (3, 4) with (4,), the rightmost dimensions (4 and 4) are matched first."
  },
  {
    id: 3,
    question: "What are the two conditions under which two dimensions are considered compatible for broadcasting?",
    options: [
      "They are equal, OR one of them is 1",
      "They are both even numbers",
      "Their sum is greater than 10",
      "Both dimensions are greater than 0"
    ],
    correctAnswer: 0,
    explanation: "Two dimensions are compatible if: (1) they are equal in length, or (2) one of the dimensions has length 1 (which can be virtually stretched along that axis)."
  },
  {
    id: 4,
    question: "What happens when arrays have a different number of dimensions, such as (3, 4) and (4,)?",
    options: [
      "NumPy prepends dimensions of size 1 to the LEFT of the smaller array's shape until both have equal length (e.g. (4,) becomes (1, 4))",
      "NumPy appends 1s to the RIGHT of the smaller shape",
      "NumPy raises a DimensionMismatchError",
      "NumPy deletes extra dimensions from the larger array"
    ],
    correctAnswer: 0,
    explanation: "Under Rule 1 of broadcasting, dimensions of size 1 are prepended to the left of the smaller array's shape. Thus, shape `(4,)` becomes `(1, 4)`, which aligns perfectly with `(3, 4)`."
  },
  {
    id: 5,
    question: "What is the resulting shape when broadcasting array A of shape (3, 1) and array B of shape (1, 4)?",
    options: [
      "`(3, 4)`",
      "`(4, 3)`",
      "`(3, 1, 4)`",
      "`(12,)`"
    ],
    correctAnswer: 0,
    explanation: "For axis 0: max(3, 1) = 3. For axis 1: max(1, 4) = 4. The resulting broadcasted array has shape `(3, 4)`, creating an outer grid / cross-product table."
  },
  {
    id: 6,
    question: "Why does `np.zeros((3, 4)) + np.zeros((3,))` raise a ValueError in NumPy?",
    options: [
      "Because `(3,)` is prepended with 1 on the left to become `(1, 3)`. Comparing rightmost trailing dimensions: 4 vs 3 are not equal and neither is 1, causing a broadcast failure",
      "Because arrays cannot contain zeros",
      "Because 3 is a prime number",
      "Because addition is not allowed between 2D and 1D arrays"
    ],
    correctAnswer: 0,
    explanation: "Broadcasting pads `(3,)` to `(1, 3)`. Aligning `(3, 4)` and `(1, 3)` compares trailing dimensions: 4 and 3. Since 4 != 3 and neither is 1, NumPy raises `ValueError: operands could not be broadcast together with shapes (3,4) (3,)`."
  },
  {
    id: 7,
    question: "How do you correctly broadcast a 1D vector `v` of shape (3,) across the columns of a matrix `M` of shape (3, 4)?",
    options: [
      "`M + v.reshape(3, 1)` or `M + v[:, np.newaxis]`",
      "`M + v`",
      "`M + v.T`",
      "`np.broadcast(M, v)`"
    ],
    correctAnswer: 0,
    explanation: "To broadcast along axis 1 (across columns), the vector must have shape `(3, 1)`. Calling `v.reshape(3, 1)` or `v[:, np.newaxis]` converts shape `(3,)` into `(3, 1)`, allowing it to broadcast with `(3, 4)`."
  },
  {
    id: 8,
    question: "How does NumPy implement broadcasting internally without allocating extra memory in RAM?",
    options: [
      "By setting the memory byte stride for the broadcasted axis of size 1 to 0 bytes, repeatedly reading the same memory buffer",
      "By compressing the larger array with gzip",
      "By executing calculations on the GPU",
      "By copying elements into a hidden cache file on SSD"
    ],
    correctAnswer: 0,
    explanation: "NumPy achieves zero-copy broadcasting by setting the stride multiplier of the singleton axis to 0 bytes (`stride = 0`). When iterating along that axis, the memory pointer advances by 0 bytes, reading the identical value at C-speed without memory duplication."
  },
  {
    id: 9,
    question: "What is the broadcasted result shape of array A with shape (8, 1, 6, 1) and array B with shape (7, 1, 5)?",
    options: [
      "`(8, 7, 6, 5)`",
      "`(8, 1, 6, 5)`",
      "`(7, 8, 6, 5)`",
      "ValueError: incompatible shapes"
    ],
    correctAnswer: 0,
    explanation: "Aligning from right to left: B is padded to `(1, 7, 1, 5)`. Axis 3: max(1, 5) = 5. Axis 2: max(6, 1) = 6. Axis 1: max(1, 7) = 7. Axis 0: max(8, 1) = 8. Resulting shape is `(8, 7, 6, 5)`."
  },
  {
    id: 10,
    question: "In Machine Learning, what happens during column-wise mean subtraction `X - np.mean(X, axis=0)` when `X.shape == (1000, 20)`?",
    options: [
      "`np.mean(X, axis=0)` produces shape `(20,)`, which is broadcast as `(1, 20)` and subtracted from all 1000 rows of `X`",
      "`X` is converted into a scalar",
      "`X` is transposed",
      "It raises a ValueError"
    ],
    correctAnswer: 0,
    explanation: "Computing the column means gives a 1D vector of shape `(20,)`. Broadcasting pads this to `(1, 20)` and subtracts each feature's mean from every sample row in `X`, centering all features at zero in a single vectorized step."
  },
  {
    id: 11,
    question: "How is neural network dense layer bias addition `logits = (X @ W) + b` broadcasted for mini-batch size 64 and output dimension 10?",
    options: [
      "`(X @ W)` has shape `(64, 10)` and bias `b` has shape `(10,)`. `b` is broadcast as `(1, 10)` and added to all 64 samples in the batch",
      "Bias `b` is multiplied by 64",
      "The operation requires an explicit Python for-loop over 64 samples",
      "Bias is only added to the first sample"
    ],
    correctAnswer: 0,
    explanation: "The matrix multiplication `(X @ W)` produces shape `(64, 10)`. The 1D bias vector `b` of shape `(10,)` is broadcast as `(1, 10)` across all 64 sample rows simultaneously."
  },
  {
    id: 12,
    question: "When normalizing an image batch of shape (32, 224, 224, 3) using ImageNet RGB mean `np.array([123.68, 116.78, 103.94])`, how does broadcasting occur?",
    options: [
      "The RGB mean array of shape `(3,)` is prepended to `(1, 1, 1, 3)` and subtracted across all 32 images, 224 rows, and 224 columns",
      "Each image is flattened into 1D",
      "The operation requires looping over all 3 color channels",
      "An error is raised because the dimensions differ"
    ],
    correctAnswer: 0,
    explanation: "The 1D channel mean array of shape `(3,)` is automatically padded on the left to `(1, 1, 1, 3)`. It broadcasts across the batch, height, and width axes, subtracting the respective channel mean from every pixel."
  },
  {
    id: 13,
    question: "What function in NumPy explicitly creates broadcasted view arrays from multiple input arrays without copying memory?",
    options: [
      "np.broadcast_arrays(a, b)",
      "np.replicate_shapes(a, b)",
      "np.tile_together(a, b)",
      "np.stretch(a, b)"
    ],
    correctAnswer: 0,
    explanation: "`np.broadcast_arrays(*args)` takes multiple arrays and returns a list of zero-copy view arrays all broadcasted to a common shape."
  },
  {
    id: 14,
    question: "What does `np.broadcast_to(arr, (5, 4))` do when `arr = np.array([1, 2, 3, 4])`?",
    options: [
      "Returns a read-only (5, 4) zero-copy view with shape (5, 4) where the row `[1, 2, 3, 4]` is repeated 5 times",
      "Allocates 5 times more memory on the heap",
      "Raises an error because arr has only 4 elements",
      "Transposes the array"
    ],
    correctAnswer: 0,
    explanation: "`np.broadcast_to(arr, shape)` broadcasts an array to a new shape using stride-0 tricks without allocating memory. The resulting view is read-only."
  },
  {
    id: 15,
    question: "Can an in-place operation `A += B` be performed if `A` has shape (4,) and `B` has shape (3, 4)?",
    options: [
      "No, it raises `ValueError: non-broadcastable output operand with shape (4,) doesn't match the broadcast shape (3,4)` because `A` cannot grow in-place",
      "Yes, NumPy automatically expands `A` to (3, 4)",
      "Yes, but only the first row is added",
      "It converts `A` into a scalar"
    ],
    correctAnswer: 0,
    explanation: "In-place operations (`+=`, `*=`) require that the destination array `A` already has the full broadcasted shape because an existing memory buffer cannot be dynamically resized in-place."
  },
  {
    id: 16,
    question: "Can an in-place operation `A += B` be performed if `A` has shape (3, 4) and `B` has shape (4,)?",
    options: [
      "Yes, because `A` already has the target shape `(3, 4)` and `B` broadcasts cleanly into it",
      "No, in-place operations never support broadcasting",
      "Only if `B` contains zeros",
      "Only if `A` is 1-dimensional"
    ],
    correctAnswer: 0,
    explanation: "Yes! Since the destination `A` already has the shape `(3, 4)`, `B` is broadcast across the rows of `A` and added directly to `A`'s existing buffer in-place."
  },
  {
    id: 17,
    question: "What is the result of `np.array([1, 2, 3])[:, None] * np.array([10, 20, 30, 40])[None, :]`?",
    options: [
      "A (3, 4) multiplication table matrix where cell (i, j) = arr1[i] * arr2[j]",
      "A 1D vector of 12 elements",
      "A scalar number",
      "An IndexError"
    ],
    correctAnswer: 0,
    explanation: "Shape `(3, 1)` multiplied by shape `(1, 4)` broadcasts both arrays into a `(3, 4)` matrix computing the outer product: `[[10, 20, 30, 40], [20, 40, 60, 80], [30, 60, 90, 120]]`."
  },
  {
    id: 18,
    question: "How do you calculate all pairwise differences between dataset `X` of shape (100, 5) and centroids `C` of shape (3, 5) for K-Means clustering?",
    options: [
      "diffs = X[:, np.newaxis, :] - C[np.newaxis, :, :]  # Result shape: (100, 3, 5)",
      "diffs = X - C",
      "diffs = X @ C.T",
      "diffs = np.subtract(X, C)"
    ],
    correctAnswer: 0,
    explanation: "By expanding dimensions to `(100, 1, 5)` and `(1, 3, 5)`, broadcasting computes the difference between every sample and every centroid across all 5 features in a single vectorized `(100, 3, 5)` tensor without loops."
  },
  {
    id: 19,
    question: "How does broadcasting compare to `np.tile()` or `np.repeat()`?",
    options: [
      "Broadcasting is zero-copy in O(1) time and memory, whereas `np.tile()` and `np.repeat()` physically copy and duplicate array data in RAM",
      "Broadcasting is slower than `np.tile()`",
      "`np.tile()` uses less memory than broadcasting",
      "They are identical under the hood"
    ],
    correctAnswer: 0,
    explanation: "`np.tile()` and `np.repeat()` physically allocate new RAM buffers and duplicate data bytes. Broadcasting achieves the exact same mathematical effect without memory allocation via stride-0 indexing."
  },
  {
    id: 20,
    question: "What is the broadcasted shape when adding a scalar `5` to a 3D tensor of shape `(10, 20, 30)`?",
    options: [
      "`(10, 20, 30)`",
      "`(1, 10, 20, 30)`",
      "`(10, 20, 30, 1)`",
      "`(5, 10, 20, 30)`"
    ],
    correctAnswer: 0,
    explanation: "Scalars have shape `()` (0D) and broadcast to any target array shape without changing the array's dimensions."
  },
  {
    id: 21,
    question: "What is the result of `np.array([[1], [2], [3]]) + 10`?",
    options: [
      "`array([[11], [12], [13]])` (shape (3, 1))",
      "`array([11, 12, 13])` (shape (3,))",
      "`array([[11, 12, 13]])` (shape (1, 3))",
      "`array([[10], [10], [10]])`"
    ],
    correctAnswer: 0,
    explanation: "Adding scalar 10 to a (3, 1) column vector broadcasts 10 to every row, preserving the (3, 1) shape: `[[11], [12], [13]]`."
  },
  {
    id: 22,
    question: "If `A.shape == (5, 1, 4)` and `B.shape == (1, 6, 1)`, what is `(A * B).shape`?",
    options: [
      "`(5, 6, 4)`",
      "`(5, 1, 4)`",
      "`(1, 6, 4)`",
      "ValueError"
    ],
    correctAnswer: 0,
    explanation: "Axis 0: max(5, 1) = 5. Axis 1: max(1, 6) = 6. Axis 2: max(4, 1) = 4. The resulting shape is `(5, 6, 4)`."
  },
  {
    id: 23,
    question: "Why is broadcasting considered one of the most important concepts in Machine Learning and Deep Learning?",
    options: [
      "Because it enables batch operations, feature normalization, loss functions, and layer transformations without writing slow Python loops or duplicating gigabytes of memory",
      "Because it is required by the Python interpreter to compile code",
      "Because it automatically fixes bugs in neural networks",
      "Because it encrypts tensors during training"
    ],
    correctAnswer: 0,
    explanation: "Broadcasting enables seamless vectorization across batches, features, and channels. It replaces nested Python loops with compiled C routines running at hardware speeds with zero memory bloat."
  },
  {
    id: 24,
    question: "What happens if Susmita tries to broadcast shape (4, 3) with shape (4, 2)?",
    options: [
      "NumPy raises a ValueError: operands could not be broadcast together with shapes (4,3) (4,2)",
      "NumPy pads the missing column with zeros",
      "NumPy drops the 3rd column",
      "NumPy returns shape (4, 6)"
    ],
    correctAnswer: 0,
    explanation: "Comparing trailing dimensions: 3 vs 2 are not equal and neither is 1. Thus, broadcasting is impossible and raises a ValueError."
  },
  {
    id: 25,
    question: "What is Sukanta Hui's golden rule for debugging broadcasting shape mismatch errors in Barrackpore?",
    options: [
      "Write out the shape tuples aligned to the RIGHT side on paper; wherever a dimension is missing on the left, insert a 1, and ensure every pair is either EQUAL or has a 1",
      "Always convert all arrays to 1D vectors",
      "Always transpose the first array",
      "Add 1 to all dimensions until the error goes away"
    ],
    correctAnswer: 0,
    explanation: "By aligning shapes from right to left and checking that every dimension pair contains equal values or at least one 1, you can instantly determine if arrays broadcast and calculate the exact resulting shape."
  }
];

export default topic11_questions;
