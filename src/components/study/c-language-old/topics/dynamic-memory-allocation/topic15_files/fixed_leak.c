#include <stdio.h>
#include <stdlib.h>

void good_function() {
    int *p = (int*)malloc(sizeof(int));
    if (!p) return;
    *p = 42;
    printf("Value: %d\n", *p);
    free(p);  // Properly freed
}

int main() {
    good_function();
    printf("No leak\n");
    return 0;
}