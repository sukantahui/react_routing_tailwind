#include <stdio.h>

int add(int a, int b) { return a + b; }
double divide(double x, double y) { return x / y; }
void sayHello(void) { printf("Hello!\n"); }

int main() {
    // Basic function pointer declarations
    int (*mathOp)(int, int);
    double (*divOp)(double, double);
    void (*greet)(void);
    
    // Assignments
    mathOp = add;            // function name decays to address
    divOp = divide;
    greet = sayHello;
    
    // Calls
    printf("5+3 = %d\n", mathOp(5, 3));
    printf("10/4 = %f\n", divOp(10.0, 4.0));
    greet();
    
    // Can also use & explicitly
    mathOp = &add;   // same effect
    printf("10+20 = %d\n", mathOp(10, 20));
    
    return 0;
}