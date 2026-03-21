#include <stdio.h>

int main() {
    // Wild pointer: never initialized
    int *wild;

    // Print its value (the random address)
    printf("Wild pointer contains: %p\n", (void*)wild);

    // Attempt to dereference (dangerous)
    // Uncommenting the next line will likely cause a segmentation fault
    // printf("Value at wild: %d\n", *wild);

    // Proper initialization
    int x = 100;
    int *safe = &x;
    printf("Safe pointer: %p, value: %d\n", (void*)safe, *safe);

    return 0;
}