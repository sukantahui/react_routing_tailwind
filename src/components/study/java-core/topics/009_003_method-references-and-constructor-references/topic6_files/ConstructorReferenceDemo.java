/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 6: Kind 4: Constructor References (ClassName::new)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.ArrayList;
import java.util.List;
import java.util.function.BiFunction;
import java.util.function.Function;
import java.util.function.Supplier;

class StudentInvoice {
    final String studentName;
    final double amount;

    // 1. Default No-Arg Constructor:
    public StudentInvoice() {
        this.studentName = "Anonymous Guest";
        this.amount = 0.0;
    }

    // 2. Single-Arg Constructor:
    public StudentInvoice(String studentName) {
        this.studentName = studentName;
        this.amount = 5000.0; // Default registration fee
    }

    // 3. Two-Arg Constructor:
    public StudentInvoice(String studentName, double amount) {
        this.studentName = studentName;
        this.amount = amount;
    }

    @Override
    public String toString() {
        return String.format("StudentInvoice[name='%s', fee=₹%,.2f]", studentName, amount);
    }
}

public class ConstructorReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: CONSTRUCTOR REFERENCES (ClassName::new) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. No-arg constructor binds to Supplier<T>:
        Supplier<StudentInvoice> defaultSupplier = StudentInvoice::new;
        System.out.println(">>> 1. No-arg (Supplier)    : " + defaultSupplier.get());

        // 2. Single-arg constructor binds to Function<T, R>:
        Function<String, StudentInvoice> nameConstructor = StudentInvoice::new;
        System.out.println(">>> 2. Single-arg (Function): " + nameConstructor.apply("Swadeep Paul"));

        // 3. Two-arg constructor binds to BiFunction<T, U, R>:
        BiFunction<String, Double, StudentInvoice> fullConstructor = StudentInvoice::new;
        System.out.println(">>> 3. Two-arg (BiFunction) : " + fullConstructor.apply("Tuhina Das", 18500.0));

        // 4. Collection Factory Supplier (ArrayList::new):
        Supplier<List<String>> listFactory = ArrayList::new;
        List<String> dynamicList = listFactory.get();
        dynamicList.add("Barrackpore Hub");
        System.out.println("\n>>> 4. ArrayList::new Factory : " + dynamicList);

        System.out.println("\n==========================================================================");
    }
}