/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 0: Overview of java.util.function: The 43 Built-In Interfaces Landscape
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

public class FunctionPackageOverviewDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: java.util.function PACKAGE LANDSCAPE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> THE 43 BUILT-IN FUNCTIONAL INTERFACES IN JAVA 8+:");
        System.out.println("  - To prevent developers from writing custom interfaces for everyday tasks,");
        System.out.println("    Java 8 introduced 43 standard functional interfaces organized into 4 CORE FAMILIES:");
        System.out.println();
        System.out.println("+----+-------------------+-----------------------+-------------------+-----------------------------------+");
        System.out.println("| #  | Core Family       | Single Abstract Method| Input -> Output   | Primary Use Case                  |");
        System.out.println("+----+-------------------+-----------------------+-------------------+-----------------------------------+");
        System.out.println("| 1. | Predicate<T>      | boolean test(T t)     | T -> boolean      | Filtering & conditional validation|");
        System.out.println("| 2. | Function<T, R>    | R apply(T t)          | T -> R            | Data mapping & transformation     |");
        System.out.println("| 3. | Consumer<T>       | void accept(T t)      | T -> void         | Executing side-effects (Print/Log)|");
        System.out.println("| 4. | Supplier<T>       | T get()               | () -> T           | Factory creation & Lazy evaluation|");
        System.out.println("+----+-------------------+-----------------------+-------------------+-----------------------------------+");
        System.out.println();
        System.out.println(">>> DERIVED SPECIALIZATIONS IN THE PACKAGE:");
        System.out.println("  - 2-Argument Bi-Variants  : BiPredicate<T,U>, BiFunction<T,U,R>, BiConsumer<T,U>");
        System.out.println("  - Operators (Same In/Out) : UnaryOperator<T>, BinaryOperator<T>");
        System.out.println("  - Primitive Specializations: IntPredicate, DoubleFunction, LongConsumer, ToIntFunction<T>");

        System.out.println("\n==========================================================================");
    }
}