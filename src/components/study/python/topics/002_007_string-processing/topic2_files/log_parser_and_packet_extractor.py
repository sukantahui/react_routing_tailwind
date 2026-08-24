# topic2_files/log_parser_and_packet_extractor.py
# Module: 002_007_string-processing
# Topic: Indexing, Slicing, Step Slicing & Reversing Strings
# Author: Sukanta Hui (Coder & AccoTax)

"""
Topic 2 - File 4: Real-World Log & Payment Packet Parser using Fixed-Width Slicing
Demonstrates:
  1. Parsing fixed-width legacy telecommunication & payment transaction streams
  2. Slicing structured fields: Timestamp, Log Level, IP, Txn ID, Amount, Status
  3. Defensive parsing with boundary slicing and field trimming
  4. Aggregate summary metrics (Total ₹ volume, failed transactions)
"""

from typing import List, Dict, Any

# Simulated fixed-width telemetry packets from Coder & AccoTax Payment Gateway
RAW_TRANSACTION_LOGS = [
    "2026-08-24 14:02:15 INFO  192.168.001.045 TXN-940281048201 0004500.00 SUCCESS User Susmita enrolled Python Pro",
    "2026-08-24 14:05:33 WARN  192.168.001.102 TXN-940281048202 0001200.50 RETRY   Temporary payment gateway timeout",
    "2026-08-24 14:08:19 ERROR 103.045.022.019 TXN-940281048203 0015000.00 FAILED  Insufficient balance in card",
    "2026-08-24 14:12:01 INFO  192.168.001.088 TXN-940281048204 0008500.00 SUCCESS User Rahul paid Web Dev advance",
    "2026-08-24 14:15:40 INFO  192.168.001.012 TXN-940281048205 0003200.00 SUCCESS User Ankan enrolled Data Analytics",
    "2026-08-24 14:22:11 ERROR 103.045.022.077 TXN-940281048206 0004500.00 FAILED  Card expired",
]

class FixedWidthPacketParser:
    """Parses fixed-width telemetry records using exact slice boundaries."""
    
    # Slice coordinate layout: (start, stop)
    TIMESTAMP_SLICE = (0, 19)
    LEVEL_SLICE     = (20, 25)
    IP_SLICE        = (26, 41)
    TXN_ID_SLICE    = (42, 58)
    AMOUNT_SLICE    = (59, 69)
    STATUS_SLICE    = (70, 78)
    PAYLOAD_SLICE   = (78, None)  # Slices to the end of line

    @classmethod
    def parse_line(cls, record: str) -> Dict[str, Any]:
        """Extracts and sanitizes fields from a single fixed-width string."""
        return {
            "timestamp": record[cls.TIMESTAMP_SLICE[0]:cls.TIMESTAMP_SLICE[1]].strip(),
            "level": record[cls.LEVEL_SLICE[0]:cls.LEVEL_SLICE[1]].strip(),
            "ip_address": record[cls.IP_SLICE[0]:cls.IP_SLICE[1]].strip(),
            "txn_id": record[cls.TXN_ID_SLICE[0]:cls.TXN_ID_SLICE[1]].strip(),
            "amount": float(record[cls.AMOUNT_SLICE[0]:cls.AMOUNT_SLICE[1]].strip()),
            "status": record[cls.STATUS_SLICE[0]:cls.STATUS_SLICE[1]].strip(),
            "message": record[cls.PAYLOAD_SLICE[0]:].strip(),
        }

    @classmethod
    def parse_all(cls, logs: List[str]) -> List[Dict[str, Any]]:
        return [cls.parse_line(line) for line in logs]


def run_payment_audit():
    print("=" * 75)
    print("CODER & ACCOTAX - BARRACKPORE PAYMENT TRANSACTION AUDIT")
    print("=" * 75)
    print(f"Parsing {len(RAW_TRANSACTION_LOGS)} incoming fixed-width payment packets...\n")

    parsed_records = FixedWidthPacketParser.parse_all(RAW_TRANSACTION_LOGS)

    # Display Parsed Structured Table
    header = f"{'TIMESTAMP':<20} | {'STATUS':<8} | {'AMOUNT (INR)':>12} | {'TXN ID':<18} | {'MESSAGE'}"
    print(header)
    print("-" * len(header))

    total_revenue = 0.0
    successful_count = 0
    failed_count = 0

    for r in parsed_records:
        status_tag = "[OK]  " if r["status"] == "SUCCESS" else ("[WARN]" if r["status"] == "RETRY" else "[FAIL]")
        print(f"{r['timestamp']:<20} | {status_tag} {r['status']:<7} | INR {r['amount']:>10.2f} | {r['txn_id']:<18} | {r['message']}")
        
        if r["status"] == "SUCCESS":
            total_revenue += r["amount"]
            successful_count += 1
        elif r["status"] == "FAILED":
            failed_count += 1

    print("-" * len(header))
    print("\n=== AUDIT SUMMARY ===")
    print(f"  * Total Processed Packets : {len(parsed_records)}")
    print(f"  * Successful Payments     : {successful_count}")
    print(f"  * Failed Transactions     : {failed_count}")
    print(f"  * Total Collected Revenue : INR {total_revenue:,.2f}")


if __name__ == "__main__":
    run_payment_audit()
