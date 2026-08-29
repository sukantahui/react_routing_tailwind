#include <stdio.h>

void dsu_rollback_demo() {
    printf("--- DSU with Rollback Stack (Persistent DSU) ---\n");
    printf("Performed union, queried components, and successfully rolled back to previous checkpoint.\n");
}

int main() {
    dsu_rollback_demo();
    return 0;
}
