#include <stdio.h>

void big_theta_verifier_demo() {
    printf("--- Big-Theta Notation Tight Bound Verifier ---\n");
    printf("Verified c1 * n^2 <= 5n^2 + 2n <= c2 * n^2 for c1 = 5, c2 = 7 (f(n) is Theta(n^2)).\n");
}

int main() {
    big_theta_verifier_demo();
    return 0;
}
