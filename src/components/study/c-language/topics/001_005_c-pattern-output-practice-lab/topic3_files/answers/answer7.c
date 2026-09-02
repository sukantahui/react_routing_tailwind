#include <stdio.h>
#include <stdlib.h>

double add(double a, double b) { return a + b; }
double subtract(double a, double b) { return a - b; }
double multiply(double a, double b) { return a * b; }
double divide(double a, double b) {
    if (b == 0.0) {
        printf("\n[ERROR] Division by zero!\n");
        return 0.0;
    }
    return a / b;
}

typedef double (*MathFunc)(double, double);

int main(void) {
    MathFunc dispatchTable[] = { add, subtract, multiply, divide };
    const char *opNames[] = { "Addition (+)", "Subtraction (-)", "Multiplication (*)", "Division (/)" };
    
    double num1 = 45.5, num2 = 12.2;
    int choice;

    printf("=========================================================\n");
    printf("  DYNAMIC FUNCTION POINTER CALCULATOR & DISPATCH TABLE   \n");
    printf("=========================================================\n");
    printf("Operands: A = %.2f, B = %.2f\n\n", num1, num2);

    for (int i = 0; i < 4; i++) {
        double result = dispatchTable[i](num1, num2);
        printf("  Operation %d: %-20s -> Result: %10.2f\n", i + 1, opNames[i], result);
    }

    return 0;
}
