/**
 * File: MethodNamingConventionsDemo.java
 * Module: 001_007_methods-parameters-and-recursion-foundations (Topic 2)
 * Description: Demonstrates idiomatic Java method naming conventions (lowerCamelCase verb-noun):
 *              1. Action verbs (calculateGrossFee, processPayment)
 *              2. Boolean predicates (isEligibleForScholarship, hasCompletedCourse)
 *              3. Getters/Setters (JavaBeans specification)
 *              4. Conversion & Factory methods (toFormattedCurrency, of)
 *              for student batch administration in Indian Rupees (₹) at Coder & AccoTax Barrackpore.
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 */

package com.coderaccotax.javatutorial.methods;

public class MethodNamingConventionsDemo {

    // =========================================================================
    // 1. ACTION METHODS (Verb + Noun lowerCamelCase)
    // =========================================================================
    public static double calculateGrossTuition(double monthlyFee, int durationMonths) {
        return monthlyFee * durationMonths;
    }

    public static double applyMeritScholarship(double grossFee, double discountPercent) {
        return grossFee * (1.0 - (discountPercent / 100.0));
    }

    // =========================================================================
    // 2. BOOLEAN PREDICATES (is / has / can / should prefix)
    // =========================================================================
    public static boolean isEligibleForScholarship(double entranceScore) {
        return entranceScore >= 85.0; // 85% or higher earns scholarship
    }

    public static boolean hasCompletedBatch(int attendedHours, int totalHours) {
        return attendedHours >= totalHours;
    }

    // =========================================================================
    // 3. CONVERSION & FORMATTING METHODS (to / as prefix)
    // =========================================================================
    public static String toFormattedCurrency(double amount) {
        return String.format("₹%,.2f", amount);
    }

    public static void main(String[] args) {
        System.out.println("================================================================================");
        System.out.println("CODER & ACCOTAX - JAVA CORE: TOPIC 2 METHOD NAMING CONVENTIONS");
        System.out.println("Educator: Sukanta Hui | Location: Barrackpore, West Bengal");
        System.out.println("================================================================================\n");

        System.out.println("--- DEMONSTRATING IDIOMATIC JAVA METHOD TAXONOMY ---\n");

        String studentName = "Swadeep";
        String campus = "Barrackpore";
        double monthlyRate = 4500.0;
        int durationMonths = 6;
        double entranceScore = 92.5;

        // 1. Calling Action Method:
        double gross = calculateGrossTuition(monthlyRate, durationMonths);
        System.out.printf("  [Action Verb]       calculateGrossTuition()     : %s%n", toFormattedCurrency(gross));

        // 2. Calling Boolean Predicate Method:
        boolean eligible = isEligibleForScholarship(entranceScore);
        System.out.printf("  [Boolean Predicate] isEligibleForScholarship()  : %b (Score: %.1f%%)%n", eligible, entranceScore);

        // 3. Applying scholarship if eligible:
        double finalPayable = eligible ? applyMeritScholarship(gross, 15.0) : gross;
        System.out.printf("  [Action Verb]       applyMeritScholarship()     : %s (15%% Discount applied)%n", toFormattedCurrency(finalPayable));

        // 4. Calling Completion Check:
        boolean completed = hasCompletedBatch(120, 120);
        System.out.printf("  [Boolean Predicate] hasCompletedBatch()         : %b%n%n", completed);

        System.out.println("================================================================================");
        System.out.println("KEY TAKEAWAYS FOR STUDENTS (Swadeep, Tuhina, Abhronila, Debangshu):");
        System.out.println("1. Method names MUST start with a lowercase letter in camelCase (verb + noun).");
        System.out.println("2. Boolean methods use 'is', 'has', 'can', 'should' prefixes (isEligible, hasPaid).");
        System.out.println("3. Conversion methods use 'to' or 'as' prefixes (toFormattedCurrency, toArray).");
        System.out.println("4. Avoid uppercase initial (looks like constructor) and snake_case (Python style).");
        System.out.println("================================================================================");
    }
}
