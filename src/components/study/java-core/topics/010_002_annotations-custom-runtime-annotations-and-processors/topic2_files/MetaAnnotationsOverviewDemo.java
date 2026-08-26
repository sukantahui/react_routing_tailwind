/**
 * Java Core Tutorial - Module 010_002: Java Annotations & Custom Processors
 * Topic 2: Meta-Annotations Overview (Annotations That Annotate Annotations)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.annotations;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class MetaAnnotationsOverviewDemo {

    // Custom Annotation fully configured with Meta-Annotations:
    @Documented                            // 1. Include in Javadoc
    @Inherited                             // 2. Automatically inherited by subclasses
    @Target({ElementType.TYPE, ElementType.METHOD}) // 3. Allowed on classes, interfaces & methods
    @Retention(RetentionPolicy.RUNTIME)    // 4. Retained in memory at runtime
    public @interface AcademyService {
        String serviceCode() default "DEFAULT_SRV";
        String managedBy() default "Barrackpore Admin";
    }

    @AcademyService(serviceCode = "SRV-JAVA-101", managedBy = "Sukanta Hui")
    public static class StudentRegistrationSystem {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 2: META-ANNOTATIONS OVERVIEW - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        Class<?> clazz = StudentRegistrationSystem.class;
        AcademyService ann = clazz.getAnnotation(AcademyService.class);

        System.out.println(">>> 1. Custom Annotation Configured via Meta-Annotations:");
        System.out.println("   - Target Class : " + clazz.getSimpleName());
        System.out.println("   - Service Code : " + ann.serviceCode());
        System.out.println("   - Managed By   : " + ann.managedBy());

        System.out.println("\n>>> THE 5 STANDARD META-ANNOTATIONS (java.lang.annotation.*):");
        System.out.println("   1. @Retention  : Defines lifecycle stage (SOURCE, CLASS, RUNTIME).");
        System.out.println("   2. @Target     : Restricts applicable code locations (TYPE, METHOD, FIELD, etc.).");
        System.out.println("   3. @Documented : Includes annotation in Javadoc output.");
        System.out.println("   4. @Inherited  : Subclasses inherit parent class annotations.");
        System.out.println("   5. @Repeatable : Allows multiple annotations of same type on one element.");

        System.out.println("\n==========================================================================");
    }
}
