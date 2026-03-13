#include <stdio.h>

int main() {
    int n, i, fact = 1;
    printf("Enter a non-negative integer: ");
    scanf("%d", &n);
    if (n < 0) {
        printf("Factorial not defined for negative numbers.\n");
        return 1;
    }
    for (i = 1; i <= n; i++) {
        fact *= i;
    }
    printf("Factorial = %d\n", fact);
    return 0;
}
