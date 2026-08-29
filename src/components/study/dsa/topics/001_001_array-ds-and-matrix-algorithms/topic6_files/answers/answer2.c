#include <stdio.h>

int main() {
    int arr[5] = {100, 200, 300, 400, 500};
    int *base_ptr = arr;

    printf("--- Physical Memory Address & Offset Calculator ---\n");
    printf("Base Address (arr[0]): %p\n", (void*)base_ptr);
    printf("Element Size: %zu bytes\n\n", sizeof(int));

    for (int i = 0; i < 5; i++) {
        int *calculated_addr = base_ptr + i;
        unsigned long offset = i * sizeof(int);

        printf("Index %d:\n", i);
        printf("  Subscript Notation arr[%d]   = %d\n", i, arr[i]);
        printf("  Pointer Offset *(base + %d)  = %d\n", i, *(base_ptr + i));
        printf("  Physical Memory Address    = %p\n", (void*)calculated_addr);
        printf("  Calculated Byte Offset     = Base + %lu bytes\n\n", offset);
    }

    return 0;
}
