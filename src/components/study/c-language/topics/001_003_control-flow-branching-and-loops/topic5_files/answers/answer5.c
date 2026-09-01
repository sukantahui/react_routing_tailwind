/**
 * ============================================================================
 * Project 5: Finite State Machine (FSM) Traffic Light Controller
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

typedef enum {
    STATE_RED,
    STATE_RED_YELLOW,
    STATE_GREEN,
    STATE_YELLOW
} TrafficState;

const char* getStateName(TrafficState s) {
    switch(s) {
        case STATE_RED: return "RED (Halt All Traffic)";
        case STATE_RED_YELLOW: return "RED+YELLOW (Prepare Engines)";
        case STATE_GREEN: return "GREEN (Clear to Move)";
        case STATE_YELLOW: return "YELLOW (Caution: Clear Intersection)";
        default: return "UNKNOWN";
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     TRAFFIC INTERSECTION FSM CONTROLLER - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    TrafficState currentState = STATE_RED;
    int simulationCycles = 6;

    for (int step = 1; step <= simulationCycles; step++) {
        printf("Time Step %d: Signal is %s\n", step, getStateName(currentState));

        /* State Transition Logic using switch */
        switch (currentState) {
            case STATE_RED:
                currentState = STATE_RED_YELLOW;
                break;
            case STATE_RED_YELLOW:
                currentState = STATE_GREEN;
                break;
            case STATE_GREEN:
                currentState = STATE_YELLOW;
                break;
            case STATE_YELLOW:
                currentState = STATE_RED;
                break;
        }
    }

    printf("\n>> FSM Cycle Simulation completed successfully.\n");
    printf("===================================================================\n");
    return 0;
}
