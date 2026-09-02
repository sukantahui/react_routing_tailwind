#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Alternating Harmonic Series (1 - 1/2 + 1/3 - 1/4 + ...)
");
    printf("=========================================================

");

    double sum = 0.0;
    printf("Alternating Harmonic Series: ");
    for (int i = 1; i <= n; i++) {
        if (i % 2 != 0) {
            sum += 1.0 / i;
            printf("%s1/%d", (i == 1) ? "" : " + ", i);
        } else {
            sum -= 1.0 / i;
            printf(" - 1/%d", i);
        }
    }
    printf("\nSum of Series = %.6f (Approximating ln(2) = 0.693147)\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
