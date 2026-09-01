#include <stdio.h>

// BAD: returns pointer to local variable (stack)
int* badFunction() {
    int local = 100;
    return &local; // Dangling pointer as soon as function returns
}

// GOOD: returns pointer to heap memory (caller must free)
int* goodFunction() {
    int *ptr = (int*)malloc(sizeof(int));
    if (ptr) *ptr = 200;
    return ptr;
}

int main() {
    int *bad = badFunction();
    // Using bad is dangerous — undefined behavior
    printf("Bad value: %d\n", *bad); // May crash or print garbage

    int *good = goodFunction();
    if (good) {
        printf("Good value: %d\n", *good);
        free(good);
        good = NULL;
    }
    return 0;
}