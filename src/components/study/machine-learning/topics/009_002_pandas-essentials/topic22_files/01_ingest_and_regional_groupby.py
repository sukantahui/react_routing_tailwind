"""
==============================================================================
Topic 22: Worked Example 3 - Grouping Sales by Region
Script 01: Transaction Ingestion & Regional Aggregation Metrics
Instructor: Sukanta Hui | Institution: Coder & AccoTax, Barrackpore
Students: Debangshu, Susmita, Swadeep, Tuhina, Sachin, Mahima, Abhronila
==============================================================================
"""

import pandas as pd

def section(title):
    print("\n" + "=" * 75)
    print(f"  {title}")
    print("=" * 75)

# Sales transaction logs from commercial retail branches in North 24 Parganas
sales_records = {
    "OrderID": [501, 502, 503, 504, 505, 506, 507, 508, 509, 510, 511, 512],
    "SalesRep": ["Debangshu", "Susmita", "Swadeep", "Tuhina", "Sachin", "Mahima", "Abhronila", "Debangshu", "Susmita", "Tuhina", "Sachin", "Mahima"],
    "Region": ["Barrackpore", "Shyamnagar", "Ichapur", "Naihati", "Barrackpore", "Shyamnagar", "Titagarh", "Barrackpore", "Naihati", "Ichapur", "Titagarh", "Barrackpore"],
    "Category": ["Laptops", "Smartphones", "Accessories", "Laptops", "Smartphones", "Laptops", "Accessories", "Smartphones", "Smartphones", "Laptops", "Accessories", "Laptops"],
    "Units_Sold": [5, 12, 45, 8, 15, 6, 38, 10, 14, 4, 50, 7],
    "Revenue_INR": [250000.0, 180000.0, 45000.0, 400000.0, 225000.0, 310000.0, 38000.0, 150000.0, 210000.0, 200000.0, 52000.0, 360000.0]
}

df = pd.DataFrame(sales_records)
section("1. FIRST 6 TRANSACTION RECORDS")
print(df.head(6))

# --------------------------------------------------------------------------
# 1. Grouping by Region: Total Revenue, Total Units, Order Count
# --------------------------------------------------------------------------
section("2. REGIONAL SALES PERFORMANCE SUMMARY")
regional_summary = df.groupby("Region", as_index=False).agg(
    Total_Orders=("OrderID", "count"),
    Total_Units=("Units_Sold", "sum"),
    Total_Revenue_INR=("Revenue_INR", "sum"),
    Average_Order_Value=("Revenue_INR", "mean")
).sort_values(by="Total_Revenue_INR", ascending=False).reset_index(drop=True)

regional_summary["Total_Revenue_INR"] = regional_summary["Total_Revenue_INR"].apply(lambda v: f"₹{v:,.0f}")
regional_summary["Average_Order_Value"] = regional_summary["Average_Order_Value"].apply(lambda v: f"₹{v:,.0f}")

print(regional_summary)
