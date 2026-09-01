/**
 * ============================================================================
 * Project 7: Simple Interest & Compound Loan EMI Estimator
 * Module: 001_001 - Getting Started with C & Compiler Architecture
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

/* Simple power helper for compound interest */
double customPow(double base, int exp) {
    double res = 1.0;
    for (int i = 0; i < exp; i++) res *= base;
    return res;
}

int main(void) {
    printf("===================================================================\n");
    printf("     FINANCIAL LOAN & INTEREST ESTIMATOR - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    double principal = 500000.00; // 5 Lakhs INR
    double annualRate = 8.5;       // 8.5%
    int timeYears = 5;

    /* 1. Simple Interest */
    double simpleInterest = (principal * annualRate * timeYears) / 100.0;
    double simpleTotalMaturity = principal + simpleInterest;

    /* 2. Annually Compounded Interest: A = P * (1 + r/100)^t */
    double compoundFactor = customPow(1.0 + (annualRate / 100.0), timeYears);
    double compoundMaturity = principal * compoundFactor;
    double compoundInterest = compoundMaturity - principal;

    printf("LOAN PARAMETERS:\n");
    printf("  • Principal Amount (P)   : INR %12.2f\n", principal);
    printf("  • Annual Interest Rate   : %12.2f %%\n", annualRate);
    printf("  • Tenure Duration (t)    : %12d Years\n\n", timeYears);

    printf("--- [1] SIMPLE INTEREST MATURITY ---\n");
    printf("  • Total Interest Accrued : INR %12.2f\n", simpleInterest);
    printf("  • Final Maturity Payout  : INR %12.2f\n\n", simpleTotalMaturity);

    printf("--- [2] COMPOUND INTEREST MATURITY (Annual) ---\n");
    printf("  • Total Interest Accrued : INR %12.2f\n", compoundInterest);
    printf("  • Final Maturity Payout  : INR %12.2f\n", compoundMaturity);
    printf("  • Compound Interest Bonus: INR %12.2f\n", compoundInterest - simpleInterest);

    printf("===================================================================\n");
    return 0;
}
