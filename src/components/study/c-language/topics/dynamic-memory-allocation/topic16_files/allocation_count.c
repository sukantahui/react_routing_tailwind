#include <stdio.h>
#include <stdlib.h>

static int alloc_count = 0;
static int free_count = 0;

void* my_malloc(size_t size) {
    void *p = malloc(size);
    alloc_count++;
    fprintf(stderr, "[DEBUG] malloc(%zu) = %p (total allocs: %d)\n", 
            size, p, alloc_count);
    return p;
}

void my_free(void *p) {
    free_count++;
    fprintf(stderr, "[DEBUG] free(%p) (total frees: %d)\n", p, free_count);
    free(p);
}

int main() {
    int *a = my_malloc(sizeof(int));
    int *b = my_malloc(sizeof(int));
    int *c = my_malloc(sizeof(int));

    my_free(a);
    my_free(b);
    // forget to free c -> leak

    if (alloc_count != free_count)
        fprintf(stderr, "[WARNING] Memory leak detected: %d allocations, %d frees\n",
                alloc_count, free_count);
    else
        printf("No leaks detected\n");

    return 0;
}