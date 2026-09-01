/**
 * do_while_basic.c
 *
 * Demonstrates a simple counter-controlled do-while loop.
 * Prints numbers 1 to 5.
 * Notice: the body always executes at least once.
 */

#include <stdio.h>

int main() {
    int i = 1;

    do {
        printf("%d ", i);
        i++;
    } while (i <= 5);

    printf("\n");
    return 0;
}