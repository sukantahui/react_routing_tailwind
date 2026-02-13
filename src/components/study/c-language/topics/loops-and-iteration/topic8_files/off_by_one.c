/**
 * off_by_one.c
 *
 * BUG: Loop runs 6 times instead of 5.
 * The condition should be i < 5, not i <= 5.
 * 
 * 🐞 What's wrong?
 *    - 0‑based array: valid indices are 0..4.
 *    - Using <= causes access to index 5 (out of bounds).
 */

#include <stdio.h>

int main() {
    int numbers[5] = {10, 20, 30, 40, 50};

    printf("Elements: ");
    for (int i = 0; i <= 5; i++) {   // should be i < 5
        printf("%d ", numbers[i]);
    }
    printf("\n");

    return 0;
}