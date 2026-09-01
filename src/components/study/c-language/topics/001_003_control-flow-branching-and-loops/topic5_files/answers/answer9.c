/**
 * ============================================================================
 * Project 9: High-Low Binary Guessing Game with Scoring & Dynamic Narrowing
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>
#include <stdbool.h>

void simulateGameSession(int target, int simulatedGuesses[], int guessCount) {
    printf("--- Simulating Guessing Game (Hidden Target = %d) ---\n", target);
    int lowBound = 1, highBound = 100;
    int score = 100;
    bool found = false;

    for (int attempt = 1; attempt <= guessCount; attempt++) {
        int guess = simulatedGuesses[attempt - 1];
        printf("Attempt %d/7 [Current Search Range: %d to %d]: User guessed %d\n",
               attempt, lowBound, highBound, guess);

        if (guess == target) {
            printf(">> BULLSEYE! Correct number %d found in %d attempts!\n", target, attempt);
            printf(">> Final Achieved Score: %d / 100 Points!\n\n", score);
            found = true;
            break;
        } else if (guess < target) {
            printf("   Feedback: TOO LOW! The target is higher.\n");
            if (guess >= lowBound) lowBound = guess + 1;
            score -= 15;
        } else {
            printf("   Feedback: TOO HIGH! The target is lower.\n");
            if (guess <= highBound) highBound = guess - 1;
            score -= 15;
        }
    }

    if (!found) {
        printf(">> Game Over! Failed to locate target within 7 attempts.\n\n");
    }
}

int main(void) {
    printf("===================================================================\n");
    printf("     HIGH-LOW BINARY NUMBER GUESSING ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    /* Simulated Optimal Binary Search Guesses for target 73 */
    int guesses1[] = {50, 75, 62, 68, 71, 73};
    simulateGameSession(73, guesses1, 6);

    /* Simulated Guesses for target 25 */
    int guesses2[] = {50, 25};
    simulateGameSession(25, guesses2, 2);

    printf("===================================================================\n");
    return 0;
}
