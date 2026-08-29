#include <stdio.h>

double sqrt_float(double x) {
    double low = 0.0, high = x, ans = 0.0;
    while (high - low > 1e-7) {
        double mid = low + (high - low) / 2.0;
        if (mid * mid <= x) { ans = mid; low = mid; }
        else high = mid;
    }
    return ans;
}

int main() {
    double x = 2.0;
    printf("--- Fractional High-Precision Floating Binary Search ---\n");
    printf("High-Precision Sqrt(2.0) = %.7f\n", sqrt_float(x));
    return 0;
}
