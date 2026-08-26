/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 1: The 4 Types of Nested Classes Taxonomy: Member, Static Nested, Local & Anonymous
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class FourNestedClassTypesTaxonomyDemo {

    // 1. Non-Static Member Inner Class:
    public class MemberInner {
        public void info() { System.out.println("  1. Member Inner Class (Bound to Outer instance)"); }
    }

    // 2. Static Nested Class:
    public static class StaticNested {
        public void info() { System.out.println("  2. Static Nested Class (NOT bound to Outer instance)"); }
    }

    public void processMethod() {
        // 3. Method-Local Inner Class:
        class MethodLocalInner {
            public void info() { System.out.println("  3. Method-Local Inner Class (Scoped inside method)"); }
        }
        new MethodLocalInner().info();

        // 4. Anonymous Inner Class:
        Runnable anon = new Runnable() {
            @Override
            public void run() {
                System.out.println("  4. Anonymous Inner Class (Unnamed on-the-fly implementation)");
            }
        };
        anon.run();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 1: THE 4 TYPES OF NESTED CLASSES - BARRACKPORE");
        System.out.println("==========================================================================\n");

        FourNestedClassTypesTaxonomyDemo outer = new FourNestedClassTypesTaxonomyDemo();

        outer.new MemberInner().info();
        new FourNestedClassTypesTaxonomyDemo.StaticNested().info();
        outer.processMethod();

        System.out.println("\n==========================================================================");
    }
}