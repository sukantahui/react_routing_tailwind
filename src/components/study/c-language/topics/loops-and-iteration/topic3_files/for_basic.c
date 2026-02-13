/**
 * for_basic.c
 *
 * Demonstrates a simple counter‑controlled for loop.
 * Prints numbers 1 to 5.
 */

#include <stdio.h>

int main() {
    for (int i = 1; i <= 5; i++) {
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}