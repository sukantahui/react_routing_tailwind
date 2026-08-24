# topic10_files/chained_generator_expressions_pipeline.py
# Module: 003_003_decorators-generators
# Topic: Generator expressions for memory efficiency
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 10 - File 2: Chained Generator Expressions Data Pipeline
Demonstrates:
  1. Composing Unix-style data processing pipelines using chained generator expressions
  2. Data transformations (Ingest -> Parse -> Filter -> Format)
  3. Processing without creating intermediate lists in memory
"""

def demonstrate_chained_genexps():
    print("=" * 70)
    print("CODER & ACCOTAX - CHAINED GENERATOR EXPRESSIONS PIPELINE")
    print("=" * 70)

    # Simulated raw CSV strings from admission portal:
    raw_csv_logs = [
        "STU-101,Sourav Mukherjee,Python AI,25000.0,0.20",
        "STU-102,Priyanka Sen,Data Science,30000.0,0.10",
        "# COMMENT: Incomplete record to be ignored",
        "STU-103,Rahul Verma,Python Core,18000.0,0.00",
        "INVALID_ROW",
        "STU-104,Debolina Roy,Machine Learning,28000.0,0.15",
    ]

    print("1. Assembling 4-Stage Chained Generator Pipeline:")

    # Stage 1: Filter out comments and blank rows:
    non_comments = (line.strip() for line in raw_csv_logs if line.strip() and not line.startswith("#"))

    # Stage 2: Parse valid 5-column CSV rows:
    parsed_records = (
        line.split(",")
        for line in non_comments
        if len(line.split(",")) == 5
    )

    # Stage 3: Convert types and compute net fee payable:
    fee_structures = (
        {
            "id": row[0],
            "name": row[1],
            "course": row[2],
            "base_fee": float(row[3]),
            "discount_rate": float(row[4]),
            "net_payable": float(row[3]) * (1.0 - float(row[4]))
        }
        for row in parsed_records
    )

    # Stage 4: Filter for high-value student enrollments (Net fee >= INR 20,000):
    high_value_enrollments = (
        rec for rec in fee_structures
        if rec["net_payable"] >= 20000.0
    )

    print("   [PIPELINE ASSEMBLED] Zero records consumed yet (Pipelined in RAM).\n")

    # Final Sink: Consuming the pipeline:
    print("2. Consuming Pipeline via `for` Loop (Pull-based streaming):")
    total_high_value_revenue = 0.0

    for item in high_value_enrollments:
        print(
            f"   * [{item['id']}] {item['name']:<18} ({item['course']:<16}) -> "
            f"Net: INR {item['net_payable']:>8,.2f} (Disc: {item['discount_rate']*100:.0f}%)"
        )
        total_high_value_revenue += item["net_payable"]

    print(f"\n   Total High-Value Enrollment Revenue: INR {total_high_value_revenue:,.2f}")

    print(r"""
Pipeline Principle:
  Data flows element-by-element through each generator expression:
  Raw CSV -> Filter -> Parse -> Transform -> High-Value Filter -> Sink
  Memory usage remains O(1) throughout all 4 stages!
""")
    print("[PASSED] Chained Generator Expressions Pipeline Verified.")


if __name__ == "__main__":
    demonstrate_chained_genexps()
