#include <stdio.h>
#include <string.h>

int main() {
    // String literal (read-only)
    char *literal = "Hello";
    printf("literal = %s\n", literal);
    // Attempting to modify leads to undefined behavior
    // literal[0] = 'h';   // DANGEROUS: will likely crash

    // Modifiable character array
    char array[] = "Hello";
    printf("array = %s\n", array);
    array[0] = 'h';          // Safe: modifies the array
    printf("After modification: array = %s\n", array);

    // Demonstrating that the pointer can be reassigned
    literal = array;         // now points to modifiable memory
    literal[0] = 'H';        // OK because array is writable
    printf("After reassign: literal points to: %s\n", literal);

    // The array name cannot be reassigned
    // array = "World";      // ERROR: array name is not an lvalue

    return 0;
}