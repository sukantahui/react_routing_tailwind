/**
 * Java Core Tutorial - Module 009_008: The Optional Class & Null-Safe Functional Programming
 * Topic 10: ifPresent() & ifPresentOrElse() (Java 9+) - Clean Side-Effect Execution
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.optional;

import java.util.Optional;

public class IfPresentOrElseDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: IFPRESENT & IFPRESENTORELSE (JAVA 9+) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        Optional<String> activeStudent = Optional.of("Swadeep Paul (Barrackpore Center)");
        Optional<String> missingStudent = Optional.empty();

        // 1. ifPresent(Consumer): Executes action only if value exists
        System.out.print("1. ifPresent on active student: ");
        activeStudent.ifPresent(name -> System.out.println("Notification sent to: " + name));

        System.out.print("   ifPresent on missing student: ");
        missingStudent.ifPresent(name -> System.out.println("Notification sent to: " + name));
        System.out.println("(Zero side-effects, nothing executed!)");

        // 2. ifPresentOrElse(Consumer, Runnable) [Java 9]: Both branches covered functionally!
        System.out.println("\n2. Java 9 ifPresentOrElse() on active student:");
        activeStudent.ifPresentOrElse(
            name -> System.out.println("   [SUCCESS]: Welcome back, " + name + "!"),
            () -> System.out.println("   [WARNING]: Guest access - Please register at Barrackpore!")
        );

        System.out.println("\n3. Java 9 ifPresentOrElse() on missing student:");
        missingStudent.ifPresentOrElse(
            name -> System.out.println("   [SUCCESS]: Welcome back, " + name + "!"),
            () -> System.out.println("   [WARNING]: Guest access - Please register at Barrackpore Academy!")
        );

        System.out.println("\n==========================================================================");
    }
}
