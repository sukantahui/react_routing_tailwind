/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 1: The Big 4 Core Interfaces: Predicate, Function, Consumer & Supplier
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.function.Consumer;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.Supplier;

public class BigFourCoreInterfacesOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE BIG 4 CORE FUNCTIONAL INTERFACES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Predicate<T>: boolean test(T t) -> Tests a condition
        Predicate<Double> isEligibleForGst = turnover -> turnover > 2000000.0; // > ₹20 Lakhs threshold

        // 2. Function<T, R>: R apply(T t) -> Transforms T into R
        Function<Double, String> currencyFormatter = amount -> String.format("₹%,.2f", amount);

        // 3. Consumer<T>: void accept(T t) -> Consumes data with side effects
        Consumer<String> reportPrinter = message -> System.out.println("  [Audit Print] " + message);

        // 4. Supplier<T>: T get() -> Supplies / generates a value
        Supplier<String> currentAcademicHub = () -> "Barrackpore Central IT Hub";

        // Executing the Big 4:
        double businessTurnover = 3500000.0;
        if (isEligibleForGst.test(businessTurnover)) {
            String formattedTurnover = currencyFormatter.apply(businessTurnover);
            reportPrinter.accept("GST Registration Mandatory for turnover: " + formattedTurnover);
        }
        System.out.println("  Registered at: " + currentAcademicHub.get());

        System.out.println("\n==========================================================================");
    }
}