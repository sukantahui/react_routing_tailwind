/**
 * ============================================================================
 * Java Core Tutorial - Module 002_001: Classes, Objects, Memory & Encapsulation
 * Topic 12: Access Modifiers Overview: private, default, protected, public
 * ============================================================================
 *
 * Educator & Mentor: Sukanta Hui
 * Academic Hubs: Barrackpore, Naihati, Shyamnagar, Ichapur (West Bengal)
 * Students Featured: Swadeep, Tuhina, Abhronila, Debangshu
 *
 * ----------------------------------------------------------------------------
 * Conceptual Overview: The 4-Tier Access Control Matrix of Java
 * ----------------------------------------------------------------------------
 * Java provides 4 distinct visibility levels to control scope and encapsulation:
 *
 * ----------------------------------------------------------------------------
 * ACCESS MODIFIER     SAME CLASS | SAME PACKAGE | SUBCLASS (DIFF PKG) | WORLD
 * ----------------------------------------------------------------------------
 * 1. private              YES           NO                 NO            NO
 * 2. default (no mod)     YES           YES                NO            NO
 * 3. protected            YES           YES                YES           NO
 * 4. public               YES           YES                YES           YES
 * ----------------------------------------------------------------------------
 *
 * 1. 'private':
 *    - Strict encapsulation. Visible ONLY within the enclosing class (and Nestmates).
 *
 * 2. 'default' (Package-Private / Friendly):
 *    - When no modifier is specified. Visible to all classes residing in the SAME package.
 *    - Ideal for package-internal collaborator classes and subsystem utilities.
 *
 * 3. 'protected':
 *    - Package-private + Subclass inheritance across packages.
 *    - Subclasses in other packages can access protected members through inheritance
 *      (`super.member` or on instances of the subclass itself), but NOT on raw parent instances.
 *
 * 4. 'public':
 *    - Globally accessible from any class across all packages (subject to JPMS module exports).
 * ============================================================================
 */

package com.coderaccotax.javatutorial.oop;

public class AccessModifiersOverviewDemo {

    // ------------------------------------------------------------------------
    // Parent Class: AcademyPerson (Exposing All 4 Access Levels)
    // ------------------------------------------------------------------------
    public static class AcademyPerson {
        // 1. Private Member: Only accessible within AcademyPerson
        private String nationalIdentityNumber = "IND-WB-998822";

        // 2. Default (Package-Private) Member: Accessible within same package
        String campusLocation = "Barrackpore Academy Hub";

        // 3. Protected Member: Accessible within same package + Subclasses anywhere
        protected double scholarshipAllowanceInr = 12500.00;

        // 4. Public Member: Accessible globally from anywhere
        public String personFullName = "Swadeep Paul";

        // Methods demonstrating self-access to all 4 levels
        public void displaySelfInspection() {
            System.out.println("  [Inside AcademyPerson - Full Access to all 4 tiers]:");
            System.out.println("    1. private   nationalIdentityNumber : " + nationalIdentityNumber);
            System.out.println("    2. default   campusLocation         : " + campusLocation);
            System.out.println("    3. protected scholarshipAllowanceInr: ₹" + scholarshipAllowanceInr);
            System.out.println("    4. public    personFullName         : " + personFullName);
        }

        // Private helper method
        private String formatSecretAudit() {
            return "Audit Hash: 0x" + Integer.toHexString(System.identityHashCode(this));
        }
    }

    // ------------------------------------------------------------------------
    // Subclass: AcademyTrainee (Demonstrating Inheritance of Protected & Public)
    // ------------------------------------------------------------------------
    public static class AcademyTrainee extends AcademyPerson {
        private String enrolledBatch = "Java Fullstack 2026";

        public void displayInheritedAccess() {
            System.out.println("  [Inside AcademyTrainee Subclass]:");
            // 1. private nationalIdentityNumber -> NOT ACCESSIBLE (Compile Error!)
            // 2. default campusLocation -> ACCESSIBLE (same package)
            // 3. protected scholarshipAllowanceInr -> ACCESSIBLE (inherited member)
            // 4. public personFullName -> ACCESSIBLE (global member)

            System.out.println("    &check; default   campusLocation         : " + campusLocation);
            System.out.println("    &check; protected scholarshipAllowanceInr: ₹" + scholarshipAllowanceInr);
            System.out.println("    &check; public    personFullName         : " + personFullName);
            System.out.println("    &cross; private   nationalIdentityNumber : [BLOCKED - Inaccessible in Subclass]");
        }

        public void applyMeritIncrement(double incrementAmount) {
            // Modifying inherited protected field
            this.scholarshipAllowanceInr += incrementAmount;
            System.out.printf("    [Increment Applied] New allowance for %s: ₹%,.2f\n",
                    this.personFullName, this.scholarshipAllowanceInr);
        }
    }

    // ------------------------------------------------------------------------
    // Collaborator Class: AcademyAuditor (Same Package, Non-Subclass)
    // ------------------------------------------------------------------------
    public static class AcademyAuditor {
        public void auditPerson(AcademyPerson person) {
            System.out.println("  [Inside AcademyAuditor (Same Package, Non-Subclass)]:");
            // 1. private -> NOT ACCESSIBLE
            // 2. default -> ACCESSIBLE (same package)
            // 3. protected -> ACCESSIBLE (same package)
            // 4. public -> ACCESSIBLE (everywhere)

            System.out.println("    &check; default   person.campusLocation         : " + person.campusLocation);
            System.out.println("    &check; protected person.scholarshipAllowanceInr: ₹" + person.scholarshipAllowanceInr);
            System.out.println("    &check; public    person.personFullName         : " + person.personFullName);
            System.out.println("    &cross; private   person.nationalIdentityNumber : [BLOCKED - Private to AcademyPerson]");
        }
    }

    // ------------------------------------------------------------------------
    // Main Method: Comprehensive Demonstrations of All 4 Access Modifiers
    // ------------------------------------------------------------------------
    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" JAVA OOP: THE 4 ACCESS MODIFIERS (private, default, protected, public)");
        System.out.println(" Educator: Sukanta Hui | Campus: Barrackpore, Naihati, Shyamnagar");
        System.out.println("==========================================================================\n");

        // --------------------------------------------------------------------
        // DEMO 1: Printing the 4x4 Access Matrix
        // --------------------------------------------------------------------
        System.out.println(">>> THE COMPLETE JAVA ACCESS MODIFIER MATRIX:");
        System.out.println("  +-----------------+------------+--------------+------------------+-------+");
        System.out.println("  | Modifier        | Same Class | Same Package | Subclass (Diff)  | World |");
        System.out.println("  +-----------------+------------+--------------+------------------+-------+");
        System.out.println("  | private         |    YES     |      NO      |        NO        |  NO   |");
        System.out.println("  | default (none)  |    YES     |     YES      |        NO        |  NO   |");
        System.out.println("  | protected       |    YES     |     YES      |       YES        |  NO   |");
        System.out.println("  | public          |    YES     |     YES      |       YES        |  YES  |");
        System.out.println("  +-----------------+------------+--------------+------------------+-------+\n");

        // --------------------------------------------------------------------
        // DEMO 2: Accessing Members from Within the Declaring Class
        // --------------------------------------------------------------------
        System.out.println(">>> DEMO 2: Self-Access Inside Declaring Class (AcademyPerson)");
        AcademyPerson person = new AcademyPerson();
        person.displaySelfInspection();

        // --------------------------------------------------------------------
        // DEMO 3: Accessing Members from a Subclass (AcademyTrainee)
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 3: Inherited Access Inside Subclass (AcademyTrainee)");
        AcademyTrainee swadeepTrainee = new AcademyTrainee();
        swadeepTrainee.displayInheritedAccess();
        swadeepTrainee.applyMeritIncrement(3500.00);

        // --------------------------------------------------------------------
        // DEMO 4: Accessing Members from a Neighbor Class in Same Package
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 4: Package-Private & Protected Access from Same-Package Auditor");
        AcademyAuditor auditor = new AcademyAuditor();
        auditor.auditPerson(person);

        // --------------------------------------------------------------------
        // DEMO 5: Best Practices Rule Summary
        // --------------------------------------------------------------------
        System.out.println("\n>>> DEMO 5: Access Modifier Selection Hierarchy (Sukanta Hui's Law)");
        System.out.println("  1. Default to 'private' for all instance fields and helper methods.");
        System.out.println("  2. Use 'package-private' for package-internal collaboration classes.");
        System.out.println("  3. Use 'protected' ONLY for methods designed to be overridden by subclasses.");
        System.out.println("  4. Use 'public' for official API contracts and stable domain services.");

        System.out.println("\n==========================================================================");
        System.out.println(" ACCESS MODIFIERS OVERVIEW DEMONSTRATION COMPLETE - BARRACKPORE");
        System.out.println("==========================================================================");
    }
}
