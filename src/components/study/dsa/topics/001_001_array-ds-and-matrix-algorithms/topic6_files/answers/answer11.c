#include <stdio.h>

void reverse_array(int arr[], int n) {
    int left = 0, right = n - 1;
    while (left < right) {
        int temp = arr[left];
        arr[left] = arr[right];
        arr[right] = temp;
        left++;
        right--;
    }
}

void print_array(int arr[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- In-Place Array Reversal Simulation ---\n");
    printf("Original Array: ");
    print_array(arr, n);

    reverse_array(arr, n);

    printf("Reversed Array: ");
    print_array(arr, n);

    return 0;
}
