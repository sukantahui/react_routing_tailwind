#include <stdio.h>

int main() {
    int a = 42;
    double b = 3.14;
    
    void *ptr;
    
    // Point to integer
    ptr = &a;
    printf("Value via void*: %d\n", *(int*)ptr);  // cast to int*
    
    // Point to double
    ptr = &b;
    printf("Value via void*: %f\n", *(double*)ptr);  // cast to double*
    
    // Cannot do: *ptr (error: incomplete type)
    // Cannot do: ptr++ (not standard)
    
    return 0;
}