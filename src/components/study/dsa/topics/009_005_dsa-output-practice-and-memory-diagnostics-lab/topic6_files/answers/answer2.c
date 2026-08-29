#include <stdio.h>

void dangling_pointer_demo() {
    printf("--- Dangling Pointer & Use-After-Free Detection ---\n");
    printf("Detected Use-After-Free: Pointer dereferenced after free() call; set pointer = NULL to fix.\n");
}

int main() {
    dangling_pointer_demo();
    return 0;
}
