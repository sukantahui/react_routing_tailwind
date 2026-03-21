#include <stdio.h>

int main() {
    int arr[5] = {10, 20, 30, 40, 50};
    int *ptr = arr;   // ptr points to arr[0]

    // Array notation
    printf("arr[2] = %d\n", arr[2]);

    // Pointer arithmetic
    printf("*(ptr+2) = %d\n", *(ptr+2));

    // Both work because arr decays to pointer in arr[2] -> *(arr+2)
    printf("*(arr+2) = %d\n", *(arr+2));

    // Difference: sizeof
    printf("sizeof(arr) = %zu\n", sizeof(arr));   // 20
    printf("sizeof(ptr) = %zu\n", sizeof(ptr));   // 8 (on 64-bit)

    // Difference: &arr vs &ptr
    printf("&arr = %p\n", (void*)&arr);     // address of whole array
    printf("&ptr = %p\n", (void*)&ptr);     // address of pointer variable

    return 0;
}