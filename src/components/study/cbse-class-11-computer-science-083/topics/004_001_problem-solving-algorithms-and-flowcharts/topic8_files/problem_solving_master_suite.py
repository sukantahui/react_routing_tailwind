"""
CBSE Class 11 Computer Science (Code: 083)
Unit 2: Computational Thinking and Problem Solving
Topic: Master Algorithmic & Problem Solving Suite (Topic 8 Master Suite)

This comprehensive module unifies all algorithmic techniques and flow control
structures taught across Unit 2:
1. Computational Thinking Pillars (Decomposition, Pattern Recognition, Abstraction, Algorithm)
2. Algorithm Characteristics Validation (Finiteness, Definiteness, Inputs, Outputs, Effectiveness)
3. Sequence, Decision, and Iteration Flow Patterns
4. Step-by-Step Desk Checking & Dry-Run Trace Table Generation
"""

from typing import List, Dict, Any

class ProblemSolvingMasterSuite:
    """Master suite demonstrating algorithmic problem-solving paradigms."""
    
    @staticmethod
    def calculate_compound_interest(principal: float, rate: float, time_years: float, n_compounds: int = 1) -> Dict[str, Any]:
        """Sequential Paradigm: Compound Interest Formula: A = P(1 + r/n)^(nt)"""
        rate_dec = rate / 100.0
        amount = principal * ((1.0 + (rate_dec / n_compounds)) ** (n_compounds * time_years))
        ci = amount - principal
        return {
            "paradigm": "Sequential",
            "principal": principal,
            "rate_percent": rate,
            "time_years": time_years,
            "compound_interest": round(ci, 2),
            "total_amount": round(amount, 2)
        }
        
    @staticmethod
    def classify_triangle(a: float, b: float, c: float) -> Dict[str, Any]:
        """Decision-Making Paradigm: Classify triangle by side lengths."""
        # Validity check using triangle inequality
        if (a + b <= c) or (a + c <= b) or (b + c <= a):
            return {"valid": False, "type": "Invalid Triangle (Sum of two sides must exceed third side)"}
            
        if a == b == c:
            t_type = "Equilateral Triangle"
        elif a == b or b == c or a == c:
            t_type = "Isosceles Triangle"
        else:
            t_type = "Scalene Triangle"
            
        return {"valid": True, "type": t_type, "sides": (a, b, c)}
        
    @staticmethod
    def compute_fibonacci_series(terms: int) -> Dict[str, Any]:
        """Iterative Paradigm: Generate Fibonacci sequence up to N terms."""
        if terms <= 0:
            return {"terms": terms, "series": []}
        if terms == 1:
            return {"terms": terms, "series": [0]}
            
        series = [0, 1]
        for _ in range(2, terms):
            next_term = series[-1] + series[-2]
            series.append(next_term)
            
        return {
            "paradigm": "Iterative",
            "terms": terms,
            "series": series
        }


if __name__ == "__main__":
    suite = ProblemSolvingMasterSuite()
    print("=== 1. COMPOUND INTEREST (SEQUENTIAL) ===")
    print(suite.calculate_compound_interest(10000, 10, 2, 1))
    
    print("\n=== 2. TRIANGLE CLASSIFIER (DECISION-MAKING) ===")
    print(suite.classify_triangle(5, 5, 8))
    
    print("\n=== 3. FIBONACCI GENERATOR (ITERATIVE) ===")
    print(suite.compute_fibonacci_series(8))
