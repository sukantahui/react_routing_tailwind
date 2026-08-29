#include <stdio.h>

double f(double x) { return -1.0 * (x - 3.0) * (x - 3.0) + 10.0; } // Parabola peaking at x=3

double ternary_search(double low, double high) {
    for (int i = 0; i < 100; i++) {
        double m1 = low + (high - low) / 3.0;
        double m2 = high - (high - low) / 3.0;
        if (f(m1) < f(m2)) low = m1;
        else high = m2;
    }
    return (low + high) / 2.0;
}

int main() {
    printf("--- Ternary Search on Unimodal Real Functions ---\n");
    printf("Maximum point located at X = %.6f\n", ternary_search(0.0, 10.0));
    return 0;
}
