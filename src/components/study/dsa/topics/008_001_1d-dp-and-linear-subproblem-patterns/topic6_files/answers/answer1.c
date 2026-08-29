#include <stdio.h>

int fib_space_opt(int n) {
    if (n <= 1) return n;
    int prev2 = 0, prev1 = 1, curr = 0;
    for (int i = 2; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return curr;
}

int main() {
    int n = 10;
    printf("--- Fibonacci 1D DP (Space Optimized O(1)) ---\nFibonacci(%d) = %d\n", n, fib_space_opt(n));
    return 0;
}
