/**
 * Java Core Tutorial - Module 003_007: Nested & Inner Classes
 * Topic 3: Instantiating Member Inner Classes: Outer.Inner inner = outer.new Inner();
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.nested;

public class MemberInnerInstantiationSyntaxDemo {

    public class Engine {
        public void start() {
            System.out.println("  V8 Twin-Turbo Engine Started Successfully!");
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 3: outer.new Inner() INSTANTIATION SYNTAX - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 2 Ways to Instantiate a Member Inner Class:");
        System.out.println();
        System.out.println("  STYLE 1: Two-Step Explicit Instantiation:");
        MemberInnerInstantiationSyntaxDemo car = new MemberInnerInstantiationSyntaxDemo();
        MemberInnerInstantiationSyntaxDemo.Engine engine1 = car.new Engine();
        engine1.start();

        System.out.println();
        System.out.println("  STYLE 2: Inline Chained Instantiation:");
        MemberInnerInstantiationSyntaxDemo.Engine engine2 = new MemberInnerInstantiationSyntaxDemo().new Engine();
        engine2.start();

        System.out.println("\n>>> SYNTAX RULE: Use 'outerRef.new InnerClass()' to construct member inner instances.");

        System.out.println("\n==========================================================================");
    }
}