/**
 * Java Core Tutorial - Module 002_004: Static Variables, Methods, Blocks & Singleton
 * Topic 0: What Does 'static' Mean: Class-Level vs Instance-Level Association
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.statics;

public class StaticConceptFoundationsDemo {

    public static class TraineePortal {
        // CLASS-LEVEL (STATIC): Single shared copy across all instances in Metaspace
        public static String organizationName = "Coder & AccoTax Academy";
        public static String centralHubCity = "Barrackpore";

        // INSTANCE-LEVEL (NON-STATIC): Unique per Heap object
        private String traineeName;
        private int rollNumber;

        public TraineePortal(String traineeName, int rollNumber) {
            this.traineeName = traineeName;
            this.rollNumber = rollNumber;
        }

        public void printDetails() {
            System.out.printf("  -> [Trainee: %s (Roll %d)] Organization: %s | City: %s\n",
                    traineeName, rollNumber, organizationName, centralHubCity);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 0: WHAT 'static' MEANS IN JAVA - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Accessing Static Members Directly via ClassName (No Object Required):");
        System.out.println("  Academy: " + TraineePortal.organizationName);
        System.out.println("  Location: " + TraineePortal.centralHubCity);

        System.out.println("\n>>> 2. Instantiating Individual Trainee Objects:");
        TraineePortal swadeep = new TraineePortal("Swadeep Paul", 101);
        TraineePortal tuhina = new TraineePortal("Tuhina Das", 102);

        swadeep.printDetails();
        tuhina.printDetails();

        System.out.println("\n>>> 3. Modifying Static Variable (Affects ALL Instances Globally):");
        TraineePortal.centralHubCity = "Barrackpore Central IT Hub";
        swadeep.printDetails();
        tuhina.printDetails();

        System.out.println("\n==========================================================================");
    }
}