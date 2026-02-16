#include <stdio.h>

// Function that modifies the array (doubles each element)
void doubleElements(int arr[], int n) {
    for (int i = 0; i < n; i++) {
        arr[i] *= 2; // modifies original array
    }
}

int main() {
    int marks[] = {45, 60, 72, 81, 55};
    int n = sizeof(marks) / sizeof(marks[0]);

    printf("Before: ");
    for (int i = 0; i < n; i++) printf("%d ", marks[i]);
    printf("\n");

    doubleElements(marks, n);

    printf("After : ");
    for (int i = 0; i < n; i++) printf("%d ", marks[i]);
    printf("\n");

    return 0;
}