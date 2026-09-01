#include <stdio.h>

int main() {
    // Complex pointer declarations
    int arr[5] = {10, 20, 30, 40, 50};
    
    // 1. Array of pointers
    int *ptrArr[3];
    int x=1, y=2, z=3;
    ptrArr[0] = &x;
    ptrArr[1] = &y;
    ptrArr[2] = &z;
    
    // 2. Pointer to array
    int (*ptrToArr)[5] = &arr;
    
    // 3. Array of function pointers (simple example)
    void (*funcArr[2])();  // Array of 2 function pointers
    
    printf("=== Complex Pointer Declarations ===\n");
    
    printf("\n1. Array of pointers:\n");
    for(int i = 0; i < 3; i++) {
        printf("ptrArr[%d] points to: %d\n", i, *ptrArr[i]);
    }
    
    printf("\n2. Pointer to array:\n");
    printf("Accessing through pointer to array:\n");
    for(int i = 0; i < 5; i++) {
        printf("(*ptrToArr)[%d] = %d\n", i, (*ptrToArr)[i]);
    }
    
    // Demonstrating the difference
    printf("\n=== Difference Between int *arr[5] and int (*arr)[5] ===\n");
    printf("sizeof(ptrArr): %zu (array of 3 pointers)\n", sizeof(ptrArr));
    printf("sizeof(ptrToArr): %zu (single pointer)\n", sizeof(ptrToArr));
    
    return 0;
}