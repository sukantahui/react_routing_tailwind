#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 7

typedef struct {
    int key;
    int value;
    int isOccupied; // 0 = Empty, 1 = Occupied, 2 = Deleted (Tombstone)
} HashEntry;

int hash1(int key) {
    return key % TABLE_SIZE;
}

int hash2(int key) {
    return 5 - (key % 5);
}

void initTable(HashEntry table[]) {
    for (int i = 0; i < TABLE_SIZE; i++) {
        table[i].isOccupied = 0;
    }
}

// Linear Probing Insertion: index = (h(k) + i) % SIZE
void insertLinear(HashEntry table[], int key, int value) {
    int index = hash1(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probeIndex = (index + i) % TABLE_SIZE;
        if (table[probeIndex].isOccupied == 0 || table[probeIndex].isOccupied == 2) {
            table[probeIndex].key = key;
            table[probeIndex].value = value;
            table[probeIndex].isOccupied = 1;
            printf("[LINEAR PROBE] Key %d inserted at index %d after %d probe(s)\n", key, probeIndex, i + 1);
            return;
        }
    }
    printf("[HASH FULL] Cannot insert key %d\n", key);
}

// Double Hashing Insertion: index = (h1(k) + i * h2(k)) % SIZE
void insertDouble(HashEntry table[], int key, int value) {
    int h1 = hash1(key);
    int h2 = hash2(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int probeIndex = (h1 + i * h2) % TABLE_SIZE;
        if (table[probeIndex].isOccupied == 0 || table[probeIndex].isOccupied == 2) {
            table[probeIndex].key = key;
            table[probeIndex].value = value;
            table[probeIndex].isOccupied = 1;
            printf("[DOUBLE HASH] Key %d inserted at index %d after %d probe(s)\n", key, probeIndex, i + 1);
            return;
        }
    }
    printf("[HASH FULL] Cannot insert key %d\n", key);
}

void printTable(HashEntry table[], const char *title) {
    printf("\n--- %s ---\n", title);
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (table[i].isOccupied == 1) {
            printf("Slot [%d]: Key %d => Value %d\n", i, table[i].key, table[i].value);
        } else {
            printf("Slot [%d]: EMPTY\n", i);
        }
    }
    printf("----------------------------\n\n");
}

int main() {
    printf("=== Open Addressing Collision Resolution in C ===\n\n");
    HashEntry table1[TABLE_SIZE];
    initTable(table1);

    insertLinear(table1, 10, 100);
    insertLinear(table1, 17, 200); // Collision at index 3 -> probes index 4
    insertLinear(table1, 24, 300); // Collision at index 3 -> probes index 5

    printTable(table1, "Linear Probing Table");

    HashEntry table2[TABLE_SIZE];
    initTable(table2);

    insertDouble(table2, 10, 100);
    insertDouble(table2, 17, 200);
    insertDouble(table2, 24, 300);

    printTable(table2, "Double Hashing Table");

    return 0;
}
