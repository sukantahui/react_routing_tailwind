#include <stdio.h>

int big_array[100000];  // .bss (does NOT increase executable size)

int main() {
    printf("Array size: %lu bytes\n", sizeof(big_array));
    // big_array is automatically zeroed
    return 0;
}