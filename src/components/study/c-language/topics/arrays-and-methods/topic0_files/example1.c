#include <stdio.h>

int main() {
    // Declare an array of 5 integers
    int marks[5];

    // Assign values to each element
    marks[0] = 89;  // first element (index 0)
    marks[1] = 72;  // second element (index 1)
    marks[2] = 94;  // third element (index 2)
    marks[3] = 68;  // fourth element (index 3)
    marks[4] = 77;  // fifth element (index 4)

    // Access and print the third element
    printf("marks[2] = %d\n", marks[2]);  // prints 94

    return 0;
}