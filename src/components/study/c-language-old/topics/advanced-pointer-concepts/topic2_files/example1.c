#include <stdio.h>

int main() {
    // Different syntax variations - all valid
    int *ptr1;      // Traditional C style (asterisk near variable)
    int* ptr2;      // Type-focused style (asterisk near type)
    int * ptr3;     // Spaced style (both sides)
    
    int var = 42;
    
    // Assignment (same for all styles)
    ptr1 = &var;
    ptr2 = &var;
    ptr3 = &var;
    
    printf("=== Pointer Declaration Syntax ===\n");
    printf("ptr1 points to: %d\n", *ptr1);
    printf("ptr2 points to: %d\n", *ptr2);
    printf("ptr3 points to: %d\n", *ptr3);
    
    // Common mistake: declaring multiple pointers
    int* a, b;      // a is pointer, b is integer!
    int *c, *d;     // Both c and d are pointers
    
    a = &var;
    // b = &var;    // ERROR! b is int, not pointer
    c = &var;
    d = &var;
    
    printf("\n=== Multiple Pointer Declaration ===\n");
    printf("sizeof(a): %zu (pointer)\n", sizeof(a));
    printf("sizeof(b): %zu (integer)\n", sizeof(b));
    printf("sizeof(c): %zu (pointer)\n", sizeof(c));
    printf("sizeof(d): %zu (pointer)\n", sizeof(d));
    
    return 0;
}