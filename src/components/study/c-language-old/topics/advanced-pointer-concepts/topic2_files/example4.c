#include <stdio.h>

int main() {
    int var = 42;
    int another = 100;
    
    // 1. Pointer to constant int (can't change value pointed to)
    const int *ptrToConst = &var;
    // *ptrToConst = 50;  // ERROR! Can't modify through pointer
    ptrToConst = &another;  // OK - can change where pointer points
    
    // 2. Constant pointer (can't change where it points)
    int *const constPtr = &var;
    *constPtr = 50;  // OK - can modify value
    // constPtr = &another;  // ERROR! Can't change pointer itself
    
    // 3. Constant pointer to constant int (can't change either)
    const int *const constPtrToConst = &var;
    // *constPtrToConst = 50;  // ERROR!
    // constPtrToConst = &another;  // ERROR!
    
    printf("=== const Pointer Variations ===\n");
    printf("ptrToConst points to: %d (can change pointer, not value)\n", *ptrToConst);
    printf("constPtr points to: %d (can change value, not pointer)\n", *constPtr);
    printf("constPtrToConst points to: %d (can't change either)\n", *constPtrToConst);
    
    // Practical use: function parameters
    printf("\n=== Practical const Usage ===\n");
    printf("Use 'const int *' for parameters when function shouldn't modify data\n");
    printf("Use 'int *const' for parameters when pointer shouldn't be reassigned\n");
    
    return 0;
}