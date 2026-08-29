#include <stdio.h>
#include <stdlib.h>
#include <stdbool.h>

typedef struct {
    unsigned int *bits;
    int size;
} BitArray;

BitArray* create_bit_array(int size) {
    BitArray *ba = (BitArray*)malloc(sizeof(BitArray));
    ba->size = size;
    int num_ints = (size + 31) / 32;
    ba->bits = (unsigned int*)calloc(num_ints, sizeof(unsigned int));
    return ba;
}

void set_bit_arr(BitArray *ba, int idx) {
    ba->bits[idx / 32] |= (1U << (idx % 32));
}

bool get_bit_arr(BitArray *ba, int idx) {
    return (ba->bits[idx / 32] & (1U << (idx % 32))) != 0;
}

int main() {
    BitArray *ba = create_bit_array(100);
    set_bit_arr(ba, 42);
    printf("--- Compact Dynamic Bitset Array ---\n");
    printf("Bit 42 value = %d\n", get_bit_arr(ba, 42) ? 1 : 0);
    printf("Bit 43 value = %d\n", get_bit_arr(ba, 43) ? 1 : 0);
    return 0;
}
