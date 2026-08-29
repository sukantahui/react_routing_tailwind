#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

void bitset_sieve(int max_n) {
    int num_bytes = (max_n + 7) / 8;
    unsigned char *sieve = (unsigned char*)calloc(num_bytes, sizeof(unsigned char));

    printf("--- Bitset Sieve of Eratosthenes (Memory-Optimized) ---\nPrimes up to %d: ", max_n);
    for (int p = 2; p * p <= max_n; p++) {
        if (!(sieve[p / 8] & (1 << (p % 8)))) {
            for (int i = p * p; i <= max_n; i += p) {
                sieve[i / 8] |= (1 << (i % 8));
            }
        }
    }

    for (int p = 2; p <= max_n; p++) {
        if (!(sieve[p / 8] & (1 << (p % 8)))) printf("%d ", p);
    }
    printf("\n");
    free(sieve);
}

int main() {
    bitset_sieve(30);
    return 0;
}
