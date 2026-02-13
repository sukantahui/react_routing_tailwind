#include <stdio.h>

// Function that takes an array and its size, prints all elements
void displayArray(int arr[], int n) {
    printf("Array elements: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int marks[] = {85, 92, 78, 96};
    displayArray(marks, 4);
    return 0;
}