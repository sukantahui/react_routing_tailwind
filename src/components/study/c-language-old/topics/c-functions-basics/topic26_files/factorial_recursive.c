#include <stdio.h>

// Recursive factorial – elegant but risky for large n
long long factorial(int n) {
    if (n == 0) return 1;
    return n * factorial(n - 1);
}

int main() {
    int n = 20; // try 100000 – crash!
    printf("%d! = %lld\n", n, factorial(n));
    return 0;
}