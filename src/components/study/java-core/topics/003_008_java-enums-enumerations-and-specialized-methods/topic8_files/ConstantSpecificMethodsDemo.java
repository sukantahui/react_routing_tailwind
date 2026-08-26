/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 8: Constant-Specific Method Implementations: Polymorphic Behavior in Enums
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class ConstantSpecificMethodsDemo {

    // Enum with an abstract method overridden by each constant individually:
    public enum ArithmeticOperation {
        PLUS("+") {
            @Override
            public double apply(double x, double y) { return x + y; }
        },
        MINUS("-") {
            @Override
            public double apply(double x, double y) { return x - y; }
        },
        MULTIPLY("*") {
            @Override
            public double apply(double x, double y) { return x * y; }
        },
        DIVIDE("/") {
            @Override
            public double apply(double x, double y) {
                if (y == 0) throw new ArithmeticException("Division by zero!");
                return x / y;
            }
        };

        private final String symbol;
        ArithmeticOperation(String symbol) { this.symbol = symbol; }

        public String getSymbol() { return symbol; }

        // Abstract method enforcing constant-specific polymorphic behavior:
        public abstract double apply(double x, double y);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 8: CONSTANT-SPECIFIC METHODS - BARRACKPORE");
        System.out.println("==========================================================================\n");

        double a = 50.0;
        double b = 10.0;

        System.out.println(">>> Executing Constant-Specific Polymorphic Arithmetic:");
        for (ArithmeticOperation op : ArithmeticOperation.values()) {
            double result = op.apply(a, b);
            System.out.printf("  %.1f %s %.1f = %.1f%n", a, op.getSymbol(), b, result);
        }

        System.out.println("\n==========================================================================");
    }
}