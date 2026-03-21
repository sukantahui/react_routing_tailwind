#include <stdio.h>
#include <stdlib.h>

int global_init = 10;     // .data segment
int global_uninit;         // .bss segment

int main() {
    int local = 5;         // stack
    static int static_var = 20; // .data (initialized static)
    static int static_uninit;    // .bss

    int *heap_ptr = (int*)malloc(sizeof(int)); // heap
    if (heap_ptr) {
        *heap_ptr = 42;
        printf("heap: %p\n", (void*)heap_ptr);
        free(heap_ptr);
    }

    printf("global_init: %p\n", (void*)&global_init);
    printf("global_uninit: %p\n", (void*)&global_uninit);
    printf("local: %p\n", (void*)&local);
    printf("static_var: %p\n", (void*)&static_var);
    printf("static_uninit: %p\n", (void*)&static_uninit);
    return 0;
}