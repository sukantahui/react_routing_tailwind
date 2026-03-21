#include <stdio.h>

void counter() {
    static int count = 0;  // stored in .data, retains value between calls
    count++;
    printf("Called %d times\n", count);
}

int main() {
    counter(); // 1
    counter(); // 2
    counter(); // 3
    return 0;
}