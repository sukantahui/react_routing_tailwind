#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Cosine cos(x) Taylor Series Expansion (1 - x^2/2! + x^4/4! - ...)
");
    printf("=========================================================

");

    double x_deg = 60.0;
    double x_rad = x_deg * 3.141592653589793 / 180.0;
    double sum = 1.0, term = 1.0;
    for (int i = 1; i < n; i++) {
        term = -term * x_rad * x_rad / ((2 * i - 1) * (2 * i));
        sum += term;
    }
    printf("cos(%.0f deg) Taylor Series Sum = %.6f\n", x_deg, sum);
    printf("Expected Value cos(60 deg)       = 0.500000\n");
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
