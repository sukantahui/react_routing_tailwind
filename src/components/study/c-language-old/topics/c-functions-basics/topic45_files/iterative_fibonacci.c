// iterative_fibonacci.c – Iterative Fibonacci (linear)
#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;
    long long a = 0, b = 1, c;
    for (int i = 2; i <= n; i++) {
        c = a + b;
        a = b;
        b = c;
    }
    return b;
}

int main() {
    int n = 10;
    printf("fib(%d) = %lld\n", n, fib(n));
    return 0;
}