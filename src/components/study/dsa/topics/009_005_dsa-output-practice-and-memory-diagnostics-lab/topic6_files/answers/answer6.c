#include <stdio.h>

void pointer_arithmetic_demo() {
    printf("--- Pointer Arithmetic vs Array Indexing Tracing ---\n");
    printf("*(ptr + 2) == arr[2] (Offset by 2 * sizeof(int) = 8 bytes in RAM).\n");
}

int main() {
    pointer_arithmetic_demo();
    return 0;
}
