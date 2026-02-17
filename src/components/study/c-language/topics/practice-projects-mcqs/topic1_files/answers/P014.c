#include <stdio.h>

int main() {
    int n, i = 1, fact = 1;
    printf("Enter a non-negative integer: ");
    scanf("%d", &n);
    if (n < 0) {
        printf("Factorial not defined for negative numbers.\n");
        return 1;
    }
    while (i <= n) {
        fact *= i;
        i++;
    }
    printf("Factorial = %d\n", fact);
    return 0;
}
