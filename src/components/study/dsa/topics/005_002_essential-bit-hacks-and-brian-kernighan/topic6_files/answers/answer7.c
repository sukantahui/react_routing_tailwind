#include <stdio.h>

int min_branchless(int a, int b) {
    return b ^ ((a ^ b) & -(a < b));
}

int max_branchless(int a, int b) {
    return a ^ ((a ^ b) & -(a < b));
}

int main() {
    int a = 15, b = 27;
    printf("--- Branchless Min and Max ---\n");
    printf("Min(%d, %d) = %d\n", a, b, min_branchless(a, b));
    printf("Max(%d, %d) = %d\n", a, b, max_branchless(a, b));
    return 0;
}
