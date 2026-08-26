/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 10: Valid Data Types for Annotation Elements
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.util.Arrays;

public class ValidAnnotationElementTypesDemo {

    public enum AcademyTier { FOUNDATION, INTERMEDIATE, PRO }

    // Nested Annotation Type
    public @interface CenterLocation {
        String city();
        String pin();
    }

    // Custom Annotation showcasing ALL 6 LEGAL DATA TYPES:
    @Retention(RetentionPolicy.RUNTIME)
    public @interface ComprehensiveCourseConfig {
        // 1. Primitive types (byte, short, int, long, float, double, boolean, char)
        int courseId();
        double baseFee();
        boolean isActive() default true;

        // 2. String
        String courseTitle();

        // 3. Class (Type descriptor)
        Class<?> handlerClass() default Object.class;

        // 4. Enum
        AcademyTier tier() default AcademyTier.PRO;

        // 5. Another Annotation (Nested)
        CenterLocation primaryCenter();

        // 6. 1-Dimensional Arrays of any of the above
        String[] prerequisites() default {};
        CenterLocation[] branchOffices() default {};
    }

    @ComprehensiveCourseConfig(
        courseId = 101,
        baseFee = 4500.0,
        courseTitle = "Full Stack Java Core to Pro",
        tier = AcademyTier.PRO,
        primaryCenter = @CenterLocation(city = "Barrackpore", pin = "700120"),
        prerequisites = {"Basic C Programming", "Core OOP Concepts"}
    )
    public static class FullStackCourse {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: VALID ANNOTATION DATA TYPES - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        ComprehensiveCourseConfig config = FullStackCourse.class.getAnnotation(ComprehensiveCourseConfig.class);

        System.out.println(">>> 1. Reading Nested Annotation & Array Attributes:");
        System.out.println("   - Course Title  : " + config.courseTitle());
        System.out.println("   - Base Fee      : ₹" + config.baseFee());
        System.out.println("   - Tier (Enum)   : " + config.tier());
        System.out.println("   - Primary City  : " + config.primaryCenter().city() + " (PIN: " + config.primaryCenter().pin() + ")");
        System.out.println("   - Prerequisites : " + Arrays.toString(config.prerequisites()));

        System.out.println("\n>>> WHAT TYPES ARE ILLEGAL IN ANNOTATIONS:");
        System.out.println("  ❌ Arbitrary custom classes (e.g. StudentProfile).");
        System.out.println("  ❌ Collections (List<String>, Map<String, Object>).");
        System.out.println("  ❌ Multi-dimensional arrays (String[][]).");
        System.out.println("==========================================================================");
    }
}
