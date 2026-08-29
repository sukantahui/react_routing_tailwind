#include <stdio.h>
#include <math.h>

#define TABLE_SIZE 100
#define A 0.6180339887 // Knuth Multiplicative Constant (Golden Ratio - 1)

int hash_multiplication(int key) {
    double frac = key * A - (long)(key * A);
    return (int)(TABLE_SIZE * frac);
}

int main() {
    printf("--- Multiplication Method Hash Function ---\n");
    int keys[] = {123, 456, 789};
    for (int i = 0; i < 3; i++) {
        printf("Key %3d -> Hash Index = %d\n", keys[i], hash_multiplication(keys[i]));
    }
    return 0;
}
