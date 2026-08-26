/**
 * Java Core Tutorial - Module 002_002: Constructors, Chaining & Object Lifecycle
 * Topic 10: Instance Initialization Blocks (IIB): Syntax, Purpose & Execution Order
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.constructors;

import java.util.UUID;

public class InstanceInitBlockBasicsDemo {

    public static class LabTerminalSession {
        private String sessionToken;
        private long sessionStartTime;
        private String assignedTrainee;
        private String hubLocation;

        // ====================================================================
        // INSTANCE INITIALIZATION BLOCK (IIB) 1: Security & Token Generation
        // Executes for EVERY constructor before the constructor body runs!
        // ====================================================================
        {
            this.sessionToken = "SEC-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
            this.sessionStartTime = System.currentTimeMillis();
            System.out.println("  [IIB-1] Generated security session token: " + this.sessionToken);
        }

        // ====================================================================
        // INSTANCE INITIALIZATION BLOCK (IIB) 2: Diagnostics & Tracking
        // IIBs execute in top-to-bottom textual order
        // ====================================================================
        {
            System.out.println("  [IIB-2] System diagnostics check passed. Ready for constructor binding.");
        }

        // Constructor 1: Fast allocation
        public LabTerminalSession(String assignedTrainee) {
            this.assignedTrainee = assignedTrainee;
            this.hubLocation = "Barrackpore Hub";
            System.out.println("  [CONSTRUCTOR 1] Bound session to trainee: " + assignedTrainee);
        }

        // Constructor 2: Custom Regional Hub allocation
        public LabTerminalSession(String assignedTrainee, String hubLocation) {
            this.assignedTrainee = assignedTrainee;
            this.hubLocation = hubLocation;
            System.out.printf("  [CONSTRUCTOR 2] Bound session to: %s at %s\n", assignedTrainee, hubLocation);
        }

        public void printSession() {
            System.out.printf("  -> Token: %s | Trainee: %s | Hub: %s | Started: %d\n",
                    sessionToken, assignedTrainee, hubLocation, sessionStartTime);
        }
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 10: INSTANCE INITIALIZATION BLOCKS (IIB) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> 1. Instantiating Terminal for Swadeep (Constructor 1):");
        LabTerminalSession s1 = new LabTerminalSession("Swadeep Paul");
        s1.printSession();

        System.out.println("\n>>> 2. Instantiating Terminal for Tuhina at Naihati (Constructor 2):");
        LabTerminalSession s2 = new LabTerminalSession("Tuhina Das", "Naihati Hub");
        s2.printSession();

        System.out.println("\n==========================================================================");
    }
}