/**
 * File: ParenthesesEvaluationControlDemo.java
 * Module: 001_003_operators-expressions-and-type-casting (Topic 17)
 * Description: Demonstrates using parentheses for controlling Java expression evaluation order,
 *              overriding default operator precedence, eliminating logic ambiguities,
 *              compound interest calculations, quadratic roots, and student financial auditing in Indian Rupees (₹).
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.operators;

public class ParenthesesEvaluationControlDemo {

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 17 PARENTHESES FOR EVALUATION CONTROL");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        // 1. Overriding Arithmetic Precedence
        System.out.println("--- 1. OVERRIDING ARITHMETIC PRECEDENCE ---");
        int a = 10, b = 5, c = 2;

        int defaultPrecedence = a + b * c;   // 10 + (5 * 2) = 10 + 10 = 20
        int forcedPrecedence  = (a + b) * c; // (10 + 5) * 2 = 15 * 2 = 30

        System.out.printf("Without Parentheses '10 + 5 * 2'   : %d%n", defaultPrecedence);
        System.out.printf("With Parentheses    '(10 + 5) * 2' : %d%n%n", forcedPrecedence);

        // 2. Overriding String Concatenation Left-to-Right Grouping
        System.out.println("--- 2. STRING CONCATENATION ORDER CONTROL ---");
        int fee1 = 15000;
        int fee2 = 5000;

        String unparenthesized = "Total Fee: ₹" + fee1 + fee2;     // "Total Fee: ₹150005000" (BUG!)
        String parenthesized   = "Total Fee: ₹" + (fee1 + fee2);   // "Total Fee: ₹20000" (CORRECT!)

        System.out.printf("Without Parentheses: %s [⚠️ STRING CONCAT BUG!]%n", unparenthesized);
        System.out.printf("With Parentheses   : %s [✓ CORRECT ARITHMETIC SUM]%n%n", parenthesized);

        // 3. Complex Financial Formula: Compound Interest in Indian Rupees (₹)
        System.out.println("--- 3. FINANCIAL CALCULATION: COMPOUND INTEREST ---");
        double principal = 100000.0; // ₹1,00,000 principal deposit
        double annualRate = 0.08;    // 8% per annum
        int compoundingFreq = 4;     // Quarterly compounding (4 times a year)
        double years = 3.0;          // 3 years

        // Formula: A = P * (1 + r/n)^(n*t)
        // Parentheses are crucial for (1 + annualRate / compoundingFreq) and (compoundingFreq * years):
        double maturityAmount = principal * Math.pow((1 + annualRate / compoundingFreq), (compoundingFreq * years));
        double interestEarned = maturityAmount - principal;

        System.out.printf("Principal Deposit    : ₹%,.2f%n", principal);
        System.out.printf("Maturity Amount (3Y) : ₹%,.2f%n", maturityAmount);
        System.out.printf("Total Interest Earned: ₹%,.2f%n%n", interestEarned);

        // 4. Mathematical Formula: Quadratic Equation Roots
        System.out.println("--- 4. MATHEMATICAL FORMULA: QUADRATIC EQUATION ROOTS ---");
        // Equation: 2x^2 - 8x + 6 = 0  (Roots should be 3.0 and 1.0)
        double qa = 2.0, qb = -8.0, qc = 6.0;
        double discriminant = (qb * qb) - (4 * qa * qc);

        // Roots: (-b ± sqrt(d)) / (2 * a)
        double root1 = (-qb + Math.sqrt(discriminant)) / (2 * qa);
        double root2 = (-qb - Math.sqrt(discriminant)) / (2 * qa);

        System.out.printf("Quadratic 2x^2 - 8x + 6 = 0 -> Discriminant: %.2f%n", discriminant);
        System.out.printf("Root 1: %.2f | Root 2: %.2f%n%n", root1, root2);

        // 5. Business Logic Clarity: Student Enrollment Filters (Barrackpore Center)
        System.out.println("--- 5. BARRACKPORE STUDENT ADMISSION FILTER CLARITY ---");
        auditEnrollmentFilter("Swadeep", true, true, 88, true);
        auditEnrollmentFilter("Tuhina", false, false, 95, false);

        System.out.println("\n================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Parentheses '()' possess the highest precedence tier in Java.");
        System.out.println("2. Use parentheses to explicitly dictate mathematical and boolean execution order.");
        System.out.println("3. Prevent the infamous String concat trap: 'Total: ' + (a + b).");
        System.out.println("4. Clean code uses parentheses to make complex formulas human-readable and maintainable.");
        System.out.println("================================================================================");
    }

    private static void auditEnrollmentFilter(String name, boolean hasPaidFee, boolean hasValidID, int score, boolean isBarrackporeResident) {
        // Clear grouping of compound boolean clauses:
        boolean isQualified = (hasPaidFee && hasValidID) && (score >= 80 || isBarrackporeResident);

        System.out.printf("Student: %-10s | Paid: %-5b | ValidID: %-5b | Score: %2d%% | Resident: %-5b | Admitted: %-5b%n",
                name, hasPaidFee, hasValidID, score, isBarrackporeResident, isQualified);
    }
}
