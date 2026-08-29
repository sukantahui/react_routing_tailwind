#include <stdio.h>
#include <stdlib.h>

#define TABLE_SIZE 7

typedef struct {
    int key;
    int psl; // Probe Sequence Length
    int occupied;
} Slot;

typedef struct {
    Slot slots[TABLE_SIZE];
} RobinHoodTable;

RobinHoodTable* create_rh_table() {
    RobinHoodTable *t = (RobinHoodTable*)malloc(sizeof(RobinHoodTable));
    for (int i = 0; i < TABLE_SIZE; i++) {
        t->slots[i].key = -1;
        t->slots[i].psl = 0;
        t->slots[i].occupied = 0;
    }
    return t;
}

int hash_func(int key) {
    return key % TABLE_SIZE;
}

void rh_insert(RobinHoodTable *t, int key) {
    Slot new_slot = {key, 0, 1};
    int idx = hash_func(key);

    while (1) {
        if (!t->slots[idx].occupied) {
            t->slots[idx] = new_slot;
            return;
        }

        if (new_slot.psl > t->slots[idx].psl) {
            Slot temp = t->slots[idx];
            t->slots[idx] = new_slot;
            new_slot = temp;
        }

        idx = (idx + 1) % TABLE_SIZE;
        new_slot.psl++;
    }
}

void robin_hood_demo() {
    printf("--- Robin Hood Hashing Engine ---\n");
    RobinHoodTable *t = create_rh_table();

    rh_insert(t, 14);
    rh_insert(t, 21);
    rh_insert(t, 28);

    printf("Robin Hood probing steals slots from rich entries to equalize probe distance.\n");
    for (int i = 0; i < TABLE_SIZE; i++) {
        if (t->slots[i].occupied)
            printf("Slot %d: Key = %d (PSL = %d)\n", i, t->slots[i].key, t->slots[i].psl);
        else
            printf("Slot %d: EMPTY\n", i);
    }
    free(t);
}

int main() {
    robin_hood_demo();
    return 0;
}

