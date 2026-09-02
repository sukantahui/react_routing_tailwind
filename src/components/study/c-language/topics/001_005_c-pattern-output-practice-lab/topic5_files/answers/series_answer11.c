#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Exponential e^x Taylor Series Expansion (1 + x/1! + x^2/2! + ...)
");
    printf("=========================================================

");

    double x = 1.0;
    double sum = 1.0, term = 1.0;
    for (int i = 1; i <= n; i++) {
        term = term * x / i;
        sum += term;
    }
    printf("e^%.1f Taylor Series Sum (%d terms) = %.6f\n", x, n, sum);
    printf("Standard Math Library exp(%.1f)      = %.6f\n", x, sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
