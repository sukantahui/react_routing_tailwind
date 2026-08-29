#include <stdio.h>

int fast_sign(int n) {
    return (n > 0) - (n < 0);
}

int main() {
    int val = -42;
    printf("--- Fast Sign Verification Without Branching ---\nInput: %d -> Sign: %d\n", val, fast_sign(val));
    return 0;
}
