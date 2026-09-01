#include <stdio.h>
#include <stdlib.h>

// Simulate a function that allocates but forgets to free on error path
int process_data(int fail) {
    int *data = (int*)malloc(100 * sizeof(int));
    if (!data) return -1;

    printf("Allocated at %p\n", (void*)data);

    if (fail) {
        printf("Error path taken, but forgot to free\n");
        return -1;   // leak here!
    }

    free(data);
    printf("Freed %p\n", (void*)data);
    return 0;
}

int main() {
    printf("Call with success:\n");
    process_data(0);
    printf("\nCall with failure (leak):\n");
    process_data(1);
    return 0;
}