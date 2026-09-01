/**
 * while_basic.c
 *
 * Demonstrates a simple counter-controlled while loop.
 * Prints numbers 1 to 5.
 */

#include <stdio.h>

int main() {
    int i = 1;          // initialization
    while (i <= 5) {    // condition
        printf("%d ", i);
        i++;            // update
    }
    printf("\n");
    return 0;
}