#include <stdio.h>
#include <malloc.h>

int global_var = 100; // stored in data segment

void show_addresses() {
    int local_var = 200; // stored on stack
    static int static_var = 300; // stored in data segment
    int *heap_var = malloc(sizeof(int)); // stored on heap
    *heap_var = 400;

    printf("Global variable address: %p\n", (void*)&global_var);
    printf("Local variable address:  %p\n", (void*)&local_var);
    printf("Static variable address:  %p\n", (void*)&static_var);
    printf("Heap allocated address:   %p\n", (void*)heap_var);

    free(heap_var);
}

int main() {
    show_addresses();
    return 0;
}
