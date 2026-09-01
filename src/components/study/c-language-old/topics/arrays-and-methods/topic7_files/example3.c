#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr1 = &arr[1];  // points to 20
    int *ptr2 = &arr[4];  // points to 50

    // Subtracting pointers gives number of elements between them
    ptrdiff_t diff = ptr2 - ptr1;
    printf("ptr2 - ptr1 = %td (elements between)\n", diff);
    printf("ptr2 points to %d, ptr1 points to %d\n", *ptr2, *ptr1);

    // Using pointer subtraction to find index
    int *start = arr;
    int index = ptr1 - start;
    printf("ptr1 is at index %d\n", index);

    return 0;
}