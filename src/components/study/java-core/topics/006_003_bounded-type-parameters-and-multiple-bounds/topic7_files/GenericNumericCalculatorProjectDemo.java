/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 7: Building a Type-Safe Generic Numeric Calculator (Byte, Short, Int, Long, Float, Double)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

public class GenericNumericCalculatorProjectDemo {

    // Type-Safe Numeric Calculator Operating on ANY Java Number:
    public static class NumericCalculator<T extends Number> {
        private final T first;
        private final T second;

        public NumericCalculator(T a, T b) {
            this.first = a;
            this.second = b;
        }

        public double add() { return first.doubleValue() + second.doubleValue(); }
        public double subtract() { return first.doubleValue() - second.doubleValue(); }
        public double multiply() { return first.doubleValue() * second.doubleValue(); }
        public double divide() {
            if (second.doubleValue() == 0.0) throw new ArithmeticException("Division by zero!");
            return first.doubleValue() / second.doubleValue();
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: GENERIC NUMERIC CALCULATOR - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Calculating on Integers:
        NumericCalculator<Integer> intCalc = new NumericCalculator<>(150, 25);
        System.out.println(">>> 1. Integer Arithmetic (150 & 25):");
        System.out.printf("  Add: %.1f | Subtract: %.1f | Multiply: %.1f | Divide: %.1f%n",
                intCalc.add(), intCalc.subtract(), intCalc.multiply(), intCalc.divide());

        // 2. Calculating on Floating-Point Doubles:
        NumericCalculator<Double> dblCalc = new NumericCalculator<>(9850.50, 18.5);
        System.out.println("\n>>> 2. Double Floating-Point Arithmetic (₹9850.50 & 18.5% GST):");
        System.out.printf("  Total with GST: ₹%.2f%n", dblCalc.add());
        System.out.printf("  GST Product   : ₹%.2f%n", (dblCalc.multiply() / 100.0));

        // 3. Calculating on Long Primitives:
        NumericCalculator<Long> longCalc = new NumericCalculator<>(50000000L, 1000000L);
        System.out.println("\n>>> 3. Long Enterprise Batch Operations:");
        System.out.printf("  Divide Ratio: %.2f%n", longCalc.divide());

        System.out.println("\n==========================================================================");
    }
}