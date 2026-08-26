/**
 * Java Core Tutorial - Module 009_003: Method & Constructor References
 * Topic 5: Kind 3: Unbound Instance Method Reference (ClassName::instanceMethodName)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.functional;

import java.util.List;
import java.util.function.Function;

class StudentProfile {
    private final String fullName;
    private final int marks;

    public StudentProfile(String fullName, int marks) {
        this.fullName = fullName;
        this.marks = marks;
    }

    public String getFullName() {
        return fullName;
    }

    public int getMarks() {
        return marks;
    }
}

public class UnboundInstanceMethodReferenceDemo {

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 5: UNBOUND INSTANCE METHOD REFERENCE (ClassName::method) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        List<StudentProfile> students = List.of(
                new StudentProfile("swadeep paul", 88),
                new StudentProfile("tuhina das", 95),
                new StudentProfile("abhronila das", 79)
        );

        // 1. Unbound Method Reference on Custom Class (StudentProfile::getFullName):
        // Lambda: (StudentProfile s) -> s.getFullName()
        // The first argument passed to the SAM BECOMES THE CALLER OBJECT!
        Function<StudentProfile, String> nameExtractor = StudentProfile::getFullName;

        List<String> names = students.stream()
                .map(nameExtractor)
                // 2. Unbound Method Reference on JDK Class (String::toUpperCase):
                // Lambda: (String s) -> s.toUpperCase()
                .map(String::toUpperCase)
                .toList();

        System.out.println(">>> Transformed Upper Case Names: " + names);

        System.out.println("\n>>> HOW UNBOUND REFERENCES WORK:");
        System.out.println("  - Syntax looks like a static reference ('ClassName::method'), but the method is an INSTANCE method!");
        System.out.println("  - The first parameter passed into the lambda BECOMES the target receiver: '(obj) -> obj.method()'.");

        System.out.println("\n==========================================================================");
    }
}