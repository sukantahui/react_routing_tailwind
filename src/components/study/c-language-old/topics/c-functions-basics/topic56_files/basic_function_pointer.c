// basic_function_pointer.c – Declare, assign, and use a function pointer
#include <stdio.h>

// Two simple functions
int add(int a, int b) {
    return a + b;
}

int multiply(int a, int b) {
    return a * b;
}

int main() {
    // Declare a function pointer: points to a function taking two ints and returning int
    int (*op)(int, int);

    // Assign the address of add
    op = &add;  // & is optional, function name decays to pointer
    // Call through the pointer
    int result = op(5, 3);
    printf("add: 5 + 3 = %d\n", result);

    // Reassign to multiply
    op = multiply;  // without & also works
    result = (*op)(5, 3);  // explicit dereference also works
    printf("multiply: 5 * 3 = %d\n", result);

    return 0;
}