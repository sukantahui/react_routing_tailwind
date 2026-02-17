#include <stdio.h>
void swap(int *x, int *y) {
    int t = *x;
    *x = *y;
    *y = t;
}
int main() {
    int x = 10, y = 20;
    swap(&x, &y);
    printf("x = %d, y = %d", x, y);
    return 0;
}
