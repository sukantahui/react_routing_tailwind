#include <stdio.h>

// Recursive factorial with clear base case
int factorial(int n) {
    // Base case: 0! = 1
    if (n == 0) {
        return 1;
    }
    // Recursive case: n! = n * (n-1)!
    return n * factorial(n - 1);
}

int main() {
    int num = 5;
    printf("%d! = %d\n", num, factorial(num));
    return 0;
}