"""
01_pip_install_sklearn.py
Title: Installing Scikit-learn (Package: scikit-learn vs sklearn)
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

def main():
    print("=" * 65)
    print("🎓 Scikit-Learn Overview Lab 01: Proper Installation Guide")
    print("   Instructor: Sukanta Hui | Students: Debangshu, Susmita, Swadeep")
    print("=" * 65)

    print("\n📦 Installation Commands:")
    print("   ✓ Correct pip command   : pip install -U scikit-learn")
    print("   ✓ Correct Conda command : conda install -c conda-forge scikit-learn")
    print("   ⚠ Warning: Do NOT run 'pip install sklearn' directly (it was a dummy transitional package).")

    print("\n🔗 Core C-level & Math Dependencies:")
    print("   • numpy       : Multi-dimensional arrays")
    print("   • scipy       : Sparse matrices & linear algebra solvers")
    print("   • joblib      : CPU parallel multiprocessing & caching")
    print("   • threadpoolctl: Thread-pool controller for OpenMP / BLAS")

    try:
        import sklearn
        print(f"\n✓ Scikit-learn is successfully installed! Version: {sklearn.__version__}")
    except ImportError:
        print("\n✗ Scikit-learn not detected in environment.")

if __name__ == "__main__":
    main()
