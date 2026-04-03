#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    // Declare a function pointer
    int (*funcPtr)(int, int);
    
    // Assign address of add function
    funcPtr = &add;   // or just 'add' (function name decays to address)
    
    // Call via function pointer
    int result = funcPtr(5, 3);
    printf("Result: %d\n", result);   // Output: Result: 8
    
    // Alternative call syntax
    result = (*funcPtr)(10, 20);
    printf("Result: %d\n", result);   // Output: Result: 30
    
    return 0;
}