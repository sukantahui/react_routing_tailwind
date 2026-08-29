#include <stdio.h>

void swap_xor(int *a, int *b) {
    if (a != b) {
        *a = *a ^ *b;
        *b = *a ^ *b;
        *a = *a ^ *b;
    }
}

int main() {
    int x = 10, y = 20;
    printf("--- Swap Numbers Without Temp Variable (XOR Swap) ---\nBefore: x = %d, y = %d\n", x, y);
    swap_xor(&x, &y);
    printf("After : x = %d, y = %d\n", x, y);
    return 0;
}
