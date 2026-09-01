#include <stdio.h>

/*
    Function: countingSort
    ------------------------
    Sorts an array of non-negative integers using Counting Sort.

    Counting Sort works by:
    1. Finding the maximum element.
    2. Counting occurrences of each element.
    3. Rebuilding the array using the count array.
*/
void countingSort(int arr[], int n) {

    // Step 1: Find the maximum element
    int max = arr[0];
    for (int i = 1; i < n; i++)
        if (arr[i] > max)
            max = arr[i];

    /*
        Step 2: Create count array
        Size = max + 1 (to store frequency of each value)
    */
    int count[max + 1];

    // Initialize count array to 0
    for (int i = 0; i <= max; i++)
        count[i] = 0;

    // Store frequency of each element
    for (int i = 0; i < n; i++)
        count[arr[i]]++;

    /*
        Step 3: Build output array
        Insert elements according to frequency
    */
    int output[n];
    int idx = 0;   // Index for output array

    for (int i = 0; i <= max; i++) {

        // Place element i as many times as it appears
        while (count[i]-- > 0)
            output[idx++] = i;
    }

    // Step 4: Copy sorted data back to original array
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

/*
    Main Function
    --------------
    1. Take input size
    2. Take non-negative integers
    3. Call countingSort()
    4. Print sorted array
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter non-negative integers: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Call Counting Sort
    countingSort(arr, n);

    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
