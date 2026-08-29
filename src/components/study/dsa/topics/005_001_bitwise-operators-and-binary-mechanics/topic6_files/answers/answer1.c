#include <stdio.h>

void bitwise_fundamentals_demo(int a, int b) {
    printf("--- Bitwise Operators Fundamentals ---\n");
    printf("a = %d, b = %d\n", a, b);
    printf("a & b  = %d\n", a & b);
    printf("a | b  = %d\n", a | b);
    printf("a ^ b  = %d\n", a ^ b);
    printf("~a     = %d\n", ~a);
    printf("a << 1 = %d\n", a << 1);
    printf("a >> 1 = %d\n", a >> 1);
}

int main() {
    bitwise_fundamentals_demo(5, 3); // 5 = 0101, 3 = 0011
    return 0;
}
