#include <stdio.h>

void swap(int *p, int *q) {
    int temp = *p;
    *p = *q;
    *q = temp;
}

void increment(int *n) {
    (*n)++;
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\n", x, y);
    swap(&x, &y);
    printf("After swap: x=%d, y=%d\n", x, y);

    int a = 5;
    printf("Before increment: a=%d\n", a);
    increment(&a);
    printf("After increment: a=%d\n", a);

    return 0;
}