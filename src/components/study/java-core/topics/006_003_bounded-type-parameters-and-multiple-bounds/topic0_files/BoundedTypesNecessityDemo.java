/**
 * Java Core Tutorial - Module 006_003: Bounded Type Parameters & Multiple Bounds
 * Topic 0: Why Bounded Types are Necessary: Restricting Generic Type Hierarchies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

// 1. UNBOUNDED CONTAINER: Allows ANY object (Strings, Threads, DB connections):
class UnboundedHolder<T> {
    private final T item;
    public UnboundedHolder(T item) { this.item = item; }
    // Problem: Inside the class, 'item' only has access to java.lang.Object methods (toString, hashCode, equals)!
}

// 2. BOUNDED CONTAINER: Restricts T to numeric types only!
class NumericAccountHolder<T extends Number> {
    private final T balance;
    public NumericAccountHolder(T balance) { this.balance = balance; }

    // Benefit: Direct access to Number methods without casting!
    public double getAsDouble() {
        return balance.doubleValue();
    }
}

public class BoundedTypesNecessityDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY BOUNDED TYPES ARE NECESSARY - BARRACKPORE");
        System.out.println("==========================================================================\n");

        NumericAccountHolder<Integer> intAcc = new NumericAccountHolder<>(5000);
        NumericAccountHolder<Double> dblAcc = new NumericAccountHolder<>(12450.75);
        NumericAccountHolder<Long> longAcc = new NumericAccountHolder<>(1000000L);

        System.out.println(">>> 1. Bounded Numeric Account Balances:");
        System.out.printf("  Integer Account : ₹%.2f%n", intAcc.getAsDouble());
        System.out.printf("  Double Account  : ₹%.2f%n", dblAcc.getAsDouble());
        System.out.printf("  Long Account    : ₹%.2f%n", longAcc.getAsDouble());

        System.out.println("\n>>> WHY BOUNDED TYPE PARAMETERS ARE ESSENTIAL:");
        System.out.println("  1. Restrict Permissible Types: Prevents invalid types (e.g. new NumericAccountHolder<String>("hello")).");
        System.out.println("  2. Direct Method Access: Grants access to methods defined on the bound (e.g. doubleValue(), compareTo()).");
        System.out.println("  3. Compile-Time Enforcement: Catches type violations at compile time rather than crashing at runtime.");

        System.out.println("\n==========================================================================");
    }
}