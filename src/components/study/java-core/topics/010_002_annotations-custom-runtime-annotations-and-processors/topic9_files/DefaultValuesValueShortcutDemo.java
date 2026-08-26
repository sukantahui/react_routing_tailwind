/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 9: Annotation Attributes - Default Values & The value() Shortcut
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class DefaultValuesValueShortcutDemo {

    // 1. Single-Element Annotation using special 'value()' method:
    @Retention(RetentionPolicy.RUNTIME)
    public @interface SecurityRole {
        String value(); // The special shortcut method!
        String center() default "Barrackpore"; // Optional with default
    }

    // 2. Applying with the 'value' shortcut (No need to write 'value = "ADMIN"!'):
    @SecurityRole("HEAD_INSTRUCTOR")
    public static class TeacherPortal {}

    // 3. Applying with multiple attributes:
    @SecurityRole(value = "STUDENT_LEAD", center = "Naihati Lab")
    public static class StudentPortal {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: DEFAULT VALUES & VALUE() SHORTCUT - BARRACKPORE");
        System.out.println("==========================================================================\n");

        SecurityRole role1 = TeacherPortal.class.getAnnotation(SecurityRole.class);
        System.out.println("1. TeacherPortal (Used value() shortcut):");
        System.out.println("   - Role   : " + role1.value());
        System.out.println("   - Center : " + role1.center() + " (Auto-filled from default!)");

        SecurityRole role2 = StudentPortal.class.getAnnotation(SecurityRole.class);
        System.out.println("\n2. StudentPortal (Explicit attributes):");
        System.out.println("   - Role   : " + role2.value());
        System.out.println("   - Center : " + role2.center());

        System.out.println("\n==========================================================================");
    }
}
