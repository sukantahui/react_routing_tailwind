// recursive_factorial.c – Recursive factorial (linear recursion)
#include <stdio.h>

long long factorial(int n) {
    if (n < 0) return -1;
    if (n == 0 || n == 1) return 1;
    return n * factorial(n - 1);  // Recursive call
}

int main() {
    int n = 5;
    printf("%d! = %lld\n", n, factorial(n));
    return 0;
}