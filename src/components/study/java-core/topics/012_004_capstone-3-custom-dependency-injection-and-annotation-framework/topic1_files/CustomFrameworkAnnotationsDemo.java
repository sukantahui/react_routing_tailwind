/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 1: Custom Annotations - @Component, @Autowired & @Transactional
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

public class CustomFrameworkAnnotationsDemo {

    // 1. Core Component Marker:
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    public @interface Component {
        String value() default "";
    }

    // 2. Service Stereotype:
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.TYPE)
    public @interface Service {}

    // 3. Autowire Dependency Injection Marker:
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD, ElementType.CONSTRUCTOR})
    public @interface Autowired {}

    // 4. Declarative Transaction Boundary:
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.METHOD)
    public @interface Transactional {}

    // 5. Config Value Injection:
    @Retention(RetentionPolicy.RUNTIME)
    @Target(ElementType.FIELD)
    public @interface Value {
        String value();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: CUSTOM FRAMEWORK ANNOTATIONS - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        System.out.println("Successfully declared Custom Framework Annotations:");
        System.out.println("  - @Component     : Targets TYPE with RUNTIME retention.");
        System.out.println("  - @Service       : Stereotype for business services.");
        System.out.println("  - @Autowired     : Targets FIELD and CONSTRUCTOR for DI.");
        System.out.println("  - @Transactional : Targets METHOD for dynamic proxy interceptors.");
        System.out.println("  - @Value         : Injects external property strings.");

        System.out.println("\n==========================================================================");
    }
}
