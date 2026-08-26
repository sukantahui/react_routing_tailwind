/**
 * Java Core Tutorial - Module 002_005: Inheritance, IS-A vs HAS-A, Composition & Aggregation
 * Topic 14: Real-World Modeling: Employee -> Manager Hierarchy vs Employee HAS-A Address
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.inheritance;

public class RealWorldEnterpriseModelingDemo {

    // Value Object (HAS-A Component)
    public static class PostalAddress {
        private String street;
        private String city;
        private String pinCode;

        public PostalAddress(String street, String city, String pinCode) {
            this.street = street;
            this.city = city;
            this.pinCode = pinCode;
        }

        public String getFullAddress() {
            return String.format("%s, %s - %s", street, city, pinCode);
        }
    }

    // Base Entity
    public static class StaffMember {
        protected int empId;
        protected String fullName;
        protected double baseSalary;
        protected PostalAddress address; // HAS-A Association!

        public StaffMember(int id, String name, double salary, PostalAddress address) {
            this.empId = id;
            this.fullName = name;
            this.baseSalary = salary;
            this.address = address;
        }

        public void printSummary() {
            System.out.printf("  [STAFF #%d] %s | Salary: ₹%.2f | Address: %s\n",
                    empId, fullName, baseSalary, address.getFullAddress());
        }
    }

    // IS-A Specialization: AcademicManager IS-A StaffMember
    public static class AcademicManager extends StaffMember {
        private double leadershipBonus;
        private String managedHub;

        public AcademicManager(int id, String name, double salary, PostalAddress address, double bonus, String hub) {
            super(id, name, salary, address); // IS-A relationship
            this.leadershipBonus = bonus;
            this.managedHub = hub;
        }

        @Override
        public void printSummary() {
            super.printSummary();
            System.out.printf("    -> Role: Academic Hub Director @ %s (Total Comp: ₹%.2f)\n",
                    managedHub, (baseSalary + leadershipBonus));
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 14: REAL-WORLD DOMAIN MODELING CAPSTONE - BARRACKPORE");
        System.out.println("==========================================================================\n");

        PostalAddress bkpAddress = new PostalAddress("Station Road, Riverside", "Barrackpore", "700120");

        System.out.println(">>> 1. Creating Staff Member (Demonstrating HAS-A Address):");
        StaffMember staff = new StaffMember(101, "Swadeep Paul", 45000.0, bkpAddress);
        staff.printSummary();

        System.out.println("\n>>> 2. Creating Academic Manager (Demonstrating IS-A StaffMember + HAS-A Address):");
        AcademicManager mgr = new AcademicManager(1001, "Sukanta Hui", 95000.0, bkpAddress, 25000.0, "Barrackpore Central Hub");
        mgr.printSummary();

        System.out.println("\n==========================================================================");
        System.out.println(" MODULE 002_005 INHERITANCE & COMPOSITION 100% COMPLETE!");
        System.out.println("==========================================================================");
    }
}