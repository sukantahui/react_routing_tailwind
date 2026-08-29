#include <stdio.h>
#include <stdlib.h>

static int total_allocations = 0;
static int total_frees = 0;

void* custom_malloc(size_t size) {
    total_allocations++;
    return malloc(size);
}

void custom_free(void *ptr) {
    if (ptr) {
        total_frees++;
        free(ptr);
    }
}

int main() {
    int *data = (int*)custom_malloc(5 * sizeof(int));
    for (int i = 0; i < 5; i++) data[i] = (i + 1) * 10;

    custom_free(data);

    printf("--- Memory Leak Diagnostics ---\nTotal Allocations: %d\nTotal Frees: %d\nMemory Leak Status: %s\n",
           total_allocations, total_frees, (total_allocations == total_frees) ? "NO LEAKS DETECTED" : "LEAK DETECTED");
    return 0;
}
