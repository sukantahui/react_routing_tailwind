#include <stdio.h>

void sort_012(int arr[], int n) {
    int low = 0;
    int mid = 0;
    int high = n - 1;

    while (mid <= high) {
        if (arr[mid] == 0) {
            int temp = arr[low];
            arr[low] = arr[mid];
            arr[mid] = temp;
            low++;
            mid++;
        } else if (arr[mid] == 1) {
            mid++;
        } else {
            // arr[mid] == 2
            int temp = arr[mid];
            arr[mid] = arr[high];
            arr[high] = temp;
            high--;
        }
    }
}

void print_array(const int arr[], int n) {
    printf("[ ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {2, 0, 2, 1, 1, 0, 1, 2, 0, 0};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original Unsorted Array: ");
    print_array(arr, n);

    printf("Executing Dutch National Flag 3-Way Partitioning (Single Pass)...\n");
    sort_012(arr, n);

    printf("Sorted Array (0s, 1s, 2s): ");
    print_array(arr, n);

    return 0;
}
