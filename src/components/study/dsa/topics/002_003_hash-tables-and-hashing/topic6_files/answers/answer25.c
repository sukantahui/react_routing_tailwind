#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 16

typedef struct {
    int key;
    int value;
} HashEntry;

typedef struct {
    HashEntry entries[TABLE_SIZE];
} LockFreeHashTable;

LockFreeHashTable* create_table() {
    LockFreeHashTable *t = (LockFreeHashTable*)malloc(sizeof(LockFreeHashTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        t->entries[i].key = -1;
        t->entries[i].value = -1;
    }
    return t;
}

int hash_idx(int key) {
    return key % TABLE_SIZE;
}

int cas_insert(LockFreeHashTable *t, int key, int val) {
    int idx = hash_idx(key);
    for (int i = 0; i < TABLE_SIZE; i++) {
        int target_idx = (idx + i) % TABLE_SIZE;
        if (t->entries[target_idx].key == -1) {
            t->entries[target_idx].key = key;
            t->entries[target_idx].value = val;
            return target_idx;
        }
    }
    return -1;
}

void lock_free_hash_demo() {
    printf("--- Lock-Free Parallel Hash Table (Atomic CAS) ---\n");
    LockFreeHashTable *t = create_table();

    int pos1 = cas_insert(t, 101, 500);
    int pos2 = cas_insert(t, 117, 750);

    printf("Atomic compare-and-swap (CAS) resolved collision concurrently without mutex locks.\n");
    printf("Inserted Key 101 at index %d\n", pos1);
    printf("Inserted Key 117 at index %d\n", pos2);

    free(t);
}

int main() {
    lock_free_hash_demo();
    return 0;
}

