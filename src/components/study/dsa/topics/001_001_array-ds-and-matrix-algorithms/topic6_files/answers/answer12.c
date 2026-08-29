#include <stdio.h>
#include <limits.h>

void find_second_extremes(int arr[], int n) {
    if (n < 2) {
        printf("Array size must be at least 2.\n");
        return;
    }

    int smallest = INT_MAX, second_smallest = INT_MAX;
    int largest = INT_MIN, second_largest = INT_MIN;

    for (int i = 0; i < n; i++) {
        // Smallest tracking
        if (arr[i] < smallest) {
            second_smallest = smallest;
            smallest = arr[i];
        } else if (arr[i] < second_smallest && arr[i] != smallest) {
            second_smallest = arr[i];
        }

        // Largest tracking
        if (arr[i] > largest) {
            second_largest = largest;
            largest = arr[i];
        } else if (arr[i] > second_largest && arr[i] != largest) {
            second_largest = arr[i];
        }
    }

    printf("Smallest: %d, Second Smallest: %d\n", smallest, (second_smallest == INT_MAX) ? -1 : second_smallest);
    printf("Largest: %d, Second Largest: %d\n", largest, (second_largest == INT_MIN) ? -1 : second_largest);
}

int main() {
    int arr[] = {12, 35, 1, 10, 34, 1};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Second Extremes Extractor ---\n");
    find_second_extremes(arr, n);

    return 0;
}
