#include <stdio.h>

// Iterative factorial – safe, fast, constant stack
long long factorial(int n) {
    long long result = 1;
    for (int i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

int main() {
    int n = 20; // works for any n up to overflow limit
    printf("%d! = %lld\n", n, factorial(n));
    return 0;
}