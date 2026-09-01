// elegant_power.c – Linear recursion for x^n
#include <stdio.h>

double power(double x, int n) {
    if (n < 0) return 1.0 / power(x, -n); // handle negative exponents
    if (n == 0) return 1.0;                // base case
    return x * power(x, n - 1);             // one recursive call
}

int main() {
    double base = 2.0;
    int exp = 10;
    printf("%.2f ^ %d = %.2f\n", base, exp, power(base, exp));
    return 0;
}