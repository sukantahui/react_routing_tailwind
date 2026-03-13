#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};

    printf("Array elements and their addresses:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\t address: %p\n", i, arr[i], (void*)&arr[i]);
    }

    // Show the difference between consecutive addresses
    printf("\nSize of int on this system: %zu bytes\n", sizeof(int));
    printf("Address of arr[0]: %p\n", (void*)&arr[0]);
    printf("Address of arr[1]: %p\n", (void*)&arr[1]);
    printf("Difference: %ld bytes\n", (char*)&arr[1] - (char*)&arr[0]);

    return 0;
}