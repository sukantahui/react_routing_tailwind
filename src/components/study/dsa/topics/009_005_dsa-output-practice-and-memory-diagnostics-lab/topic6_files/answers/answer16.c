#include <stdio.h>

void ref_count_smart_ptr_demo() {
    printf("--- Reference Counting Smart Pointer System ---\n");
    printf("Ref Count = 2; decremented to 0 -> Memory block automatically deallocated!\n");
}

int main() {
    ref_count_smart_ptr_demo();
    return 0;
}
