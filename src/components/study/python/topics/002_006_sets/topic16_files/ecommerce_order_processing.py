# ====================================================================
# Topic 16: Sets vs Lists vs Tuples
# File: ecommerce_order_processing.py
# Description: Real-World E-Commerce Pipeline using Sets, Lists, and Tuples in ₹
# ====================================================================

# 1. TUPLE: Immutable product specification record (SKU, Title, Unit Price in ₹)
PRODUCT_A = ("SKU-BP-101", "Python Mastery Pro", 4500)
PRODUCT_B = ("SKU-BP-102", "React & Tailwind Course", 3500)
PRODUCT_C = ("SKU-BP-103", "Fullstack AI Bootcamp", 8000)

# 2. SET: Unique active promotional coupon codes (O(1) fast validation)
ACTIVE_PROMO_CODES = {"DIWALI2026", "PUJA500", "TECHBENGAL"}

# 3. LIST: Dynamic mutable customer shopping cart sequence
customer_cart = [
    PRODUCT_A,
    PRODUCT_B,
    PRODUCT_A  # Student accidentally added duplicate course
]

print("--- Initial Shopping Cart Contents ---")
for sku, title, price in customer_cart:
    print(f"  • [{sku}] {title:30} - ₹{price:,}")

# Deduplicating the cart courses using a set of tuples
unique_cart_items = list(dict.fromkeys(customer_cart))
print(f"\n--- Clean Cart ({len(unique_cart_items)} items) ---")
subtotal = sum(price for _, _, price in unique_cart_items)
print(f"Subtotal: ₹{subtotal:,}")

# Promo Code Verification using set 'in' operator in O(1)
entered_code = "PUJA500"
if entered_code in ACTIVE_PROMO_CODES:
    discount = 500
    final_total = subtotal - discount
    print(f"✓ Promo Applied ({entered_code}): -₹{discount}")
    print(f"Final Payable Amount: ₹{final_total:,}")
