#include <stdio.h>

// Swap using pointers – finally works!
void swap(int *a, int *b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

int main() {
    int x = 10, y = 20;
    printf("Before: x = %d, y = %d\n", x, y);
    swap(&x, &y);   // pass addresses
    printf("After:  x = %d, y = %d\n", x, y);   // swapped!
    return 0;
}