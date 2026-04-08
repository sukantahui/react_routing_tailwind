#include <stdio.h>
#include <stdlib.h>

int main() {
    // Stack allocation
    int stackVar = 10;
    int stackArray[5] = {1, 2, 3, 4, 5};
    
    // Heap allocation
    int *heapVar = (int*)malloc(sizeof(int));
    if (heapVar == NULL) {
        printf("Memory allocation failed!\n");
        return 1;
    }
    *heapVar = 20;
    
    int *heapArray = (int*)malloc(5 * sizeof(int));
    if (heapArray == NULL) {
        printf("Memory allocation failed!\n");
        free(heapVar);
        return 1;
    }
    
    for (int i = 0; i < 5; i++) {
        heapArray[i] = (i + 1) * 10;
    }
    
    printf("Stack Variable: %d at address %p\n", stackVar, &stackVar);
    printf("Heap Variable: %d at address %p\n", *heapVar, heapVar);
    printf("Heap Array: ");
    for (int i = 0; i < 5; i++) {
        printf("%d ", heapArray[i]);
    }
    printf("\n");
    
    // IMPORTANT: Free heap memory!
    free(heapVar);
    free(heapArray);
    heapVar = NULL;
    heapArray = NULL;
    
    return 0;
}