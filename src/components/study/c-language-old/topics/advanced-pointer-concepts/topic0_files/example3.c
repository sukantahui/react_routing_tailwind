#include <stdio.h>

int* dangerousFunction() {
    int localVar = 999;
    return &localVar;  // DANGER! Returning address of local variable
}

int main() {
    // MISTAKE 1: Uninitialized pointer
    int *uninitPtr;
    // printf("%d", *uninitPtr);  // CRASH! Undefined behavior
    
    // MISTAKE 2: Dereferencing NULL
    int *nullPtr = NULL;
    // *nullPtr = 5;  // CRASH! Segmentation fault
    
    // MISTAKE 3: Returning pointer to local variable
    int *badPtr = dangerousFunction();
    printf("Dangerous value: %d\n", *badPtr);  // Undefined behavior!
    
    // MISTAKE 4: Forgetting & when assigning pointer
    int value = 100;
    int *wrongPtr = value;  // Wrong! Should be &value
    printf("Wrong pointer: %p\n", wrongPtr);  // Prints 100 as address
    
    // CORRECT way:
    int *correctPtr = &value;
    printf("Correct pointer: %p\n", correctPtr);
    
    return 0;
}