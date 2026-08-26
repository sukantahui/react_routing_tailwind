/**
 * Java Core Tutorial - Module 006_004: Wildcards & The PECS Principle
 * Topic 6: The Complete Read/Write Rules with Wildcards: Summary & Matrix
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.generics;

import java.util.ArrayList;
import java.util.List;

public class WildcardReadWriteRulesSummaryDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: WILDCARD READ/WRITE RULES MATRIX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<Integer> intList = new ArrayList<>(List.of(10, 20, 30));

        // 1. UPPER BOUNDED (? extends Number) -> READ-ONLY:
        List<? extends Number> producer = intList;
        Number readValue = producer.get(0); // READ OK: returns Number
        // producer.add(40);               // WRITE FAILS: Compile Error!
        System.out.println(">>> 1. Upper Bounded (? extends Number):");
        System.out.println("  Read Value  : " + readValue);
        System.out.println("  Write Status: PROHIBITED (Compiler rejects producer.add())");

        // 2. LOWER BOUNDED (? super Integer) -> WRITE-ENABLED:
        List<? super Integer> consumer = intList;
        consumer.add(40);                   // WRITE OK: adds Integer
        Object readObj = consumer.get(0);   // READ: returns Object
        System.out.println("\n>>> 2. Lower Bounded (? super Integer):");
        System.out.println("  Write Status: PERMITTED (Added 40 successfully)");
        System.out.println("  Read Type   : " + readObj.getClass().getSimpleName() + " (read as java.lang.Object)");
        System.out.println("  Updated List: " + intList);

        System.out.println("\n>>> WILDCARD READ/WRITE DECISION MATRIX:");
        System.out.println("+----------------------+---------------------------+---------------------------+");
        System.out.println("| Wildcard Form        | Reading Elements (get())  | Writing Elements (add())  |");
        System.out.println("+----------------------+---------------------------+---------------------------+");
        System.out.println("| List<?>              | Read as Object            | Prohibited (only null)    |");
        System.out.println("| List<? extends T>    | Read as T (PRODUCER)      | Prohibited (only null)    |");
        System.out.println("| List<? super T>      | Read as Object            | Allowed for T (CONSUMER)  |");
        System.out.println("+----------------------+---------------------------+---------------------------+");

        System.out.println("\n==========================================================================");
    }
}