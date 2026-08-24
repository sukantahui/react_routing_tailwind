# ====================================================================
# Topic 11: Symmetric Difference Deep Dive
# File: bank_reconciliation_anomaly.py
# Description: Real-World Accounting Ledger Anomaly Detection & Bank Reconciliation in ₹
# ====================================================================

# Transaction Reference IDs recorded in Barrackpore Institute Internal ERP
internal_erp_txns = {
    "TXN-BP-801",
    "TXN-BP-802",
    "TXN-BP-803",
    "TXN-BP-804",
    "TXN-BP-805"
}

# Transaction Reference IDs confirmed in Bank Statement (SBI Barrackpore)
bank_statement_txns = {
    "TXN-BP-801",
    "TXN-BP-802",
    "TXN-BP-804",
    "TXN-BP-805",
    "TXN-BP-999"  # Direct bank deposit not yet logged in ERP
}

# Symmetric Difference: Identifies ALL unreconciled discrepancies in 1 line!
unreconciled_discrepancies = internal_erp_txns ^ bank_statement_txns

print("--- Bank Reconciliation Audit Report (Barrackpore Center) ---")
print(f"Total Discrepant Transactions ({len(unreconciled_discrepancies)}): {unreconciled_discrepancies}")

for txn in unreconciled_discrepancies:
    if txn in internal_erp_txns:
        print(f"  • {txn}: In ERP, but NOT yet cleared in Bank Statement (Pending Clearance: ₹4,500)")
    else:
        print(f"  • {txn}: In Bank Statement, but MISSING from ERP (Unrecorded Deposit: ₹4,500)")

total_anomaly_value = len(unreconciled_discrepancies) * 4500
print(f"\nTotal Discrepancy Amount Under Audit: ₹{total_anomaly_value:,}")
