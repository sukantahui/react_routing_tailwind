#include <stdio.h>

// Tail recursion example (not optimized in C)
int factorial_tail(int n, int accumulator) {
    if (n == 0) {
        return accumulator;
    }
    return factorial_tail(n - 1, n * accumulator); // tail call
}

int main() {
    int n = 5;
    int result = factorial_tail(n, 1);
    printf("%d! = %d\n", n, result);
    return 0;
}