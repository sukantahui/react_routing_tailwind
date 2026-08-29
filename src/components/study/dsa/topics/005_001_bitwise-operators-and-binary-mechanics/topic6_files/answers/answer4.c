#include <stdio.h>
#include <stdbool.h>

bool is_even(int n) {
    return (n & 1) == 0;
}

int main() {
    int num = 42;
    printf("--- Check Odd or Even via Bitwise AND ---\n");
    printf("Number %d is %s\n", num, is_even(num) ? "EVEN" : "ODD");
    return 0;
}
