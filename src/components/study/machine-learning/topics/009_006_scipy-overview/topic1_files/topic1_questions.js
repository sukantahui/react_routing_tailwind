const questions = [
  {
    question: "Why does `import scipy` alone NOT automatically import submodules like `scipy.stats` or `scipy.optimize`?",
    shortAnswer: "SciPy uses lazy/explicit submodule loading to prevent loading hundreds of megabytes of compiled C/Fortran libraries into RAM on startup.",
    explanation: "SciPy is composed of dozens of heavy compiled extensions. If `import scipy` automatically imported all subpackages, initial import time would be sluggish and consume excessive memory. Therefore, SciPy follows Python PEP recommendations requiring explicit submodule imports such as `import scipy.stats as stats` or `from scipy import spatial`.",
    hint: "Explicit submodule imports prevent memory bloat and keep startup fast.",
    level: "basic",
    codeExample: "import scipy\n# This will raise AttributeError: module 'scipy' has no attribute 'stats'\n# print(scipy.stats.describe([1, 2, 3]))\n\n# Correct standard practice:\nimport scipy.stats as stats\nprint(stats.describe([1, 2, 3]))"
  },
  {
    question: "What is the recommended installation command for SciPy on production systems?",
    shortAnswer: "`pip install scipy` or `conda install scipy`.",
    explanation: "For standard Python virtual environments, `pip install scipy` downloads pre-compiled binary wheels including optimized BLAS and LAPACK shared libraries. In Conda environments, `conda install -c conda-forge scipy` links against Intel MKL or OpenBLAS automatically.",
    hint: "Always install inside an activated virtual environment (venv or conda).",
    level: "basic",
    codeExample: "# In terminal:\npip install --upgrade pip\npip install scipy numpy pandas matplotlib\n\n# In Python sanity verification:\nimport scipy\nprint(scipy.__version__)\nprint(scipy.__file__)"
  },
  {
    question: "How do you check which underlying BLAS and LAPACK linear algebra acceleration engines SciPy is linked against?",
    shortAnswer: "Using `scipy.show_config()` or `scipy.__config__.show()`.",
    explanation: "`scipy.show_config()` inspects the active compilation flags and prints the detected acceleration libraries (such as OpenBLAS, Intel MKL, Accelerate, or ATLAS) and compiler info. This verifies whether your hardware vectorization (AVX-512, NEON) is active.",
    hint: "show_config() prints detailed build-time and runtime hardware linking information.",
    level: "moderate",
    codeExample: "import scipy\nscipy.show_config()\n\nimport scipy.linalg as la\nprint('Active BLAS wrapper:', la.blas.find_best_blas_type())"
  },
  {
    question: "Why should `from scipy import *` NEVER be used in production ML pipelines?",
    shortAnswer: "It causes severe namespace pollution and silently overwrites Python built-ins and NumPy functions.",
    explanation: "Wildcard imports pollute the global namespace with thousands of identifiers. Many function names clash with Python built-ins or NumPy (e.g., `any`, `all`, `sum`, `round`), creating unpredictable, silent numerical bugs and breaking static analysis tools like flake8 and mypy.",
    hint: "Always use explicit namespace aliases like `import scipy.stats as stats` or `import scipy.linalg as la`.",
    level: "basic",
    codeExample: "# BAD PRACTICE:\n# from scipy import *\n\n# PRODUCTION STANDARD:\nimport scipy.stats as stats\nimport scipy.spatial.distance as dist\nimport scipy.linalg as la"
  },
  {
    question: "How does SciPy handle system dependencies across Linux, Windows, and macOS?",
    shortAnswer: "Modern SciPy distributes self-contained binary wheels via PyPI that bundle all required compiled C/Fortran runtimes.",
    explanation: "Historically, users had to compile Fortran and C compilers (gfortran, gcc) manually. Today, official wheels on PyPI (manylinux, win_amd64, macosx_arm64) bundle OpenBLAS and gfortran runtime DLLs/shared objects directly, allowing seamless installation without external compilers.",
    hint: "Wheel binaries (.whl) eliminate the need for local Fortran/C compilers.",
    level: "moderate",
    codeExample: "import platform\nimport scipy\n\nprint('OS:', platform.system())\nprint('SciPy Version:', scipy.__version__)\nprint('Python Version:', platform.python_version())"
  },
  {
    question: "What is the standard naming convention for importing SciPy submodules in data science?",
    shortAnswer: "`import scipy.stats as stats`, `import scipy.linalg as la`, `import scipy.optimize as opt`, `import scipy.spatial as spatial`.",
    explanation: "The data science community follows standard canonical aliases to maintain clear, readable code across teams: `stats` for statistics, `la` or `linalg` for linear algebra, `opt` for optimization, `distance` for spatial distance metrics, and `sparse` for sparse matrices.",
    hint: "Canonical aliases make your code immediately readable by other ML engineers.",
    level: "basic",
    codeExample: "import scipy.stats as stats\nimport scipy.optimize as opt\nimport scipy.linalg as la\nimport scipy.spatial.distance as pdist\nimport scipy.sparse as sp"
  },
  {
    question: "What should you do if you encounter `ModuleNotFoundError: No module named 'scipy'` in a Jupyter notebook?",
    shortAnswer: "Verify that Jupyter is using the specific virtual environment kernel where SciPy was installed.",
    explanation: "Often Jupyter Notebook runs on a global base Python kernel while SciPy was installed in a custom virtual environment. Running `!python -m pip install scipy` inside the notebook or registering the venv with `python -m ipykernel install --user --name=myenv` resolves the environment mismatch.",
    hint: "Check sys.executable to confirm the kernel matches your active environment.",
    level: "moderate",
    codeExample: "import sys\nprint('Jupyter running on Python interpreter at:', sys.executable)\n# In notebook cell:\n# !{sys.executable} -m pip install scipy"
  },
  {
    question: "How can you programmatically verify that all required SciPy subpackages are functional in an automated CI/CD pipeline?",
    shortAnswer: "By writing a unit smoke-test that imports each core subpackage and executes a minimal numerical routine.",
    explanation: "A CI/CD sanity test imports `stats`, `spatial`, `linalg`, and `optimize`, runs a sample `stats.norm.cdf(0)`, `la.inv([[1, 2], [3, 4]])`, and `cdist([[0]], [[1]])`, asserting valid numerical output before deploying container images to production.",
    hint: "Smoke tests ensure dynamic C-extensions load properly inside Docker containers.",
    level: "advanced",
    codeExample: "import scipy.stats as stats\nimport scipy.linalg as la\nimport scipy.spatial.distance as dist\n\n# Smoke test assertion:\nassert abs(stats.norm.cdf(0) - 0.5) < 1e-6\nassert la.inv([[1, 0], [0, 1]]).shape == (2, 2)\nassert dist.euclidean([0, 0], [3, 4]) == 5.0\nprint('All SciPy subpackage smoke tests PASSED!')"
  }
];

export default questions;
