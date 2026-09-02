#include <stdio.h>

/**
 * Project 8: Function Pointer Event Dispatcher & State Machine Engine
 * Implements a finite state machine (FSM) using state function pointers.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

typedef enum {
    STATE_IDLE,
    STATE_RUNNING,
    STATE_PAUSED,
    STATE_STOPPED,
    STATE_MAX
} State;

typedef void (*StateActionHandler)(void);

void handleIdle(void)    { printf("State: [IDLE] - Waiting for user start command.\n"); }
void handleRunning(void) { printf("State: [RUNNING] - Processing background data batch.\n"); }
void handlePaused(void)  { printf("State: [PAUSED] - Task temporarily suspended.\n"); }
void handleStopped(void) { printf("State: [STOPPED] - Task terminated cleanly.\n"); }

int main(void) {
    // Array of state handlers (Dispatch Table)
    StateActionHandler stateHandlers[STATE_MAX] = {
        handleIdle,
        handleRunning,
        handlePaused,
        handleStopped
    };

    printf("Executing FSM State Transitions via Function Pointers:\n");
    State sequence[] = {STATE_IDLE, STATE_RUNNING, STATE_PAUSED, STATE_RUNNING, STATE_STOPPED};
    int steps = sizeof(sequence) / sizeof(sequence[0]);

    for (int i = 0; i < steps; i++) {
        State current = sequence[i];
        printf("Step %d -> ", i + 1);
        stateHandlers[current]();
    }

    return 0;
}
