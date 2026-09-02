#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Harmonic Series (1 + 1/2 + 1/3 + 1/4 + ... + 1/N)
");
    printf("=========================================================

");

    double sum = 0.0;
    printf("Harmonic Series: ");
    for (int i = 1; i <= n; i++) {
        sum += 1.0 / i;
        printf("1/%d%s", i, (i == n) ? "" : " + ");
    }
    printf("\nSum of Harmonic Series = %.6f\n", sum);
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
