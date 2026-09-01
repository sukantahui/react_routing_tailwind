/**
 * ============================================================================
 * Project 11: Symmetrical Diamond & Hollow Diamond Pattern Rendering Engine
 * Module: 001_003 - Control Flow, Branching & Loops
 * Educator: Sukanta Hui | Coder & AccoTax, Barrackpore
 * ============================================================================
 */

#include <stdio.h>

void renderSolidDiamond(int n) {
    printf("--- Centered Solid Diamond (N = %d) ---\n", n);
    /* Upper Pyramid */
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int k = 1; k <= 2 * i - 1; k++) printf("*");
        printf("\n");
    }
    /* Lower Inverted Pyramid */
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int k = 1; k <= 2 * i - 1; k++) printf("*");
        printf("\n");
    }
    printf("\n");
}

void renderHollowDiamond(int n) {
    printf("--- Centered Hollow Diamond (N = %d) ---\n", n);
    /* Upper Hollow */
    for (int i = 1; i <= n; i++) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int k = 1; k <= 2 * i - 1; k++) {
            if (k == 1 || k == 2 * i - 1) printf("*");
            else printf(" ");
        }
        printf("\n");
    }
    /* Lower Hollow */
    for (int i = n - 1; i >= 1; i--) {
        for (int s = 1; s <= n - i; s++) printf(" ");
        for (int k = 1; k <= 2 * i - 1; k++) {
            if (k == 1 || k == 2 * i - 1) printf("*");
            else printf(" ");
        }
        printf("\n");
    }
    printf("\n");
}

int main(void) {
    printf("===================================================================\n");
    printf("     GEOMETRIC DIAMOND PATTERN ENGINE - CODER & ACCOTAX\n");
    printf("===================================================================\n\n");

    renderSolidDiamond(4);
    renderHollowDiamond(4);

    printf("===================================================================\n");
    return 0;
}
