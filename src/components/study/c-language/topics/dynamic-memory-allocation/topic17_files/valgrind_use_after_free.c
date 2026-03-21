#include <stdio.h>
#include <stdlib.h>

int main() {
    int *p = (int*)malloc(sizeof(int));
    *p = 42;
    free(p);
    printf("Value after free: %d\n", *p);  // use after free
    return 0;
}