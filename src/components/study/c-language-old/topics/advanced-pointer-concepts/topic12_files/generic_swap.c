#include <stdio.h>
#include <string.h>

// Generic swap: swaps any two objects of equal size
void generic_swap(void *a, void *b, size_t size) {
    char temp[size];
    memcpy(temp, a, size);
    memcpy(a, b, size);
    memcpy(b, temp, size);
}

int main() {
    int x = 10, y = 20;
    printf("Before swap: x=%d, y=%d\n", x, y);
    generic_swap(&x, &y, sizeof(int));
    printf("After swap: x=%d, y=%d\n", x, y);
    
    double p = 1.23, q = 4.56;
    printf("Before swap: p=%f, q=%f\n", p, q);
    generic_swap(&p, &q, sizeof(double));
    printf("After swap: p=%f, q=%f\n", p, q);
    
    return 0;
}