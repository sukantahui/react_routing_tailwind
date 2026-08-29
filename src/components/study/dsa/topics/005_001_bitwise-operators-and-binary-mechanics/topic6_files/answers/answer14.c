#include <stdio.h>

int get_sum_bitwise(int a, int b) {
    while (b != 0) {
        unsigned int carry = (unsigned int)(a & b) << 1;
        a = a ^ b;
        b = carry;
    }
    return a;
}

int main() {
    int a = 15, b = 27;
    printf("--- Bitwise Full Adder (Sum Without + or -) ---\n");
    printf("%d + %d = %d\n", a, b, get_sum_bitwise(a, b));
    return 0;
}
