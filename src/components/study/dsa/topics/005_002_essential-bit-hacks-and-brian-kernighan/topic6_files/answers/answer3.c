#include <stdio.h>

int turn_on_rightmost_zero(int n) {
    return n | (n + 1);
}

int main() {
    int n = 10; // 10 = 1010 -> 1011 (11)
    printf("--- Turn On Rightmost Zero Bit (N | (N + 1)) ---\nOriginal N = %d (1010)\nAfter Turn On = %d (1011)\n", n, turn_on_rightmost_zero(n));
    return 0;
}
