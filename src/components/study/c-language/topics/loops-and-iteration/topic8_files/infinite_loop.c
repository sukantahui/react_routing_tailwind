/**
 * infinite_loop.c
 *
 * BUG: This loop never stops – condition is always true.
 * The update statement is commented out by mistake.
 * 
 * 🐞 What's wrong?
 *    - i is never incremented → i always ≤ 5 → infinite loop.
 */

#include <stdio.h>

int main() {
    int i = 1;

    while (i <= 5) {
        printf("%d ", i);
        // i++;   // ← forgot to uncomment this line!
    }

    printf("\nDone.\n");  // This line never executes.
    return 0;
}