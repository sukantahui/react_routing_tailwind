#include <stdio.h>

int main() {
    int arr[5] = {2, 4, 6, 8, 10};
    int *ptr = arr;

    // Traverse using pointer increment
    printf("Traversing with ptr++:\n");
    for (int i = 0; i < 5; i++) {
        printf("Current element: %d, address: %p\n", *ptr, (void*)ptr);
        ptr++;  // move to next element (scales by sizeof(int))
    }

    // After loop, ptr points one past the end
    printf("\nAfter loop, ptr points to: %p\n", (void*)ptr);

    // Reset pointer
    ptr = arr;
    printf("\nFirst element again: %d\n", *ptr);

    return 0;
}