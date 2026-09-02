#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Geometric Progression (GP) Series (a + ar + ar^2 + ...)
");
    printf("=========================================================

");

    double a = 2.0, r = 3.0;
    double sum = 0.0, term = a;
    printf("GP Series: ");
    for (int i = 1; i <= n; i++) {
        sum += term;
        printf("%.0f%s", term, (i == n) ? "" : " + ");
        term *= r;
    }
    printf("\nSum of GP Series = %.2f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
