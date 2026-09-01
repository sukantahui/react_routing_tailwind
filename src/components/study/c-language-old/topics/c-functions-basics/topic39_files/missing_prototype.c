// missing_prototype.c – Forgetting to include math.h for sqrt()
#include <stdio.h>

int main() {
    double x = 25.0;
    // No prototype for sqrt() seen – implicit declaration error in C99+
    double result = sqrt(x);  // ERROR: implicit declaration of function 'sqrt'
    printf("Square root of %.2f is %.2f\n", x, result);
    return 0;
}