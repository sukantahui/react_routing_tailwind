"""
==============================================================================
Topic 22: Worked Example 3 - Grouping Sales by Region
Script 02: Multi-Dimensional Pivot Tables (Region vs Product Category)
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
    "Region": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Barrackpore", "Shyamnagar", "Titagarh", "Barrackpore", "Naihati", "Ichapur", "Titagarh", "Barrackpore"],
    "Category": ["Laptops", "Smartphones", "Accessories", "Laptops", "Smartphones", "Laptops", "Accessories", "Smartphones", "Smartphones", "Laptops", "Accessories", "Laptops"],
    "Units_Sold": [5, 12, 45, 8, 15, 6, 38, 10, 14, 4, 50, 7],
    "Revenue_INR": [250000.0, 180000.0, 45000.0, 400000.0, 225000.0, 310000.0, 38000.0, 150000.0, 210000.0, 200000.0, 52000.0, 360000.0]
}

df = pd.DataFrame(sales_records)

# --------------------------------------------------------------------------
# 1. Multi-Column GroupBy (Region & Category)
# --------------------------------------------------------------------------
section("1. MULTI-COLUMN GROUPBY (Region + Category)")
grouped_breakdown = df.groupby(["Region", "Category"])[["Revenue_INR", "Units_Sold"]].sum()
print(grouped_breakdown)

# --------------------------------------------------------------------------
# 2. Pivot Table: Region (Rows) vs Category (Columns) with Margins (Totals)
# --------------------------------------------------------------------------
section("2. PIVOT TABLE (pd.pivot_table WITH margins=True)")
pivot_revenue = pd.pivot_table(
    df,
    values="Revenue_INR",
    index="Region",
    columns="Category",
    aggfunc="sum",
    fill_value=0.0,
    margins=True,
    margins_name="Total_Region_Revenue"
)

print("Revenue Breakdown Matrix (INR):")
print(pivot_revenue.map(lambda v: f"₹{v:,.0f}"))
