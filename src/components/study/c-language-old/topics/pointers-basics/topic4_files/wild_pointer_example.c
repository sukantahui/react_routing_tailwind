#include <stdio.h>

int main() {
    int *wild_ptr;   // uninitialized – contains garbage
    // Dereferencing wild_ptr is undefined behavior.
    // It might crash, corrupt data, or sometimes seem to work.
    printf("wild_ptr points to: %p\n", (void*)wild_ptr);

    // The following line is DANGEROUS – uncomment at your own risk!
    // *wild_ptr = 10;  // may cause segmentation fault

    // Always initialize pointers
    int safe_var = 99;
    int *safe_ptr = &safe_var;
    printf("safe_ptr points to %p, value = %d\n", (void*)safe_ptr, *safe_ptr);

    return 0;
}