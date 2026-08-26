/**
 * Java Core Tutorial - Module 012_004: Custom DI Framework
 * Topic 4: Circular Dependency Detection - Graph Cycle Algorithms
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.minispring;

import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

public class CircularDependencyDetectionDemo {

    public static class CircularDependencyException extends RuntimeException {
        public CircularDependencyException(String message) { super(message); }
    }

    public static class DependencyResolver {
        private final Set<Class<?>> currentlyInCreation = Collections.synchronizedSet(new HashSet<>());

        public void resolveBean(Class<?> clazz) {
            System.out.println("   [RESOLVER]: Attempting to initialize: " + clazz.getSimpleName());

            if (!currentlyInCreation.add(clazz)) {
                // Already in set -> Cycle detected!
                throw new CircularDependencyException("FATAL: Circular dependency detected involving: " + clazz.getName() + "!");
            }

            try {
                // Simulate recursive dependency resolution:
                if (clazz == ServiceA.class) {
                    resolveBean(ServiceB.class); // A depends on B
                } else if (clazz == ServiceB.class) {
                    resolveBean(ServiceA.class); // B depends on A -> CYCLE!
                }
            } finally {
                currentlyInCreation.remove(clazz);
            }
        }
    }

    public static class ServiceA {}
    public static class ServiceB {}

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 4: CIRCULAR DEPENDENCY DETECTION - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        DependencyResolver resolver = new DependencyResolver();

        try {
            resolver.resolveBean(ServiceA.class);
        } catch (CircularDependencyException ex) {
            System.err.println("Caught Expected Framework Error:
  " + ex.getMessage());
        }

        System.out.println("\n==========================================================================");
    }
}
