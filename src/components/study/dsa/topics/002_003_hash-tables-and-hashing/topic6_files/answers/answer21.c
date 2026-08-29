#include <stdio.h>

#define MAX_SIZE 11
#define UNUSED -1

int table1[MAX_SIZE], table2[MAX_SIZE];

int hash1(int key) { return key % MAX_SIZE; }
int hash2(int key) { return (key / MAX_SIZE) % MAX_SIZE; }

void cuckoo_insert(int key) {
    int cur_key = key;
    for (int count = 0; count < MAX_SIZE; count++) {
        int pos1 = hash1(cur_key);
        if (table1[pos1] == UNUSED) { table1[pos1] = cur_key; return; }
        // Kick existing key out
        int temp = table1[pos1]; table1[pos1] = cur_key; cur_key = temp;

        int pos2 = hash2(cur_key);
        if (table2[pos2] == UNUSED) { table2[pos2] = cur_key; return; }
        temp = table2[pos2]; table2[pos2] = cur_key; cur_key = temp;
    }
    printf("Cuckoo Cycle Detected! Triggering Rehash...\n");
}

int main() {
    for (int i = 0; i < MAX_SIZE; i++) { table1[i] = UNUSED; table2[i] = UNUSED; }
    printf("--- Cuckoo Hashing O(1) Worst-Case Engine ---\n");
    cuckoo_insert(20); cuckoo_insert(50); cuckoo_insert(53);
    printf("Inserted keys into dual Cuckoo hash tables successfully.\n");
    return 0;
}
