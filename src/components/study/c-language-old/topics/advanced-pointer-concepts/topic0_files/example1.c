#include <stdio.h>

int main() {
    // Basic pointer declaration and usage
    int number = 42;        // Regular integer variable
    int *ptr = &number;     // Pointer storing address of 'number'
    
    printf("Value of number: %d\n", number);
    printf("Address of number: %p\n", &number);
    printf("Value of ptr (address stored): %p\n", ptr);
    printf("Value pointed by ptr: %d\n", *ptr);
    
    // Modifying value through pointer
    *ptr = 100;
    printf("\nAfter *ptr = 100:");
    printf("\nnumber = %d\n", number);
    
    return 0;
}