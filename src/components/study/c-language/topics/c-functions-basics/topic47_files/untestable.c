// untestable.c – Function with global state and I/O, hard to test
#include <stdio.h>

int total = 0;  // Global variable – hidden dependency

void updateTotal(int amount) {
    total += amount;                      // Modifies global state
    printf("Total is now: %d\n", total);  // I/O – side effect
}

int main() {
    updateTotal(10);
    updateTotal(5);
    updateTotal(-3);
    return 0;
}