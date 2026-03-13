#include <stdio.h>

// Recursive Fibonacci – extremely inefficient (exponential time)
int fib(int n) {
    if (n <= 1) {
        return n;
    }
    return fib(n - 1) + fib(n - 2);
}

int main() {
    int n = 10; // try 40 – you'll wait a long time!
    printf("fib(%d) = %d\n", n, fib(n));
    return 0;
}