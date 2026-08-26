/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 4: Kind 2: Bound Instance Method Reference (instanceRef::instanceMethodName)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Consumer;

class StudentInvoiceNotifier {
    private final String branchCode;

    public StudentInvoiceNotifier(String branchCode) {
        this.branchCode = branchCode;
    }

    public void dispatchNotification(String studentName) {
        System.out.printf("  [%s Branch] Invoice notification sent to: %s%n", branchCode, studentName);
    }
}

public class BoundInstanceMethodReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: BOUND INSTANCE METHOD REFERENCE (instanceRef::method) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Pre-existing specific object instance:
        StudentInvoiceNotifier barrackporeNotifier = new StudentInvoiceNotifier("BKP-01");

        List<String> students = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das");

        // 2. Bound Instance Method Reference:
        // Lambda: s -> barrackporeNotifier.dispatchNotification(s)
        Consumer<String> notifierConsumer = barrackporeNotifier::dispatchNotification;

        System.out.println(">>> 1. Dispatching via Bound Reference (barrackporeNotifier::dispatchNotification):");
        students.forEach(notifierConsumer);

        // 3. Classic JDK Example: System.out is a static instance of PrintStream!
        // System.out::println is a BOUND instance method reference to the 'System.out' PrintStream object!
        System.out.println("\n>>> 2. Classic JDK Bound Reference (System.out::println):");
        students.forEach(System.out::println);

        System.out.println("\n==========================================================================");
    }
}