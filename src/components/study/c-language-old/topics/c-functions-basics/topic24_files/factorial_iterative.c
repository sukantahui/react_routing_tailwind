#include <stdio.h>

// Iterative factorial – efficient, no stack growth
int factorial(int n) {
    int result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int n = 5;
    printf("%d! = %d\n", n, factorial(n));
    return 0;
}