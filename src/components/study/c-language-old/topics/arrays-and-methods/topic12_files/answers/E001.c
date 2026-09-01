#include <stdio.h>

/*
    Function: swap
    ----------------
    Swaps the values of two integers using pointers.
*/
void swap(int *a, int *b) {
    int temp = *a;   // Store value of a in temp
    *a = *b;         // Copy value of b into a
    *b = temp;       // Copy temp (original a) into b
}

/*
    Function: partition
    --------------------
    This function rearranges the array elements around a pivot.
    
    Steps:
    1. Select the last element as pivot.
    2. Place all elements smaller than or equal to pivot
       on the left side.
    3. Place all elements greater than pivot on the right side.
    4. Return the final position of the pivot element.
*/
int partition(int arr[], int low, int high) {
    int pivot = arr[high];   // Choose last element as pivot
    int i = low - 1;         // Index of smaller element

    // Traverse array from low to high-1
    for (int j = low; j < high; j++) {

        // If current element is <= pivot
        if (arr[j] <= pivot) {
            i++;  // Move index of smaller element forward
            swap(&arr[i], &arr[j]);  // Swap smaller element to left side
        }
    }

    // Place pivot in correct sorted position
    swap(&arr[i + 1], &arr[high]);

    return i + 1;  // Return pivot index
}

/*
    Function: quickSort
    ---------------------
    Recursive Quick Sort algorithm.
    
    Steps:
    1. Partition the array.
    2. Recursively sort left subarray.
    3. Recursively sort right subarray.
*/
void quickSort(int arr[], int low, int high) {

    // Base condition: If there are at least 2 elements
    if (low < high) {

        // Partition the array and get pivot index
        int pi = partition(arr, low, high);

        // Recursively sort elements before pivot
        quickSort(arr, low, pi - 1);

        // Recursively sort elements after pivot
        quickSort(arr, pi + 1, high);
    }
}

/*
    Main Function
    --------------
    1. Take input size of array.
    2. Take array elements.
    3. Call quickSort().
    4. Print sorted array.
*/
int main() {
    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Call Quick Sort
    quickSort(arr, 0, n - 1);

    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
