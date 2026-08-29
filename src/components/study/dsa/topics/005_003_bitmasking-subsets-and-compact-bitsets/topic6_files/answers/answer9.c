#include <stdio.h>

#define PERM_READ   (1 << 0)
#define PERM_WRITE  (1 << 1)
#define PERM_EXEC   (1 << 2)

void permissions_demo(int user_perm) {
    printf("--- Bitmask Permissions Ledger ---\nUser Bitmask: %d\n", user_perm);
    printf("Read Permission : %s\n", (user_perm & PERM_READ) ? "ALLOWED" : "DENIED");
    printf("Write Permission: %s\n", (user_perm & PERM_WRITE) ? "ALLOWED" : "DENIED");
    printf("Exec Permission : %s\n", (user_perm & PERM_EXEC) ? "ALLOWED" : "DENIED");
}

int main() {
    int user = PERM_READ | PERM_EXEC; // Read + Exec
    permissions_demo(user);
    return 0;
}
