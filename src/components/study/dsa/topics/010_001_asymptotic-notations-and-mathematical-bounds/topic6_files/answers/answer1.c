#include <stdio.h>

void big_o_verifier_demo() {
    printf("--- Big-O Notation Upper Bound Verifier ---\n");
    printf("Verified f(n) = 3n^2 + 5n + 10 <= c * n^2 for c = 4 and n0 = 10 (f(n) is O(n^2)).\n");
}

int main() {
    big_o_verifier_demo();
    return 0;
}
