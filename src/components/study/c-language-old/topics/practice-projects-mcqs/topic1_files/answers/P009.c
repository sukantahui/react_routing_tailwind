#include <stdio.h>

int main() {
    int a, b = 2;
    float f;
    printf("Enter an integer: ");
    scanf("%d", &a);
    printf("Enter a float: ");
    scanf("%f", &f);
    // Implicit conversion: result of int division stored in float
    float implicit = a / b;  // integer division first, then converted to float
    printf("Implicit: int / int stored in float: %d/%d = %f\n", a, b, implicit);
    // Explicit cast: force float division
    float explicitCast = (float)a / b;
    printf("Explicit cast: (float)%d/%d = %f\n", a, b, explicitCast);
    // Cast float to int (truncation)
    int casted = (int)f;
    printf("Casting float to int: (int)%f = %d\n", f, casted);
    return 0;
}
