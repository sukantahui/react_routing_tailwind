#include <stdio.h>

int main() {
    int marks[5] = {89, 72, 94, 68, 77};

    // Find the number of elements using sizeof
    int size = sizeof(marks) / sizeof(marks[0]);

    // Loop through all elements and print their values
    for (int i = 0; i < size; i++) {
        printf("Element at index %d is %d\n", i, marks[i]);
    }

    // Change the value of an element using its index
    marks[1] = 100;  // Tuhina's marks updated
    printf("\nAfter update:\n");
    for (int i = 0; i < size; i++) {
        printf("marks[%d] = %d\n", i, marks[i]);
    }

    return 0;
}