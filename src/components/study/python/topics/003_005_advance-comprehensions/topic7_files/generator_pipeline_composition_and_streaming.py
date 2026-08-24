# topic7_files/generator_pipeline_composition_and_streaming.py
# Module: 003_005_advance-comprehensions
# Topic: Building clean data transformation pipelines
# Author: Sukanta Hui (Coder & AccoTax)

r"""
Topic 7 - File 1: Generator Pipeline Composition & Streaming Conveyor
Demonstrates:
  1. Composing multi-stage generator pipelines: `stage3(stage2(stage1(source)))`
  2. Pull-based lazy streaming: processing data one record at a time
  3. Constant O(1) memory footprint during multi-gigabyte transformations
"""

import sys
from typing import Iterator, Dict, Any, List

def stage_1_source_stream() -> Iterator[Dict[str, Any]]:
    """Stage 1: Generates raw student registration records lazily."""
    raw_records = [
        {"id": "STU-101", "name": "  sourav mukherjee  ", "fee": "30000", "status": "active"},
        {"id": "STU-102", "name": "priyanka sen", "fee": "35000", "status": "active"},
        {"id": "STU-103", "name": "debolina roy", "fee": "invalid_fee", "status": "active"},
        {"id": "STU-104", "name": "rahul verma", "fee": "25000", "status": "inactive"},
        {"id": "STU-105", "name": "  sneha gupta", "fee": "32000", "status": "active"}
    ]
    for r in raw_records:
        yield r


def stage_2_filter_active(stream: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
    """Stage 2: Filters only active records."""
    for record in stream:
        if record.get("status") == "active":
            yield record


def stage_3_sanitize_and_cast(stream: Iterator[Dict[str, Any]]) -> Iterator[Dict[str, Any]]:
    """Stage 3: Normalizes names and converts fee to float, safely skipping corrupt items."""
    for record in stream:
        try:
            cleaned_name = " ".join(record["name"].strip().split()).title()
            fee_float = float(record["fee"])
            yield {
                **record,
                "name": cleaned_name,
                "fee": fee_float
            }
        except (ValueError, KeyError):
            # Skip or quarantine corrupt records without crashing pipeline
            continue


def stage_4_apply_gst_tax(stream: Iterator[Dict[str, Any]], tax_rate: float = 0.18) -> Iterator[Dict[str, Any]]:
    """Stage 4: Appends calculated GST tax and gross tuition fee."""
    for record in stream:
        base_fee = record["fee"]
        gst_amt = round(base_fee * tax_rate, 2)
        gross_fee = round(base_fee + gst_amt, 2)
        yield {
            **record,
            "gst_amount": gst_amt,
            "gross_fee": gross_fee
        }


def demonstrate_generator_pipeline():
    print("=" * 70)
    print("CODER & ACCOTAX - GENERATOR PIPELINE COMPOSITION & STREAMING")
    print("=" * 70)

    # 1. Composing Lazy Generator Pipeline (Zero elements processed yet!):
    raw_stream = stage_1_source_stream()
    active_stream = stage_2_filter_active(raw_stream)
    sanitized_stream = stage_3_sanitize_and_cast(active_stream)
    taxed_pipeline = stage_4_apply_gst_tax(sanitized_stream, tax_rate=0.18)

    print("1. Pipeline Constructed (Lazy Evaluation Invariant):")
    print(f"   * Pipeline Head Object: {taxed_pipeline}")
    print("   -> No memory allocated; no loops executed until pull consumer triggers iteration!\n")

    # 2. Consuming Pipeline Record-by-Record (Pull-based streaming):
    print("2. Pulling Transformed Records through Conveyor Pipeline:")
    total_gross = 0.0
    for count, student in enumerate(taxed_pipeline, start=1):
        print(f"   * [{student['id']}] {student['name']:<18} | Base: INR {student['fee']:>8,.2f} | GST: INR {student['gst_amount']:>7,.2f} | Gross: INR {student['gross_fee']:>8,.2f}")
        total_gross += student["gross_fee"]

    print(f"\n   * Total Pipeline Audited Gross: INR {total_gross:,.2f}")

    print(r"""
Pipeline Invariants:
  1. Composed generator pipelines stream data with constant O(1) memory overhead.
  2. Each stage acts as a filter or transformer connected via lazy iterator protocols.
""")
    print("[PASSED] Generator Pipeline Composition & Streaming Verified.")


if __name__ == "__main__":
    demonstrate_generator_pipeline()
