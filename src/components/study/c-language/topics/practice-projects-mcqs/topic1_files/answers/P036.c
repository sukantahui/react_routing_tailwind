#include <stdio.h>

int factorialRec(int n) {
    if (n <= 1) return 1;
    return n * factorialRec(n - 1);
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Factorial not defined for negative numbers.\n");
    else
        printf("Factorial = %d\n", factorialRec(n));
    return 0;
}
