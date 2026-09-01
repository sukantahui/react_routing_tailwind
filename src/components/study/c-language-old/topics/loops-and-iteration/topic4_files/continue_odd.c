/**
 * continue_odd.c
 *
 * Prints only odd numbers from 1 to 10.
 * Uses continue to skip even numbers.
 */

#include <stdio.h>

int main() {
    printf("Odd numbers: ");
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            continue;  // skip even numbers
        }
        printf("%d ", i);
    }
    printf("\n");
    return 0;
}