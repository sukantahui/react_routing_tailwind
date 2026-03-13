#include <stdio.h>
void swap(int *x, int *y) {
    int temp = *x;
    *x = *y;
    *y = temp;
}
int main() {
    int a = 10, b = 20;
    swap(&a, &b);
    printf("x = %d, y = %d", a, b);
    return 0;
}
