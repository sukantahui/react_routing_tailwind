#include <stdio.h>

// Sum of first n natural numbers
int sum(int n) {
    // Base case: sum of first 1 number is 1
    if (n == 1) {
        return 1;
    }
    // Recursive case: sum(n) = n + sum(n-1)
    return n + sum(n - 1);
}

int main() {
    int n = 10;
    printf("Sum of first %d numbers = %d\n", n, sum(n));
    return 0;
}