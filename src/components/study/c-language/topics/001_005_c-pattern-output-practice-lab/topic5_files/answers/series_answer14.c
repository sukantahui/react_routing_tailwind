#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Power Series (x + x^2 + x^3 + ... + x^N)
");
    printf("=========================================================

");

    double x = 2.0;
    double sum = 0.0, term = 1.0;
    printf("Power Series: ");
    for (int i = 1; i <= n; i++) {
        term *= x;
        sum += term;
        printf("%.0f^%d%s", x, i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Power Series = %.0f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
