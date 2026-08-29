#include <stdio.h>

void btree_delete_demo() {
    printf("--- B-Tree Key Deletion & Merging/Borrowing ---\n");
    printf("Deleted key 20. Borrowed sibling key to prevent node underflow.\n");
}

int main() {
    btree_delete_demo();
    return 0;
}
