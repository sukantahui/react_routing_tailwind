#include <stdio.h>
#include <stdlib.h>

// Compile with: gcc -g -fsanitize=address -o double_free double_free.c
// Run: ./double_free
// AddressSanitizer will report the double free

int main() {
    int *a = (int*)malloc(10 * sizeof(int));
    int *b = a; // both point to same memory

    free(a);
    // Oops! Freeing again via b — double free
    free(b);

    return 0;
}