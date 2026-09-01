// iterative_factorial.c – Iterative implementation
#include <stdio.h>

long long factorial(int n) {
    if (n < 0) return -1;    // Error: undefined for negative
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int num = 5;
    long long result = factorial(num);
    printf("Factorial of %d = %lld\n", num, result);
    return 0;
}