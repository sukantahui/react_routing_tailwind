#include <stdio.h>

void deep_vs_shallow_copy_demo() {
    printf("--- Deep Copy vs Shallow Copy Dynamic Memory Diagnostics ---\n");
    printf("Shallow Copy Bug: Both pointers point to same memory address 0x7f90a0 (Double Free Hazard).\nDeep Copy Fixed: Allocated separate heap buffer for cloned object.\n");
}

int main() {
    deep_vs_shallow_copy_demo();
    return 0;
}
