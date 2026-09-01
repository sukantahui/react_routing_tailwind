#include <stdio.h>

/*
    Function: swap
    ----------------
    Swaps two integer values using pointers.
*/
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

/*
    Function: partition
    ---------------------
    Same logic as Quick Sort partition.

    Steps:
    1. Choose last element as pivot.
    2. Place all elements ≤ pivot on left side.
    3. Place elements > pivot on right side.
    4. Return final position of pivot.
*/
int partition(int arr[], int low, int high) {

    int pivot = arr[high];   // Choose pivot
    int i = low;             // Position for smaller elements

    for (int j = low; j < high; j++) {

        if (arr[j] <= pivot) {
            swap(&arr[i], &arr[j]);
            i++;
        }
    }

    // Place pivot in correct position
    swap(&arr[i], &arr[high]);

    return i;   // Return pivot index
}

/*
    Function: quickSelect
    -----------------------
    Finds the kth smallest element using
    Quick Select algorithm.

    Idea:
    Instead of sorting entire array,
    only recurse into one side.
*/
int quickSelect(int arr[], int low, int high, int k) {

    if (low <= high) {

        // Partition array
        int pi = partition(arr, low, high);

        // If pivot index matches k
        if (pi == k)
            return arr[pi];

        // If pivot index is smaller than k
        // Search in right half
        else if (pi < k)
            return quickSelect(arr, pi + 1, high, k);

        // Otherwise search in left half
        else
            return quickSelect(arr, low, pi - 1, k);
    }

    return -1;  // Invalid case
}

/*
    Main Function
    --------------
    1. Take array size.
    2. Take elements.
    3. Take k value (1-based index).
    4. Convert to 0-based index.
    5. Print kth smallest element.
*/
int main() {

    int n, k, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    printf("Enter k (1-based): ");
    scanf("%d", &k);

    // Convert to 0-based index
    int result = quickSelect(arr, 0, n - 1, k - 1);

    printf("%dth smallest element = %d\n", k, result);

    return 0;
}
