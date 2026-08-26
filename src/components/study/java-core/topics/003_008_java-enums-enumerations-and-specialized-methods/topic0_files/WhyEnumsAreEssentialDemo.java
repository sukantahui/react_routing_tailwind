/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 0: Why Enums Are Needed: Eliminating Brittle Integer Constants Anti-Pattern
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class WhyEnumsAreEssentialDemo {

    // ANTI-PATTERN: The "int Enum Pattern" (Pre-Java 5 Flawed Approach):
    public static final int COURSE_JAVA_CORE = 1;
    public static final int COURSE_SPRING_BOOT = 2;
    public static final int COURSE_ACCOTAX_GST = 3;

    // Type-safe enum replacement:
    public enum CourseType {
        JAVA_CORE,
        SPRING_BOOT,
        ACCOTAX_GST
    }

    public static void enrollWithLegacyInt(int courseCode) {
        System.out.println("  [LEGACY] Enrolled in course code: " + courseCode);
    }

    public static void enrollWithTypeSafeEnum(CourseType course) {
        System.out.println("  [TYPE-SAFE ENUM] Enrolled in course: " + course);
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHY ENUMS ARE ESSENTIAL IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. The Danger of the Legacy 'int Enum Pattern':");
        enrollWithLegacyInt(COURSE_JAVA_CORE); // Valid
        enrollWithLegacyInt(999999); // SILENT BUG: 999999 is not a valid course, but compiler allows it!

        System.out.println("\n>>> 2. The Type-Safety of Modern Java Enums:");
        enrollWithTypeSafeEnum(CourseType.JAVA_CORE); // Valid & Safe
        // enrollWithTypeSafeEnum(999999); // COMPILE ERROR! Cannot pass invalid integers!

        System.out.println("\n>>> WHY ENUMS WIN:");
        System.out.println("  1. Compile-Time Type Safety: Impossible to pass invalid values.");
        System.out.println("  2. Informative String Representation: Prints 'JAVA_CORE' instead of cryptic '1'.");
        System.out.println("  3. Immutable and Thread-Safe by design.");

        System.out.println("\n==========================================================================");
    }
}