/**
 * ============================================================================
 * Course: Data Structures & Algorithms in C (Coder & AccoTax, Barrackpore)
 * Mentor: Sukanta Hui
 * Topic 4: Circular Linked Lists — Tail Pointer O(1) Optimization,
 *          Round-Robin CPU Scheduler & Break-Loop Cleanup
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>

typedef struct Process {
    int pid;
    int remainingMs;
    struct Process *next;
} Process;

Process* createProcess(int pid, int burstMs) {
    Process *p = (Process *)malloc(sizeof(*p));
    if (!p) exit(EXIT_FAILURE);
    p->pid = pid;
    p->remainingMs = burstMs;
    p->next = NULL;
    return p;
}

// Tail Pointer Optimization: Insert at Tail in O(1) time (NO traversal!)
void insertTailCircular(Process **tailRef, int pid, int burstMs) {
    Process *newProc = createProcess(pid, burstMs);
    if (*tailRef == NULL) {
        newProc->next = newProc; // Single node points to itself!
        *tailRef = newProc;
        return;
    }
    // head is always (*tailRef)->next
    newProc->next = (*tailRef)->next;
    (*tailRef)->next = newProc;
    *tailRef = newProc; // Update tail to the newly appended node
}

// Print circular list using do-while (head = tail->next)
void printCircular(const Process *tail) {
    if (tail == NULL) {
        printf("Queue: [EMPTY]\n");
        return;
    }
    const Process *head = tail->next;
    const Process *curr = head;
    printf("Queue: ");
    do {
        printf("[P%d: %dms] -> ", curr->pid, curr->remainingMs);
        curr = curr->next;
    } while (curr != head);
    printf("(back to P%d)\n", head->pid);
}

// Round-Robin CPU Scheduler Simulation
void runRoundRobin(Process **tailRef, int quantumMs) {
    printf("=== Round-Robin CPU Scheduler (Quantum = %d ms) ===\n", quantumMs);
    if (*tailRef == NULL) return;

    Process *prev = *tailRef;
    Process *curr = (*tailRef)->next; // Start at head

    while (*tailRef != NULL) {
        int slice = (curr->remainingMs > quantumMs) ? quantumMs : curr->remainingMs;
        curr->remainingMs -= slice;
        printf("CPU runs P%d for %dms (Remaining: %dms)\n",
               curr->pid, slice, curr->remainingMs);

        if (curr->remainingMs == 0) {
            printf(" -> P%d completed! Removing from circular ring.\n", curr->pid);
            if (curr == prev) {
                // Last remaining process in the ring
                free(curr);
                *tailRef = NULL;
                break;
            } else {
                prev->next = curr->next;
                if (curr == *tailRef) {
                    *tailRef = prev; // Move tail backward if tail finished
                }
                free(curr);
                curr = prev->next;
            }
        } else {
            prev = curr;
            curr = curr->next;
        }
    }
    printf("All processes finished cleanly. Queue empty!\n");
}

// Break-Loop Mechanics: Safely turn circular list into linear NULL-ended list before free()
void breakAndFreeCircular(Process **tailRef) {
    if (*tailRef == NULL) return;
    Process *head = (*tailRef)->next;
    (*tailRef)->next = NULL; // 1. Break the circular edge!

    Process *curr = head;
    while (curr != NULL) {
        Process *temp = curr->next;
        free(curr);
        curr = temp;
    }
    *tailRef = NULL;
}

int main(void) {
    Process *tail = NULL;
    insertTailCircular(&tail, 1, 7);
    insertTailCircular(&tail, 2, 4);
    insertTailCircular(&tail, 3, 6);

    printCircular(tail);
    runRoundRobin(&tail, 3);

    // If tasks remained, breakAndFreeCircular(&tail) prevents infinite free loops
    breakAndFreeCircular(&tail);
    return 0;
}
