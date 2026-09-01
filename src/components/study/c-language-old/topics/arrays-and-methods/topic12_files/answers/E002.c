#include <stdio.h>

/*
    Function: merge
    ----------------
    This function merges two sorted subarrays into one sorted array.

    Parameters:
    arr[] → Original array
    l     → Left index
    m     → Middle index
    r     → Right index

    The subarrays are:
    Left  part → arr[l ... m]
    Right part → arr[m+1 ... r]
*/
void merge(int arr[], int l, int m, int r) {

    int n1 = m - l + 1;   // Size of left subarray
    int n2 = r - m;       // Size of right subarray

    int L[n1], R[n2];     // Temporary arrays

    // Copy data into temporary left array
    for (int i = 0; i < n1; i++)
        L[i] = arr[l + i];

    // Copy data into temporary right array
    for (int j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    int i = 0, j = 0;     // Initial indexes of subarrays
    int k = l;            // Initial index of merged array

    /*
        Compare elements from both arrays
        and copy the smaller one into original array
    */
    while (i < n1 && j < n2) {

        if (L[i] <= R[j])
            arr[k++] = L[i++];   // Copy from left
        else
            arr[k++] = R[j++];   // Copy from right
    }

    /*
        Copy remaining elements (if any)
        Only one of these loops will execute
    */
    while (i < n1)
        arr[k++] = L[i++];

    while (j < n2)
        arr[k++] = R[j++];
}

/*
    Function: mergeSort
    ---------------------
    Recursive function that divides the array into halves
    until single elements remain, then merges them back.
*/
void mergeSort(int arr[], int l, int r) {

    // Base condition: At least two elements
    if (l < r) {

        // Find middle index
        int m = l + (r - l) / 2;

        // Recursively sort left half
        mergeSort(arr, l, m);

        // Recursively sort right half
        mergeSort(arr, m + 1, r);

        // Merge the two sorted halves
        merge(arr, l, m, r);
    }
}

/*
    Main Function
    --------------
    1. Take input size
    2. Take array elements
    3. Call mergeSort()
    4. Print sorted array
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Call Merge Sort
    mergeSort(arr, 0, n - 1);

    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
