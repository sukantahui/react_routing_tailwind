const questions = [
  {
    id: 1,
    question: "Why does `import scipy` followed by `scipy.stats.norm` often fail with an AttributeError in Python scripts?",
    options: [
      "Because SciPy requires a paid license",
      "Because SciPy subpackages are not imported automatically when importing top-level scipy to keep startup lightweight",
      "Because SciPy does not contain stats module",
      "Because NumPy must be uninstalled first"
    ],
    correctAnswer: 1,
    explanation: "SciPy namespaces are modular. To avoid loading megabytes of compiled C/Fortran extensions into memory unnecessarily, submodules must be explicitly imported (e.g., `from scipy import stats`)."
  },
  {
    id: 2,
    question: "What is the recommended pip command to install or update SciPy to the latest stable release?",
    options: [
      "pip install -U scipy",
      "python run scipy.exe",
      "npm install scipy",
      "git clone scipy --run"
    ],
    correctAnswer: 0,
    explanation: "`pip install -U scipy` upgrades or installs the latest pre-compiled binary wheel of SciPy from PyPI."
  },
  {
    id: 3,
    question: "What method can be used to inspect the compiled BLAS/LAPACK linear algebra backend configurations in SciPy?",
    options: [
      "scipy.show_config()",
      "scipy.list_hardware()",
      "scipy.gpu_check()",
      "scipy.hardware_info()"
    ],
    correctAnswer: 0,
    explanation: "`scipy.show_config()` displays detailed compilation details, linked OpenBLAS / MKL paths, and system compiler flags."
  }
];

export default questions;
