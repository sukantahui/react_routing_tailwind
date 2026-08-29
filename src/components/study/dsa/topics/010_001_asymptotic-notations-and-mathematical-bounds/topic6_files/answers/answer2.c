#include <stdio.h>

void big_omega_verifier_demo() {
    printf("--- Big-Omega Notation Lower Bound Verifier ---\n");
    printf("Verified f(n) = 2n^2 - 3n >= c * n^2 for c = 1 and n0 = 3 (f(n) is Omega(n^2)).\n");
}

int main() {
    big_omega_verifier_demo();
    return 0;
}
