"""
==============================================================================
Topic 26: Short Questions & Conceptual Mastery in Pandas
Script 03: Performance Optimization, Vectorization & Copy-on-Write
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd
import numpy as np

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# --------------------------------------------------------------------------
# Q6: Why inplace=True is Discouraged in Modern Pandas
# --------------------------------------------------------------------------
section("Q6: WHY IS inplace=True DISCOURAGED IN MODERN PANDAS 2.x/3.x?")
print("""
1. inplace=True prevents functional method chaining pipelines (e.g. df.drop().sort().head()).
2. inplace=True often creates hidden memory copies under the hood anyway.
3. Pandas 2.0+ uses Copy-on-Write (CoW), making mutations explicit and safe.
4. inplace=True is slated for eventual deprecation in future Pandas versions.
""")

# --------------------------------------------------------------------------
# Q7: Vectorization vs apply(axis=1)
# --------------------------------------------------------------------------
section("Q7: WHY DOES np.where RUN 300x FASTER THAN df.apply(axis=1)?")
print("""
- df.apply(axis=1) constructs a separate Python Series object for EVERY single row,
  executing interpreted Python bytecode and incurring heavy garbage collection overhead.
- np.where() operates on raw contiguous C memory buffers using SIMD CPU vector instructions.
""")

# --------------------------------------------------------------------------
# Q8: Categorical Dtypes for 10x Memory Reduction
# --------------------------------------------------------------------------
section("Q8: HOW DOES pd.Categorical REDUCE MEMORY FOOTPRINT?")
cities = pd.Series(["Barrackpore", "Kolkata", "Barrackpore", "Shyamnagar"] * 1000)
print(f"Object (String) Memory Usage     : {cities.memory_usage(deep=True):,} bytes")

cat_cities = cities.astype("category")
print(f"Categorical (Integer Encoded) RAM : {cat_cities.memory_usage(deep=True):,} bytes")
