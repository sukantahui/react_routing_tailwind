#include <stdio.h>

#define SIZE 7
#define EMPTY -1

int table[SIZE];

void insert_quadratic(int key) {
    int hash_idx = key % SIZE;
    int i = 0;
    while (table[(hash_idx + i * i) % SIZE] != EMPTY && i < SIZE) i++;
    if (i < SIZE) table[(hash_idx + i * i) % SIZE] = key;
}

int main() {
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
    printf("--- Open Addressing Quadratic Probing ---\n");
    insert_quadratic(10); insert_quadratic(17); insert_quadratic(24);
    for (int j = 0; j < SIZE; j++) printf("Bucket %d: %d\n", j, table[j]);
    return 0;
}
