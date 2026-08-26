/**
 * Java Core Tutorial - Module 009_002: Built-in Functional Interfaces
 * Topic 4: java.util.function.Consumer<T>: void accept(T t) Side-Effect Processing
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Consumer;

public class ConsumerSideEffectsDeepDiveDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: Consumer<T> SIDE-EFFECT PROCESSING - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<String> enrolledCourses = List.of(
                "GST Practitioner Executive",
                "Advanced Income Tax & TDS",
                "Full-Stack Java Enterprise Mastery"
        );

        // 1. Single Consumer: Console Printing
        Consumer<String> consolePrinter = course -> System.out.println("  [Course Notification] Registered: " + course);

        // 2. Chained Consumer via andThen():
        Consumer<String> auditLogger = course -> System.out.println("    -> Audit log written to disk for: " + course);

        Consumer<String> compositePipeline = consolePrinter.andThen(auditLogger);

        System.out.println(">>> Executing Composite Consumer Pipeline across list:");
        enrolledCourses.forEach(compositePipeline); // forEach accepts Consumer<T>!

        System.out.println("\n==========================================================================");
    }
}