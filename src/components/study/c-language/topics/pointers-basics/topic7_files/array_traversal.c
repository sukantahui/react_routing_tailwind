#include <stdio.h>

int main() {
    int numbers[] = {5, 10, 15, 20, 25};
    int length = sizeof(numbers) / sizeof(numbers[0]);

    // Traverse using pointer arithmetic
    int *ptr;
    printf("Traversing forward: ");
    for (ptr = numbers; ptr < numbers + length; ptr++) {
        printf("%d ", *ptr);
    }
    printf("\n");

    // Traverse backward
    printf("Traversing backward: ");
    for (ptr = numbers + length - 1; ptr >= numbers; ptr--) {
        printf("%d ", *ptr);
    }
    printf("\n");

    // Modify values using pointer arithmetic
    for (ptr = numbers; ptr < numbers + length; ptr++) {
        *ptr *= 2;   // double each element
    }

    printf("After doubling: ");
    for (ptr = numbers; ptr < numbers + length; ptr++) {
        printf("%d ", *ptr);
    }
    printf("\n");

    return 0;
}