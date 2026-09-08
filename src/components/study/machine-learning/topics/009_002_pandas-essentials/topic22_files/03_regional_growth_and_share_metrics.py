"""
==============================================================================
Topic 22: Worked Example 3 - Grouping Sales by Region
Script 03: Market Share Percentages & Top Sales Representatives
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

sales_records = {
    "OrderID": [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512],
    "SalesRep": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Susmita", "Tuhina", "Sachin", "Mahima"],
    "Region": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Barrackpore", "Shyamnagar", "Titagarh", "Barrackpore", "Naihati", "Ichapur", "Titagarh", "Barrackpore"],
    "Category": ["Laptops", "Smartphones", "Accessories", "Laptops", "Smartphones", "Laptops", "Accessories", "Smartphones", "Smartphones", "Laptops", "Accessories", "Laptops"],
    "Units_Sold": [5, 12, 45, 8, 15, 6, 38, 10, 14, 4, 50, 7],
    "Revenue_INR": [250000.0, 180000.0, 45000.0, 400000.0, 225000.0, 310000.0, 38000.0, 150000.0, 210000.0, 200000.0, 52000.0, 360000.0]
}

df = pd.DataFrame(sales_records)

# --------------------------------------------------------------------------
# 1. Calculating Regional Share of Grand Total Revenue
# --------------------------------------------------------------------------
section("1. REGIONAL REVENUE SHARE (%)")
total_corp_revenue = df["Revenue_INR"].sum()
regional_shares = (
    df.groupby("Region")["Revenue_INR"]
    .sum()
    .transform(lambda r: (r / total_corp_revenue) * 100)
    .round(2)
    .sort_values(ascending=False)
)

print(f"Total Corporate Revenue: ₹{total_corp_revenue:,.0f}")
print("\nMarket Share by Region:")
for reg, share in regional_shares.items():
    print(f"  - {reg:<15}: {share:>6.2f}%")

# --------------------------------------------------------------------------
# 2. Ranking Top Performing Sales Representatives
# --------------------------------------------------------------------------
section("2. TOP SALES REPS LEADERBOARD")
rep_leaderboard = df.groupby("SalesRep", as_index=False).agg(
    Orders_Closed=("OrderID", "count"),
    Units_Moved=("Units_Sold", "sum"),
    Total_Bookings=("Revenue_INR", "sum")
).sort_values(by="Total_Bookings", ascending=False).reset_index(drop=True)

rep_leaderboard["Total_Bookings"] = rep_leaderboard["Total_Bookings"].apply(lambda v: f"₹{v:,.0f}")
print(rep_leaderboard)
