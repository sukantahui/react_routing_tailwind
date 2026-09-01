#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;  // ptr points to first element

    // Access using array indexing
    printf("Using array indexing:\n");
    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d\n", i, arr[i]);
    }

    // Access using pointer arithmetic
    printf("\nUsing pointer arithmetic:\n");
    for (int i = 0; i < 5; i++) {
        printf("*(ptr + %d) = %d\n", i, *(ptr + i));
    }

    // Show equivalence: arr[2] vs *(arr+2)
    printf("\narr[2] = %d, *(arr+2) = %d\n", arr[2], *(arr + 2));

    return 0;
}