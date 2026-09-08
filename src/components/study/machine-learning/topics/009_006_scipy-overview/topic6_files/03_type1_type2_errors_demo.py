"""
Topic 6: Type I Error (\alpha) vs Type II Error (\beta) Matrix
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

# Confusion matrix in hypothesis testing vs machine learning:

print("=========================================================================")
print("HYPOTHESIS TESTING ERROR MATRIX")
print("=========================================================================")
print(f"{'Decision':<25} | {'H0 is Actually True':<25} | {'H0 is Actually False'}")
print("-" * 75)
print(f"{'Reject H0':<25} | {'Type I Error (\u03b1)':<25} | {'Correct Decision (Power = 1-\u03b2)'}")
print(f"{'':<25} | {'(False Positive)':<25} | {'(True Positive)'}")
print("-" * 75)
print(f"{'Fail to Reject H0':<25} | {'Correct Decision (1-\u03b1)':<25} | {'Type II Error (\u03b2)'}")
print(f"{'':<25} | {'(True Negative)':<25} | {'(False Negative)'}")
print("=========================================================================")
