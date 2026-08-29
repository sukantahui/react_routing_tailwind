#include <stdio.h>

int hamming_distance(int x, int y) {
    int xor_val = x ^ y;
    int dist = 0;
    while (xor_val > 0) {
        xor_val &= (xor_val - 1);
        dist++;
    }
    return dist;
}

int main() {
    int x = 1, y = 4; // 1 = 0001, 4 = 0100 -> dist = 2
    printf("--- Hamming Distance Engine ---\n");
    printf("Hamming Distance between %d and %d = %d\n", x, y, hamming_distance(x, y));
    return 0;
}
