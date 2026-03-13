// recursive_fibonacci.c – Naive recursive Fibonacci (exponential)
#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);  // Two recursive calls
}

int main() {
    int n = 10;
    printf("fib(%d) = %lld\n", n, fib(n));
    return 0;
}