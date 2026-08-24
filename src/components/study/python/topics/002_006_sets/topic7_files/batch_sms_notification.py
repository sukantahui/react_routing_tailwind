# ====================================================================
# Topic 7: Iterating Through Sets
# File: batch_sms_notification.py
# Description: Real-World Exam Alert Notification Dispatch in Barrackpore & Kolkata
# ====================================================================

# Unique verified candidate contact numbers for Barrackpore Exam Center
candidate_phones = {
    "+91-9830111222",
    "+91-9830333444",
    "+91-9830555666",
    "+91-9830777888",
    "+91-9830999000"
}

exam_venue = "Coder & AccoTax Auditorium, Barrackpore"
exam_date = "2026-08-30"

print(f"Total Unique SMS Alerts to Dispatch: {len(candidate_phones)}\n")

# Dispatching SMS alerts across all unique phone numbers
sms_dispatch_log = []
for index, phone in enumerate(candidate_phones, start=1):
    message = f"Admit Card Ready: Report to {exam_venue} on {exam_date}."
    sms_dispatch_log.append({"recipient": phone, "status": "SENT", "cost_inr": 0.25})
    print(f"[{index}/{len(candidate_phones)}] Dispatched SMS to {phone} -> Cost: ₹0.25")

total_sms_cost = sum(log["cost_inr"] for log in sms_dispatch_log)
print(f"\nTotal SMS Gateway Dispatch Cost: ₹{total_sms_cost:.2f}")
