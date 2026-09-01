#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // ptr points to first element

    printf("Using array indexing:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    printf("\nUsing pointer arithmetic:\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr + %d) = %d\n", i, *(ptr + i));
    }

    // Show that ptr + i gives the address of arr[i]
    printf("\nAddresses:\n");
    printf("ptr + 2 = %p, &arr[2] = %p\n", (void*)(ptr + 2), (void*)&arr[2]);

    return 0;
}