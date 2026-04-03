#include <stdio.h>

// Read-only parameter - function promises not to modify
void printValue(const int *ptr) {
    // *ptr = 100;  // ERROR! Can't modify const pointer target
    printf("Value: %d\n", *ptr);
    // ptr = NULL;  // OK - pointer itself can change (not const pointer)
}

// Constant pointer - can't change where it points
void modifyValue(int *const ptr, int newValue) {
    *ptr = newValue;  // OK - can modify value
    // ptr = NULL;    // ERROR! Can't change pointer itself
}

// Both constant - can't change pointer or value
void readOnly(const int *const ptr) {
    // *ptr = 100;    // ERROR!
    // ptr = NULL;    // ERROR!
    printf("Read-only value: %d\n", *ptr);
}

// Practical example: Safe string copy with const correctness
void safeCopy(char *dest, const char *src, size_t size) {
    // dest: can modify (output)
    // src: can't modify (input)
    if (dest == NULL || src == NULL) return;
    
    size_t i;
    for(i = 0; i < size - 1 && src[i] != '\0'; i++) {
        dest[i] = src[i];
    }
    dest[i] = '\0';
}

int main() {
    int var = 42;
    int another = 100;
    
    printf("=== const Pointer Parameters ===\n\n");
    
    // const int* - pointer to constant int
    const int *readOnlyPtr = &var;
    printValue(readOnlyPtr);
    
    // int* const - constant pointer
    int *const constPtr = &var;
    modifyValue(constPtr, 99);
    printf("After modifyValue: var = %d\n", var);
    
    // Practical string example
    char source[] = "Hello from Barrackpore CNAT!";
    char destination[50];
    
    safeCopy(destination, source, 50);
    printf("\nSafe copy result: '%s'\n", destination);
    
    printf("\nBest Practice: Use const for input parameters to show intent!\n");
    
    return 0;
}