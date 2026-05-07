#include <stdio.h>

#define PTR int*
const int value = 42;

int main() {
    PTR a, b;   // expands to int* a, b;  -> b is int, not pointer!
    int x = 10, y = 20;
    a = &x;
    // b = &y;  // error: b is int
    
    const int *ptr = &value;   // pointer to const int
    // *ptr = 100;  // error: cannot modify through ptr
    
    int z = 5;
    int *const cptr = &z;      // const pointer
    *cptr = 30;   // allowed
    // cptr = &x;  // error: pointer is const
    
    printf("a points to %d, z now %d\n", *a, z);
    return 0;
}