#include <stdio.h>

// Safe expression macro
#define SQUARE_SAFE(x) ((x) * (x))

// Safe multi-statement macro
#define SWAP(a, b) do { \
    int temp = (a);      \
    (a) = (b);           \
    (b) = temp;          \
} while(0)

int main() {
    int x = 1+2;
    printf("SQUARE_SAFE(1+2) = %d\n", SQUARE_SAFE(1+2)); // 9, correct
    
    int p = 10, q = 20;
    SWAP(p, q);
    printf("After swap: p=%d, q=%d\n", p, q);
    
    // SWAP works correctly in if-else
    int flag = 0;
    if (flag)
        SWAP(p, q);   // only one statement
    else
        printf("No swap\n");
    
    return 0;
}