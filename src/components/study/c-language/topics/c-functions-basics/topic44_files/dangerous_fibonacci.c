// dangerous_fibonacci.c – Naive exponential recursion
#include <stdio.h>

long long fib(int n) {
    if (n <= 1) return n;            // base cases: fib(0)=0, fib(1)=1
    return fib(n - 1) + fib(n - 2);   // two recursive calls → exponential
}

int main() {
    int n = 10;
    printf("fib(%d) = %lld\n", n, fib(n));
    // Warning: n=50 will take forever and likely overflow stack
    return 0;
}