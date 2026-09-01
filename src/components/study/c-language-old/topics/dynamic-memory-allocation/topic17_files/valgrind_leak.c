#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int*)malloc(100 * sizeof(int));
    // No free — memory leak
    printf("Leaked memory at %p\n", (void*)p);
    return 0;
}