/**
 * ============================================================================
 * Program: LoopControlJumpDemo.c
 * Module: 001_003 - Control Flow: Branching, Decision Making & Loops
 * Topic 3: Loop control mechanics: break, continue, and appropriate use of goto
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 * Standard: ANSI C / C99
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

int main(void) {
    printf("===================================================================\n");
    printf("     LOOP CONTROL JUMPS: BREAK, CONTINUE, GOTO - CODER & ACCOTAX\n");
    printf("     Educator: Sukanta Hui | Barrackpore Systems Lab\n");
    printf("===================================================================\n\n");

    /* 1. Early Termination using 'break': Linear Search */
    int numbers[] = {14, 28, 56, 73, 91, 105};
    int target = 73;
    int foundIndex = -1;
    int size = sizeof(numbers) / sizeof(numbers[0]);

    printf("--- [1] Early Loop Exit with 'break' (Linear Search) ---\n");
    for (int i = 0; i < size; i++) {
        if (numbers[i] == target) {
            foundIndex = i;
            printf("Target %d FOUND at array index %d! Breaking early.\n", target, foundIndex);
            break; /* No need to check remaining elements */
        }
    }

    /* 2. Skipping Iterations using 'continue': Printing Odd Numbers */
    printf("\n--- [2] Skipping Current Iteration with 'continue' ---\n");
    printf("Odd numbers between 1 and 10: ");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue; /* Skip even numbers */
        }
        printf("%d ", i);
    }
    printf("\n");

    /* 3. Deeply Nested Loop Breakout with 'goto' Clean Exit */
    printf("\n--- [3] Breaking Out of Deep Nested Loops (Matrix Search) ---\n");
    int matrix[3][3] = {
        {10, 20, 30},
        {40, 99, 60},
        {70, 80, 90}
    };
    int searchVal = 99;
    bool foundMatrix = false;

    for (int row = 0; row < 3; row++) {
        for (int col = 0; col < 3; col++) {
            if (matrix[row][col] == searchVal) {
                printf("Value %d found at matrix[%d][%d]! Jumping out via goto.\n", searchVal, row, col);
                foundMatrix = true;
                goto search_complete; /* Clean exit from nested loops */
            }
        }
    }

search_complete:
    if (foundMatrix) {
        printf("Search completed successfully with zero redundant iterations.\n");
    }

    printf("===================================================================\n");
    return 0;
}
