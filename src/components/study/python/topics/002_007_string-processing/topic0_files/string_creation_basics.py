# ====================================================================
# Module: 002_007_string-processing
# Topic 0: String creation, multiline strings & escape sequences
# File: string_creation_basics.py
# Description: Single quotes, double quotes, triple quotes, and str() constructor
# ====================================================================

# 1. Single quotes vs Double quotes (Identical in Python)
institute_single = 'Coder & AccoTax Barrackpore'
institute_double = "Coder & AccoTax Barrackpore"

print("Single quote string:", institute_single)
print("Double quote string:", institute_double)
print("Are they equal? ->", institute_single == institute_double)

# 2. Embedding quotes cleanly without escaping
# Use double quotes when the string contains a single quote / apostrophe
message_1 = "Welcome to Susmita's Python Workshop in Kolkata!"

# Use single quotes when the string contains double quotes
message_2 = 'Debangshu said: "Python is elegant and readable."'

print("\nEmbedded single quote:", message_1)
print("Embedded double quote:", message_2)

# 3. Explicit str() Constructor Conversion
admission_fee = 4500
fee_receipt_text = "Tuition Fee Amount: ₹" + str(admission_fee)
print("\nConstructor Conversion:", fee_receipt_text)
print("Type check:", type(fee_receipt_text))
