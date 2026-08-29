#include <stdio.h>
#include <stdbool.h>

#define SIZE 7
#define EMPTY -1

int table[SIZE];

void init_table() { for (int i = 0; i < SIZE; i++) table[i] = EMPTY; }

void insert_linear(int key) {
    int idx = key % SIZE;
    int i = 0;
    while (table[(idx + i) % SIZE] != EMPTY && i < SIZE) i++;
    if (i < SIZE) table[(idx + i) % SIZE] = key;
    else printf("Table Full!\n");
}

int main() {
    init_table();
    printf("--- Open Addressing Linear Probing ---\n");
    insert_linear(10); insert_linear(17); insert_linear(24);
    for (int j = 0; j < SIZE; j++) printf("Bucket %d: %d\n", j, table[j]);
    return 0;
}
