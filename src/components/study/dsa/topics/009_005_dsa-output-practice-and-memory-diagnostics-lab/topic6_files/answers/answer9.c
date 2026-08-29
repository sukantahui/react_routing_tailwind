#include <stdio.h>

void uninitialized_pointer_demo() {
    printf("--- Wild Uninitialized Pointer Auditing ---\n");
    printf("Caught Wild Pointer: Uninitialized pointer `ptr` contains garbage RAM address!\n");
}

int main() {
    uninitialized_pointer_demo();
    return 0;
}
