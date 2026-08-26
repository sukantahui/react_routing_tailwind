/**
 * Java Core Tutorial - Module 009_009: Modern Java Features
 * Topic 13: Sequenced Collections (Java 21+ Standard - JEP 431) - Modern Java Capstone
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.modern;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.SequencedCollection;
import java.util.SequencedMap;
import java.util.SequencedSet;

public class SequencedCollectionsCapstoneDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 13: SEQUENCED COLLECTIONS (JAVA 21) - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. SequencedCollection on List (getFirst(), getLast(), addFirst(), addLast(), reversed())
        SequencedCollection<String> studentList = new ArrayList<>(List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das"));
        studentList.addFirst("Anish Dey (Head)");
        studentList.addLast("Priya Sharma (Tail)");

        System.out.println("1. SequencedCollection (List):");
        System.out.println("   - Full List     : " + studentList);
        System.out.println("   - getFirst()    : " + studentList.getFirst());
        System.out.println("   - getLast()     : " + studentList.getLast());
        System.out.println("   - reversed()    : " + studentList.reversed());

        // 2. SequencedSet on LinkedHashSet
        SequencedSet<String> centerSet = new LinkedHashSet<>(List.of("Barrackpore", "Naihati", "Shyamnagar"));
        System.out.println("\n2. SequencedSet (LinkedHashSet):");
        System.out.println("   - First Center  : " + centerSet.getFirst());
        System.out.println("   - Last Center   : " + centerSet.getLast());
        System.out.println("   - Reversed View : " + centerSet.reversed());

        // 3. SequencedMap on LinkedHashMap (firstEntry(), lastEntry(), reversed())
        SequencedMap<Integer, String> studentMap = new LinkedHashMap<>();
        studentMap.put(101, "Swadeep");
        studentMap.put(102, "Tuhina");
        studentMap.put(103, "Abhronila");

        System.out.println("\n3. SequencedMap (LinkedHashMap):");
        System.out.println("   - firstEntry()  : " + studentMap.firstEntry());
        System.out.println("   - lastEntry()   : " + studentMap.lastEntry());
        System.out.println("   - reversed()    : " + studentMap.reversed());

        System.out.println("\n==========================================================================");
        System.out.println(" SEGMENT 9 FULLY COMPLETE: FUNCTIONAL & MODERN JAVA (8 -> 21) MASTERED!");
        System.out.println("==========================================================================");
    }
}
