/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 6: @Inherited Meta-Annotation - Subclass Annotation Inheritance
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

public class InheritedMetaAnnotationDemo {

    // 1. INHERITED Annotation: Subclasses will automatically possess this annotation!
    @Inherited
    @Retention(RetentionPolicy.RUNTIME)
    public @interface AcademySecured { String securityLevel() default "ADMIN"; }

    // 2. NON-INHERITED Annotation: Subclasses will NOT inherit this!
    @Retention(RetentionPolicy.RUNTIME)
    public @interface TransientLabel { String label(); }

    // Parent Base Class
    @AcademySecured(securityLevel = "FACULTY_HIGH")
    @TransientLabel(label = "BASE_TEMPLATE")
    public static class BaseAcademyController {}

    // Child Subclass (Declares NO annotations directly):
    public static class StudentManagementController extends BaseAcademyController {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: @INHERITED META-ANNOTATION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Class<?> childClass = StudentManagementController.class;

        System.out.println(">>> TESTING ANNOTATION INHERITANCE ON SUBCLASS (StudentManagementController):");
        System.out.println("  - @AcademySecured present? : " + childClass.isAnnotationPresent(AcademySecured.class) + " (TRUE! Inherited from BaseAcademyController)");
        System.out.println("  - @TransientLabel present? : " + childClass.isAnnotationPresent(TransientLabel.class) + " (FALSE - Not marked @Inherited)");

        if (childClass.isAnnotationPresent(AcademySecured.class)) {
            AcademySecured sec = childClass.getAnnotation(AcademySecured.class);
            System.out.println("  --> Inherited Security Level: " + sec.securityLevel());
        }

        System.out.println("\n>>> CRUCIAL @INHERITED RULE:");
        System.out.println("  - @Inherited ONLY affects class-to-class inheritance (extends BaseClass).");
        System.out.println("  - It has ZERO effect on interfaces (implementing an annotated interface does NOT inherit annotations!).");
        System.out.println("==========================================================================");
    }
}
