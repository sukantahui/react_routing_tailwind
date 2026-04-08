#include <stdio.h>

int add(int a, int b) {
    return a + b;
}

int main() {
    int (*funcPtr)(int, int) = add;
    
    // Method 1: Explicit dereference
    int result1 = (*funcPtr)(5, 3);
    printf("(*funcPtr)(5,3) = %d\n", result1);
    
    // Method 2: Implicit dereference (syntactic sugar)
    int result2 = funcPtr(5, 3);
    printf("funcPtr(5,3) = %d\n", result2);
    
    // Both produce the same output
    return 0;
}