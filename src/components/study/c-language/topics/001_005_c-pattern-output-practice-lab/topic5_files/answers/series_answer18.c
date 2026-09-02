#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Fractional Power Series (x/1 + x^2/2 + x^3/3 + ... + x^N/N)
");
    printf("=========================================================

");

    double x = 2.0;
    double sum = 0.0, p = 1.0;
    printf("Series: ");
    for (int i = 1; i <= n; i++) {
        p *= x;
        sum += p / i;
        printf("%.0f^%d/%d%s", x, i, i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Fractional Power Series = %.6f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
