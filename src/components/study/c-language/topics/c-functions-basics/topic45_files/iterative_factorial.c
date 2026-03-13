// iterative_factorial.c – Iterative factorial (loop)
#include <stdio.h>

long long factorial(int n) {
    if (n < 0) return -1;
    long long result = 1;
    for (int i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int n = 5;
    printf("%d! = %lld\n", n, factorial(n));
    return 0;
}