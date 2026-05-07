#include <stdio.h>

// Good use of #define: conditional compilation
#define DEBUG 1

// Good use of const: typed constants
const double TAX_RATE = 0.08;
const char* APP_NAME = "MyProgram";

int main() {
    double price = 100.0;
    double total = price + (price * TAX_RATE);
    
#if DEBUG
    printf("[DEBUG] Price: %.2f, Tax rate: %.2f\n", price, TAX_RATE);
#endif
    printf("%s: Total = %.2f\n", APP_NAME, total);
    return 0;
}