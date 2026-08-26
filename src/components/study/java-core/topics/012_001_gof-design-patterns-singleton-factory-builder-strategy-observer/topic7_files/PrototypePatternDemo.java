/**
 * Java Core Tutorial - Module 012_001: GoF Design Patterns
 * Topic 7: The Prototype Pattern - Object Cloning & Deep Copies
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.patterns;

public class PrototypePatternDemo {

    public interface Prototype<T> {
        T copy();
    }

    public static class CourseTemplate implements Prototype<CourseTemplate> {
        private String courseCode;
        private String title;
        private double baseFee;

        public CourseTemplate(String code, String title, double fee) {
            this.courseCode = code;
            this.title = title;
            this.baseFee = fee;
        }

        // Copy constructor / Prototype copy method:
        @Override
        public CourseTemplate copy() {
            return new CourseTemplate(this.courseCode, this.title, this.baseFee);
        }

        public void setBaseFee(double fee) { this.baseFee = fee; }

        @Override
        public String toString() {
            return "CourseTemplate[" + courseCode + ": " + title + " @ ₹" + baseFee + "]";
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 7: PROTOTYPE DESIGN PATTERN - BARRACKPORE ACADEMY");
        System.out.println("==========================================================================\n");

        // 1. Expensive prototype initialized once:
        CourseTemplate standardJava = new CourseTemplate("JAVA_2026", "Java Pro Masterclass", 5000.0);
        System.out.println("Master Prototype: " + standardJava);

        // 2. Fast cloning for customized discounted batch:
        CourseTemplate barrackporeDiscounted = standardJava.copy();
        barrackporeDiscounted.setBaseFee(4000.0);
        System.out.println("Cloned Instance : " + barrackporeDiscounted);

        System.out.println("\n==========================================================================");
    }
}
