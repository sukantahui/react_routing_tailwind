/**
 * Java Core Tutorial - Module 002_003: The 'this' and 'super' Keywords Mastery
 * Topic 6: Returning 'this' from Methods to Enable Fluent Method Chaining
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.thissuper;

public class FluentMethodChainingThisDemo {

    // Fluent Builder Class
    public static class TraineeRegistrationBuilder {
        private String name;
        private String hub = "Barrackpore";
        private String course = "Core Java";
        private double feeDiscount = 0.0;
        private boolean hostelRequired = false;

        // Methods return 'this' (the current builder instance)
        public TraineeRegistrationBuilder setName(String name) {
            this.name = name;
            return this; // Enables chaining!
        }

        public TraineeRegistrationBuilder setHub(String hub) {
            this.hub = hub;
            return this;
        }

        public TraineeRegistrationBuilder setCourse(String course) {
            this.course = course;
            return this;
        }

        public TraineeRegistrationBuilder setFeeDiscount(double feeDiscount) {
            this.feeDiscount = feeDiscount;
            return this;
        }

        public TraineeRegistrationBuilder setHostelRequired(boolean hostelRequired) {
            this.hostelRequired = hostelRequired;
            return this;
        }

        public void printSummary() {
            System.out.printf("  -> Registered: %s | Hub: %s | Course: %s | Discount: ₹%.2f | Hostel: %b\n",
                    name, hub, course, feeDiscount, hostelRequired);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 6: FLUENT METHOD CHAINING VIA 'return this' - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Creating Trainee Registration via Fluent Chaining:");
        TraineeRegistrationBuilder builder = new TraineeRegistrationBuilder();

        // Beautiful fluent method chaining in a single expressive statement!
        builder.setName("Swadeep Paul")
               .setHub("Barrackpore Central")
               .setCourse("Full Stack Java 2026")
               .setFeeDiscount(1500.0)
               .setHostelRequired(false);

        builder.printSummary();

        System.out.println("\n>>> 2. Creating another Trainee for Tuhina at Naihati:");
        new TraineeRegistrationBuilder()
                .setName("Tuhina Das")
                .setHub("Naihati East")
                .setCourse("Spring Boot Pro")
                .setHostelRequired(true)
                .printSummary();

        System.out.println("\n==========================================================================");
    }
}