"""
02_standard_imports.py
Title: Standard Data Science Import Conventions
Institution: Coder & AccoTax, Barrackpore
Instructor: Sukanta Hui
"""

import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd
import numpy as np

def main():
    print("=" * 65)
    print("🎓 Seaborn Essentials Lab 02: The Standard 4-Horsemen Imports")
    print("   Instructor: Sukanta Hui")
    print("=" * 65)

    # In every Machine Learning project or Kaggle notebook,
    # the following 4 lines are virtually ubiquitous:
    print("""
    # --- Standard ML Data Science Visualization Suite ---
    import numpy as np
    import pandas as pd
    import matplotlib.pyplot as plt
    import seaborn as sns
    """)

    # Alias convention:
    # seaborn -> sns (named after fictional TV character Samuel Norman Seaborn from The West Wing)
    print("🔍 Why is seaborn aliased as 'sns'?")
    print("   Trivia: Named playfully after 'Sam Norman Seaborn' from the TV series 'The West Wing'.")

    # Applying standard theme immediately after import
    sns.set_theme(style="whitegrid", palette="tab10")
    print("   ✓ Set global seaborn theme with sns.set_theme(style='whitegrid').")

if __name__ == "__main__":
    main()
