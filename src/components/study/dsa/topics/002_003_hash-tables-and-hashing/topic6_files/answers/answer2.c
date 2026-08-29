#include <stdio.h>

#define TABLE_SIZE 11 // Prime table size

int hash_division(int key) {
    return key % TABLE_SIZE;
}

int main() {
    printf("--- Division Method Hash Function ---\n");
    int keys[] = {25, 42, 99, 104};
    for (int i = 0; i < 4; i++) {
        printf("Key %3d -> Hash Index = %d\n", keys[i], hash_division(keys[i]));
    }
    return 0;
}
