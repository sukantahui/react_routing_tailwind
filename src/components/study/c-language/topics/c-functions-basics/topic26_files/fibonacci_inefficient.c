#include <stdio.h>

// Naive recursive Fibonacci – DO NOT USE for n > 40
int fib(int n) {
    if (n <= 1) return n;
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 10; // try 50 – you'll wait forever
    printf("fib(%d) = %d\n", n, fib(n));
    return 0;
}