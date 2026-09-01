#include <stdio.h>
#include <stdlib.h>

int main() {
    // Try to allocate a huge block that likely fails
    int *big = (int*)malloc(1024 * 1024 * 1024); // 1 GB
    // BAD: No NULL check! The next line will crash.
    *big = 42;
    printf("%d\n", *big);
    free(big);
    return 0;
}