// recursive_factorial.c – Recursive implementation
#include <stdio.h>

long long factorial(int n) {
    if (n < 0) return -1;          // Error: undefined for negative
    if (n == 0 || n == 1) return 1; // Base case
    return n * factorial(n - 1);    // Recursive case
}

int main() {
    int num = 5;
    long long result = factorial(num);
    printf("Factorial of %d = %lld\n", num, result);
    return 0;
}