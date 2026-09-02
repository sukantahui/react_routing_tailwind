#include <stdio.h>

void executeSeries(int n) {
    printf("=========================================================
");
    printf("  SERIES PROJECT: Sine sin(x) Taylor Series Expansion (x - x^3/3! + x^5/5! - ...)
");
    printf("=========================================================

");

    double x_deg = 30.0;
    double x_rad = x_deg * 3.141592653589793 / 180.0;
    double sum = x_rad, term = x_rad;
    for (int i = 1; i < n; i++) {
        term = -term * x_rad * x_rad / ((2 * i) * (2 * i + 1));
        sum += term;
    }
    printf("sin(%.0f deg) Taylor Series Sum = %.6f\n", x_deg, sum);
    printf("Expected Value sin(30 deg)       = 0.500000\n");
}

int main(void) {
    int n = 5;
    executeSeries(n);
    return 0;
}
