#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Alternating Power Series (x - x^2 + x^3 - x^4 + ...)
");
    printf("=========================================================

");

    double x = 2.0;
    double sum = 0.0, term = 1.0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        term *= x;
        if (i % 2 != 0) {
            sum += term;
            printf("%s%.0f^%d", (i == 1) ? "" : " + ", x, i);
        } else {
            sum -= term;
            printf(" - %.0f^%d", x, i);
        }
    }
    printf("\nSum of Alternating Power Series = %.0f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
