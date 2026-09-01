// This is NOT valid C – it's an illustration of what C DOES NOT have.
// In C++ you could write:
/*
void swap(int& x, int& y) {
    int temp = x;
    x = y;
    y = temp;
}
*/
// But C has no such syntax. The compiler will give an error if you try.
#include <stdio.h>

int main() {
    printf("C has no reference parameters.\n");
    return 0;
}