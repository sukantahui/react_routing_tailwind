#include <stdio.h>

int min_flips_a_or_b_eq_c(int a, int b, int c) {
    int flips = 0;
    for (int i = 0; i < 32; i++) {
        int bitA = (a >> i) & 1;
        int bitB = (b >> i) & 1;
        int bitC = (c >> i) & 1;
        if (bitC == 0) {
            flips += (bitA + bitB);
        } else {
            if (bitA == 0 && bitB == 0) flips += 1;
        }
    }
    return flips;
}

int main() {
    int a = 2, b = 6, c = 5;
    printf("--- Minimum Flips to Make A OR B == C ---\n");
    printf("Minimum Flips Required = %d\n", min_flips_a_or_b_eq_c(a, b, c));
    return 0;
}
