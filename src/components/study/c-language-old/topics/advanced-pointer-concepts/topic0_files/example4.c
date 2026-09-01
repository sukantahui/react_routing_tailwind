#include <stdio.h>

int main() {
    // Pointers with different data types
    int intVar = 42;
    float floatVar = 3.14;
    char charVar = 'A';
    double doubleVar = 3.14159265359;
    
    int *intPtr = &intVar;
    float *floatPtr = &floatVar;
    char *charPtr = &charVar;
    double *doublePtr = &doubleVar;
    
    printf("Pointer sizes on this system:\n");
    printf("int* size: %zu bytes\n", sizeof(intPtr));
    printf("float* size: %zu bytes\n", sizeof(floatPtr));
    printf("char* size: %zu bytes\n", sizeof(charPtr));
    printf("double* size: %zu bytes\n", sizeof(doublePtr));
    
    printf("\nPointer arithmetic demonstration:\n");
    printf("intPtr: %p\n", intPtr);
    printf("intPtr + 1: %p (adds %zu bytes)\n", intPtr + 1, sizeof(int));
    
    printf("charPtr: %p\n", charPtr);
    printf("charPtr + 1: %p (adds %zu byte)\n", charPtr + 1, sizeof(char));
    
    printf("doublePtr: %p\n", doublePtr);
    printf("doublePtr + 1: %p (adds %zu bytes)\n", doublePtr + 1, sizeof(double));
    
    return 0;
}