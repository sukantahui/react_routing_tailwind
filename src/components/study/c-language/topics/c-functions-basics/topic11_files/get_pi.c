#include <stdio.h>

// Function with no arguments, returns a float constant
float getPi(void) {
    return 3.14159265359f;
}

int main() {
    printf("Value of pi: %.5f\n", getPi());
    return 0;
}