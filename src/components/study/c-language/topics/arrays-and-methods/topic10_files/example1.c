#include <stdio.h>

// A function with an off-by-one error (hidden)
void buggyFunction(int arr[], int n) {
    // Intended to set all elements to 1, but writes one past the end
    for (int i = 0; i <= n; i++) {  // error: <= instead of <
        arr[i] = 1;
    }
}

int main() {
    int data[5] = {0};

    printf("Before buggyFunction:\n");
    for (int i = 0; i < 5; i++) {
        printf("data[%d] = %d\n", i, data[i]);
    }

    // Call the buggy function
    buggyFunction(data, 5);

    printf("\nAfter buggyFunction:\n");
    for (int i = 0; i < 5; i++) {
        printf("data[%d] = %d\n", i, data[i]);
    }

    // To debug, we might add printf inside the loop to see index
    // Or check the value of a variable placed after the array in memory
    return 0;
}