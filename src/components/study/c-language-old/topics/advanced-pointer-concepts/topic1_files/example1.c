#include <stdio.h>

int main() {
    int var = 42;           // Regular integer
    int *ptr = &var;        // Single pointer - stores address of var
    int **dptr = &ptr;      // Double pointer - stores address of ptr
    
    printf("=== Double Pointer Demonstration ===\n\n");
    
    printf("Value of var: %d\n", var);
    printf("Address of var: %p\n\n", &var);
    
    printf("Value of ptr (address stored): %p\n", ptr);
    printf("Address of ptr: %p\n", &ptr);
    printf("Value pointed by ptr (*ptr): %d\n\n", *ptr);
    
    printf("Value of dptr (address stored): %p\n", dptr);
    printf("Address of dptr: %p\n", &dptr);
    printf("Value pointed by dptr (*dptr): %p\n", *dptr);
    printf("Value pointed by *dptr (**dptr): %d\n\n", **dptr);
    
    // Modifying value through double pointer
    **dptr = 100;
    printf("After **dptr = 100:\n");
    printf("var = %d\n", var);
    
    // Modifying pointer through double pointer
    int newVar = 999;
    *dptr = &newVar;
    printf("\nAfter *dptr = &newVar:\n");
    printf("ptr now points to: %d\n", *ptr);
    printf("**dptr = %d\n", **dptr);
    
    return 0;
}