# ====================================================================
# Module: 002_007_string-processing
# Topic 0: String creation, multiline strings & escape sequences
# File: escape_sequences_deep_dive.py
# Description: Comprehensive escape sequence demonstration (\n, \t, \\, \', \", \b, \r)
# ====================================================================

# 1. Newline (\n) and Horizontal Tab (\t)
receipt_line = "Student:\tSusmita Roy\nCourse:\t\tPython Pro\nFee Paid:\t₹4,500"
print("--- Tab and Newline Output ---")
print(receipt_line)

# 2. Escaped Backslash (\\) and Escaped Quotes
quote_text = "Debangshu's Mentor said: \"Always sanitize database inputs in 'Kolkata' backends!\""
print("\nEscaped Quotes Output:", quote_text)

# 3. Unicode Escape Sequences (\u and \U)
# Indian Rupee Symbol (₹) is Unicode \u20B9
rupee_unicode = "\u20B9 5,000 Special Discount for Ichapur Students"
bengali_namaskar = "\u09A8\u09AE\u09B8\u09CD\u0995\u09BE\u09B0" # 'নমস্কার' (Namaskar in Bengali)

print(f"\nUnicode Escaped Symbol: {rupee_unicode}")
print(f"Bengali Greeting: {bengali_namaskar} (Barrackpore Center)")

# 4. Carriage Return (\r) vs Backspace (\b)
# \r moves cursor to beginning of line
progress_demo = "Loading 10%...\rLoading 100% Complete!\n"
print(progress_demo)
