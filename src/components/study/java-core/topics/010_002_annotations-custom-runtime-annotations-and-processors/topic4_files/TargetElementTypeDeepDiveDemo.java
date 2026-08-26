/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 4: @Target Deep Dive - ElementType Placement Constraints
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.util.List;

public class TargetElementTypeDeepDiveDemo {

    // 1. Field Only Target:
    @Target(ElementType.FIELD)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface FieldOnly { String column(); }

    // 2. Method & Parameter Target:
    @Target({ElementType.METHOD, ElementType.PARAMETER})
    @Retention(RetentionPolicy.RUNTIME)
    public @interface Audited { String action(); }

    // 3. Java 8 TYPE_USE Target: Can be placed on any type usage (generics, casts)!
    @Target(ElementType.TYPE_USE)
    @Retention(RetentionPolicy.RUNTIME)
    public @interface NonNullField {}

    // Demonstrating targeted placements:
    public static class StudentEnrollment {
        @FieldOnly(column = "student_name")
        private String name;

        // TYPE_USE on generic type argument:
        private List<@NonNullField String> subjects;

        @Audited(action = "ENROLL_STUDENT")
        public void enroll(@Audited(action = "STUDENT_ID_PARAM") int id) {
            System.out.println("Enrolling student ID: " + id + " at Barrackpore Academy...");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: @TARGET DEEP DIVE - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        StudentEnrollment enrollment = new StudentEnrollment();
        enrollment.enroll(101);

        System.out.println("\n>>> ELEMENTTYPE TARGETS (java.lang.annotation.ElementType):");
        System.out.println("   - TYPE           : Classes, Interfaces, Enums, Records");
        System.out.println("   - FIELD          : Instance & Static fields");
        System.out.println("   - METHOD         : Method declarations");
        System.out.println("   - PARAMETER      : Method parameter variables");
        System.out.println("   - CONSTRUCTOR    : Constructor declarations");
        System.out.println("   - LOCAL_VARIABLE : Local variables inside method bodies");
        System.out.println("   - ANNOTATION_TYPE: Meta-annotations only");
        System.out.println("   - TYPE_USE       : Anywhere a type is referenced (Java 8+)");

        System.out.println("\n==========================================================================");
    }
}
