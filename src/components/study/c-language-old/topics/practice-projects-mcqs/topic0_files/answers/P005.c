#include <stdio.h>

int factorialIter(int n) {
    int fact = 1;
    for (int i = 1; i <= n; i++)
        fact *= i;
    return fact;
}

int main() {
    int n;
    printf("Enter a number: ");
    scanf("%d", &n);
    if (n < 0)
        printf("Factorial not defined for negative numbers.\n");
    else
        printf("Factorial = %d\n", factorialIter(n));
    return 0;
}
