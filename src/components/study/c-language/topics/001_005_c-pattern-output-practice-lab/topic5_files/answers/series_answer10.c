#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Factorial Fraction Series (1/1! + 2/2! + 3/3! + ...)
");
    printf("=========================================================

");

    double sum = 0.0;
    long long fact = 1;
    printf("Factorial Fraction Series: ");
    for (int i = 1; i <= n; i++) {
        fact *= i;
        sum += (double)i / fact;
        printf("%d/%d!%s", i, i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Factorial Fraction Series = %.6f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
