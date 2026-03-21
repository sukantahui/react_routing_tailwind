#include <stdio.h>

// Swaps two pointers using double pointers
void swapPointers(int **a, int **b) {
    int *temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    int *p = &x;
    int *q = &y;

    printf("Before swap: p points to %d, q points to %d\n", *p, *q);
    swapPointers(&p, &q);
    printf("After swap: p points to %d, q points to %d\n", *p, *q);

    return 0;
}