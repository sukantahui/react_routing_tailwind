#include <stdio.h>

// Separate max functions for each type
int max_int(int a, int b) { return a > b ? a : b; }
double max_double(double a, double b) { return a > b ? a : b; }
char* max_string(char* a, char* b) { return strcmp(a, b) > 0 ? a : b; }

int main() {
    printf("max int: %d\n", max_int(5, 3));
    printf("max double: %f\n", max_double(3.14, 2.71));
    printf("max string: %s\n", max_string("apple", "banana"));
    // What if we need max for a struct? Write another function...
    return 0;
}