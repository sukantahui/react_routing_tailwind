#include <stdio.h>

int main() {
    int x = 10;
    printf("Outer x: %d\n", x);

    if (x > 5) {
        int block_var = 20;   // local to this block
        printf("Inside block: block_var = %d\n", block_var);
        int x = 30;            // shadows outer x (not recommended)
        printf("Inner x (shadows): %d\n", x);
    }

    // printf("block_var = %d\n", block_var); // ERROR: not in scope
    printf("Outer x after block: %d\n", x);   // still 10
    return 0;
}