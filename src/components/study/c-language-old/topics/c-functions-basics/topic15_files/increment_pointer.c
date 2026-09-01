#include <stdio.h>

void increment(int *p) {
    (*p)++;   // add 1 to the variable p points to
}

int main() {
    int count = 5;
    printf("Before: %d\n", count);
    increment(&count);
    printf("After:  %d\n", count);   // now 6
    return 0;
}