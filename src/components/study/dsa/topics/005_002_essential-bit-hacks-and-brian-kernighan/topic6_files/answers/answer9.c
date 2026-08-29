#include <stdio.h>

unsigned int round_up_power_of_two(unsigned int n) {
    n--;
    n |= n >> 1;
    n |= n >> 2;
    n |= n >> 4;
    n |= n >> 8;
    n |= n >> 16;
    return n + 1;
}

int main() {
    unsigned int n = 17;
    printf("--- Round Up to Next Power of Two ---\nInput: %u\nNext Power of 2: %u\n", n, round_up_power_of_two(n));
    return 0;
}
