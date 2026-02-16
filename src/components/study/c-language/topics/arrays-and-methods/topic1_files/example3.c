#include <stdio.h>

int main() {
    int arr[5] = {2, 4, 6, 8, 10};

    // Array name 'arr' is a pointer to the first element
    printf("arr = %p, &arr[0] = %p\n", (void*)arr, (void*)&arr[0]);

    // arr + 1 gives address of second element
    printf("arr + 1 = %p, &arr[1] = %p\n", (void*)(arr + 1), (void*)&arr[1]);

    // sizeof works on the whole array only in this scope
    printf("Size of whole array: %zu bytes\n", sizeof(arr));
    printf("Number of elements: %zu\n", sizeof(arr) / sizeof(arr[0]));

    return 0;
}