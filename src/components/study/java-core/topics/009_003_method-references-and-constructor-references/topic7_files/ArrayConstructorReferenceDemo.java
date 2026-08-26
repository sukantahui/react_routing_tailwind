/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 7: Array Constructor References: String[]::new & Stream.toArray()
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.Arrays;
import java.util.List;
import java.util.function.IntFunction;

public class ArrayConstructorReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: ARRAY CONSTRUCTOR REFERENCES (Type[]::new) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        // 1. Array Constructor functional handle: IntFunction<T[]>
        // Lambda equivalent: size -> new String[size]
        IntFunction<String[]> stringArrayFactory = String[]::new;

        String[] emptyArray = stringArrayFactory.apply(5);
        System.out.println(">>> 1. Created empty String array of length: " + emptyArray.length);

        // 2. THE PRODUCTION USE CASE: Stream.toArray(Type[]::new):
        List<String> studentList = List.of("Swadeep Paul", "Tuhina Das", "Abhronila Das", "Debangshu Mukherjee");

        // Without Array Constructor Reference, stream.toArray() returns Object[]:
        Object[] legacyObjectArray = studentList.stream().toArray();

        // WITH Array Constructor Reference, stream.toArray(String[]::new) returns TYPE-SAFE String[]:
        String[] typedStudentArray = studentList.stream()
                .filter(name -> name.startsWith("S") || name.startsWith("T"))
                .toArray(String[]::new); // Type-safe array allocation!

        System.out.println("\n>>> 2. Converted Stream to Type-Safe String[] array:");
        System.out.println("  Array Contents : " + Arrays.toString(typedStudentArray));
        System.out.println("  Array Component: " + typedStudentArray.getClass().getComponentType().getSimpleName());

        System.out.println("\n==========================================================================");
    }
}