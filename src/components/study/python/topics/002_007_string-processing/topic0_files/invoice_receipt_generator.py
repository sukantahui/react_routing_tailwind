# ====================================================================
# Module: 002_007_string-processing
# Topic 0: String creation, multiline strings & escape sequences
# File: invoice_receipt_generator.py
# Description: Real-world formatted GST fee invoice generator in Indian Rupees (₹)
# ====================================================================

def generate_gst_invoice(student_name: str, course_name: str, base_fee: int):
    gst_amount = int(base_fee * 0.18)
    total_payable = base_fee + gst_amount

    # Using multiline string with tabs, escapes, and Indian Rupee symbol
    invoice_template = f"""+-------------------------------------------------------------+
|               CODER & ACCOTAX • BARRACKPORE                 |
|             GST INVOICE / OFFICIAL FEE RECEIPT              |
+-------------------------------------------------------------+
| Student Name:       {student_name:39} |
| Course Registered:  {course_name:39} |
| Center Location:    Barrackpore, Kolkata - 700120           |
+-------------------------------------------------------------+
| Base Tuition Fee:                                  ₹{base_fee:>7,d} |
| GST @ 18% (CGST 9% + SGST 9%):                     ₹{gst_amount:>7,d} |
+-------------------------------------------------------------+
| TOTAL NET PAYABLE:                                 ₹{total_payable:>7,d} |
+-------------------------------------------------------------+
| Thank you for choosing Coder & AccoTax Education!           |
+-------------------------------------------------------------+"""
    return invoice_template


# Generating invoice for Susmita Roy in Barrackpore
receipt = generate_gst_invoice("Susmita Roy", "Fullstack Python & React Pro", 6500)
print(receipt)
