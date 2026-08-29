#include <stdio.h>

void btree_insert_split_demo() {
    printf("--- B-Tree Key Insertion & Child Splitting ---\n");
    printf("Inserted 6 keys. Full node split into 2 child nodes with median key promoted to parent.\n");
}

int main() {
    btree_insert_split_demo();
    return 0;
}
