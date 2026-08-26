/**
 * Java Core Tutorial - Module 009_001: Lambda Expressions & Lexical Scoping
 * Topic 5: The @FunctionalInterface Annotation: Compiler Validation & Defensive Design
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

// 1. DEFENSIVE COMPILER CHECK VIA @FunctionalInterface:
@FunctionalInterface
public interface StudentDiscountPolicy {

    double calculateDiscount(double courseFee, int academicScore);

    // If another developer accidentally adds a second abstract method below:
    // void executeRefund(); // COMPILE ERROR: Unexpected '@FunctionalInterface' annotation: Multiple non-overriding abstract methods found!
}