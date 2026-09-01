#include <stdio.h>

// typedef for function pointer
typedef int (*Operation)(int, int);
typedef void (*Printer)(int);

int add(int a, int b) { return a + b; }
int multiply(int a, int b) { return a * b; }

void printResult(int res) { printf("Result: %d\n", res); }

// Function that takes a function pointer as parameter
void computeAndPrint(Operation op, int x, int y, Printer printer) {
    int result = op(x, y);
    printer(result);
}

int main() {
    // Using the typedef
    Operation op = add;
    printf("add: %d\n", op(5, 3));
    
    op = multiply;
    printf("multiply: %d\n", op(5, 3));
    
    // Passing function pointers
    computeAndPrint(add, 10, 20, printResult);
    computeAndPrint(multiply, 10, 20, printResult);
    
    return 0;
}