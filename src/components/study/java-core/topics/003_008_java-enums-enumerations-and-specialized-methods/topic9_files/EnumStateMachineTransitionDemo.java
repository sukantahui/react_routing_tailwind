/**
 * Java Core Tutorial - Module 003_008: Java Enums & Specialized Methods
 * Topic 9: Building Finite State Machines (FSM) with Enums (OrderState Transition Engine)
 * Educator: Sukanta Hui | Academic Hub: Barrackpore, West Bengal
 */

package com.coderaccotax.javatutorial.enums;

public class EnumStateMachineTransitionDemo {

    // Finite State Machine modeling Course Enrollment LifeCycle:
    public enum EnrollmentState {
        ENQUIRY {
            @Override
            public EnrollmentState nextState() { return ADMITTED; }
        },
        ADMITTED {
            @Override
            public EnrollmentState nextState() { return IN_PROGRESS; }
        },
        IN_PROGRESS {
            @Override
            public EnrollmentState nextState() { return CERTIFIED; }
        },
        CERTIFIED {
            @Override
            public EnrollmentState nextState() {
                System.out.println("  [TERMINAL] Student is already CERTIFIED! No further transition.");
                return this;
            }
        };

        // Transition method:
        public abstract EnrollmentState nextState();
    }

    public static void main(String[] args) {
        System.out.println("==========================================================================");
        System.out.println(" TOPIC 9: ENUM FINITE STATE MACHINE (FSM) - BARRACKPORE");
        System.out.println("==========================================================================\n");

        System.out.println(">>> Simulating Trainee Journey (Swadeep Paul - Barrackpore Hub):");

        EnrollmentState state = EnrollmentState.ENQUIRY;
        System.out.println("  Initial Stage : " + state);

        state = state.nextState();
        System.out.println("  Step 1 Transition: " + state);

        state = state.nextState();
        System.out.println("  Step 2 Transition: " + state);

        state = state.nextState();
        System.out.println("  Step 3 Transition: " + state);

        // Attempting transition past terminal state:
        state = state.nextState();
        System.out.println("  Terminal Check   : " + state);

        System.out.println("\n==========================================================================");
    }
}