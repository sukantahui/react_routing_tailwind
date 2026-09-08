"""
Topic 6: Significance Threshold (\alpha) and p-Value Decisions
Module: 009_006_scipy-overview
Coder & AccoTax • Barrackpore
"""

def interpret_p_value(p_val, alpha=0.05):
    """
    Standard statistical decision engine.
    p-value represents the probability of observing sample data at least as extreme
    as what was recorded, assuming H0 is true.
    """
    print(f"Observed p-value: {p_val:.5f} (Significance Level \u03b1 = {alpha})")
    if p_val < 0.001:
        return "Strong evidence against H0 (p < 0.001) - Highly Statistically Significant"
    elif p_val < alpha:
        return f"Evidence against H0 (p < {alpha}) - Statistically Significant"
    elif p_val < 0.10:
        return "Marginal / weak evidence against H0 (trend observed, but inconclusive)"
    else:
        return "Insufficient evidence against H0 (fail to reject null)"

print(interpret_p_value(0.0032, 0.05))
print(interpret_p_value(0.2410, 0.05))
