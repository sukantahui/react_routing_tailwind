const questions = [
  {
    id: 1,
    question: "In Worked Example 1, a 1D stream of 504 sensor values is reshaped into (7, 24, 3). What does each dimension index represent?",
    options: [
      "Axis 0: Days (7), Axis 1: Hours per day (24), Axis 2: Environmental sensors (3).",
      "Axis 0: Sensors (7), Axis 1: Days (24), Axis 2: Hours (3).",
      "Axis 0: Hours (7), Axis 1: Sensors (24), Axis 2: Days (3).",
      "Axis 0: Batches (504), Axis 1: Sensors (1), Axis 2: None."
    ],
    correctAnswer: 0,
    explanation: "The shape (7, 24, 3) structures the array hierarchically: 7 outer days, 24 hourly time steps per day, and 3 specific sensor channels (Temperature, Humidity, AQI) per hour."
  },
  {
    id: 2,
    question: "If an array has 504 elements, why does calling `arr.reshape(7, 25, 3)` raise a ValueError?",
    options: [
      "Because 7 is a prime number.",
      "Because 7 * 25 * 3 = 525, which exceeds the total element count of 504.",
      "Because 3D reshaping is not supported for float arrays.",
      "Because 25 is greater than 24."
    ],
    correctAnswer: 1,
    explanation: "Array reshaping requires the total number of elements to remain exactly invariant. The product of dimensions in the new shape must equal the original array size (504 != 525)."
  },
  {
    id: 3,
    question: "How does the `-1` dimension argument behave in `tensor_3d.reshape(-1, 3)` for a tensor with 504 total elements?",
    options: [
      "It deletes the first dimension.",
      "It automatically calculates the missing dimension as 504 / 3 = 168, yielding shape (168, 3).",
      "It reverses the rows of the array.",
      "It fills missing elements with -1."
    ],
    correctAnswer: 1,
    explanation: "Passing -1 tells NumPy to deduce that dimension size based on the total elements in the array and the other specified dimensions (504 / 3 = 168)."
  },
  {
    id: 4,
    question: "What is the difference between C-order (row-major) and Fortran-order (column-major) reshaping?",
    options: [
      "C-order reads/writes along the last axis first (row-wise), while Fortran-order reads/writes along the first axis first (column-wise).",
      "C-order is for integers and Fortran-order is for complex numbers.",
      "C-order always creates copies, while Fortran-order creates views.",
      "There is no difference in modern NumPy."
    ],
    correctAnswer: 0,
    explanation: "C-contiguous arrays increment memory addresses along the last dimension first (row by row), whereas Fortran-contiguous arrays increment along the first dimension first (column by column)."
  },
  {
    id: 5,
    question: "To convert an image batch from TensorFlow format (100, 28, 28, 1) [NHWC] to PyTorch format (100, 1, 28, 28) [NCHW], which function must be used?",
    options: [
      "np.reshape(batch, (100, 1, 28, 28))",
      "np.transpose(batch, (0, 3, 1, 2))",
      "np.vstack(batch)",
      "np.split(batch, 1)"
    ],
    correctAnswer: 1,
    explanation: "`np.transpose(batch, (0, 3, 1, 2))` permutes the axes so that Axis 3 (channels) moves to Axis 1. Calling `reshape` directly would interleave spatial pixels incorrectly instead of transposing channel axes!"
  }
];

export default questions;
