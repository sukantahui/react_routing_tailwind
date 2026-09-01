#include <stdio.h>
#include <stdlib.h>

// This WON'T work - passes pointer by value
void badAllocate(int *ptr) {
    ptr = (int*)malloc(sizeof(int));
    if (ptr != NULL) {
        *ptr = 100;
    }
}

// This works - passes pointer to pointer
void goodAllocate(int **ptr) {
    *ptr = (int*)malloc(sizeof(int));
    if (*ptr != NULL) {
        **ptr = 100;
    }
}

// Function to modify pointer value
void modifyPointer(int **ptr, int newValue) {
    if (*ptr != NULL) {
        **ptr = newValue;
    }
}

// Function to set pointer to NULL after freeing
void safeFree(int **ptr) {
    if (ptr != NULL && *ptr != NULL) {
        free(*ptr);
        *ptr = NULL;  // Important! Prevents dangling pointer
    }
}

int main() {
    int *ptr = NULL;
    
    printf("=== Modifying Pointers in Functions ===\n\n");
    
    // This fails - ptr remains NULL
    badAllocate(ptr);
    if (ptr == NULL) {
        printf("badAllocate failed! ptr is still NULL\n");
    }
    
    // This works - ptr gets allocated memory
    goodAllocate(&ptr);
    if (ptr != NULL) {
        printf("goodAllocate succeeded! *ptr = %d\n", *ptr);
    }
    
    // Modify the value
    modifyPointer(&ptr, 250);
    printf("After modifyPointer: *ptr = %d\n", *ptr);
    
    // Safe free sets pointer to NULL
    safeFree(&ptr);
    if (ptr == NULL) {
        printf("After safeFree: ptr is NULL (safe!)\n");
    }
    
    return 0;
}