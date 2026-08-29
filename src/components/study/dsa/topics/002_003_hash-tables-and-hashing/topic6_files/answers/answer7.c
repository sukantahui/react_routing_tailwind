#include <stdio.h>

#define SIZE 7
#define PRIME 5
#define EMPTY -1

int table[SIZE];

int hash1(int key) { return key % SIZE; }
int hash2(int key) { return PRIME - (key % PRIME); }

void insert_double_hash(int key) {
    int h1 = hash1(key);
    int h2 = hash2(key);
    int i = 0;
    while (table[(h1 + i * h2) % SIZE] != EMPTY && i < SIZE) i++;
    if (i < SIZE) table[(h1 + i * h2) % SIZE] = key;
}

int main() {
    for (int i = 0; i < SIZE; i++) table[i] = EMPTY;
    printf("--- Double Hashing Collision Resolution ---\n");
    insert_double_hash(19); insert_double_hash(27); insert_double_hash(36);
    for (int j = 0; j < SIZE; j++) printf("Bucket %d: %d\n", j, table[j]);
    return 0;
}
