#include <stdio.h>

int multiply(int a, int b) { return a * b; }
int add(int a, int b) { return a + b; }

int main() {
    int (*ptr)(int, int) = multiply;
    
    // Direct call
    printf("Direct: multiply(4,5) = %d\n", multiply(4,5));
    
    // Pointer call
    printf("Pointer: ptr(4,5) = %d\n", ptr(4,5));
    
    // Array of function pointers
    int (*ops[2])(int, int) = {multiply, add};
    printf("ops[0](6,7) = %d (multiply)\n", ops[0](6,7));
    printf("ops[1](6,7) = %d (add)\n", ops[1](6,7));
    
    return 0;
}