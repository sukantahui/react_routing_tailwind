#include <stdio.h>

void buggy_swap(int *a, int *b) {
    int *temp = a;   // Bug: should be int temp = *a;
    *a = *b;
    *b = *temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\n", x, y);
    printf("&x=%p, &y=%p\n", (void*)&x, (void*)&y);

    buggy_swap(&x, &y);

    printf("After swap: x=%d, y=%d\n", x, y);
    printf("&x=%p, &y=%p\n", (void*)&x, (void*)&y);

    // Debugging: print addresses inside swap
    // (We can't directly, but we can add prints in buggy_swap)
    return 0;
}