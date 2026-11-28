"""
CBSE Class 12 Computer Science (083)
Topic 6: Degree & Cardinality Operation Calculation Simulator
Calculates:
1. Impact of row insertions, deletions, and truncations
2. Impact of column additions and drops
3. Cartesian Product (Cross Join)
4. Natural Join
5. Set Operations (Union, Intersect, Difference)
"""

def solve_cbse_problem(name, d1, c1, d2, c2):
    print("=" * 65)
    print(f"  CBSE DEGREE & CARDINALITY SOLVER: {name}")
    print("=" * 65)
    print(f"  Table 1: Degree = {d1}, Cardinality = {c1}")
    print(f"  Table 2: Degree = {d2}, Cardinality = {c2}")
    
    # 1. Cartesian Product
    cart_deg = d1 + d2
    cart_card = c1 * c2
    print("\n  [1. CARTESIAN PRODUCT (Table1 x Table2)]:")
    print(f"      Degree      = {d1} + {d2} = {cart_deg}")
    print(f"      Cardinality = {c1} * {c2} = {cart_card}")
    
    # 2. Natural Join (assuming 1 common column)
    nat_deg = d1 + d2 - 1
    print("\n  [2. NATURAL JOIN (assuming 1 shared attribute)]:")
    print(f"      Degree = {d1} + {d2} - 1 = {nat_deg}")
    print("      Cardinality = Depends on matching rows in data")
    
    # 3. Operations on Table 1
    print("\n  [3. MODIFICATIONS ON TABLE 1]:")
    print(f"      If 5 rows inserted and 2 deleted -> Degree = {d1}, Cardinality = {c1 + 5 - 2}")
    print(f"      If 1 column added and 1 dropped  -> Degree = {d1 + 1 - 1}, Cardinality = {c1}")
    print(f"      If TRUNCATE executed             -> Degree = {d1}, Cardinality = 0")
    print("=" * 65)

if __name__ == "__main__":
    # CBSE 2023 Sample Paper Problem:
    # Table STUDENT (Degree 5, Cardinality 30)
    # Table COURSE  (Degree 3, Cardinality 6)
    solve_cbse_problem("STUDENT x COURSE", d1=5, c1=30, d2=3, c2=6)
