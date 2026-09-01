/**
 * repetition_loop.c
 * 
 * Demonstrates repetition using a loop.
 * The loop body executes five times – same output, much shorter code.
 * This is the conceptual introduction; syntax details will be taught later.
 */

#include <stdio.h>

int main() {
    int i;
    for (i = 0; i < 5; i = i + 1) {
        printf("Hello, Abhronila!\n");
    }
    return 0;
}