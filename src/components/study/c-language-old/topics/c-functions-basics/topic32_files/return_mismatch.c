// Example 2: Return type mismatch / missing return
// Compile with: gcc -std=c99 -Wall return_mismatch.c

#include <stdio.h>

int getNumber() {
    // Forgot to return a value – warning/error
}

int main() {
    int x = getNumber();
    printf("%d\n", x);
    return 0;
}