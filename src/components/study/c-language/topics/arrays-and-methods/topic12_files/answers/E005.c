#include <stdio.h>

/*
    Function: getMax
    -----------------
    Finds the maximum element in the array.
    This helps determine the number of digits
    in the largest number.
*/
int getMax(int arr[], int n) {

    int mx = arr[0];   // Assume first element is maximum

    for (int i = 1; i < n; i++)
        if (arr[i] > mx)
            mx = arr[i];

    return mx;
}

/*
    Function: countingSortForRadix
    --------------------------------
    Performs Counting Sort based on a specific digit
    represented by exp (1, 10, 100, ...).

    exp = 1   → units place
    exp = 10  → tens place
    exp = 100 → hundreds place
*/
void countingSortForRadix(int arr[], int n, int exp) {

    int output[n];     // Temporary output array
    int count[10] = {0};  // Count array for digits 0–9

    /*
        Step 1: Count occurrences of digits
        (arr[i] / exp) % 10 extracts the required digit
    */
    for (int i = 0; i < n; i++)
        count[(arr[i] / exp) % 10]++;

    /*
        Step 2: Convert count[] into cumulative count[]
        This helps maintain stability
    */
    for (int i = 1; i < 10; i++)
        count[i] += count[i - 1];

    /*
        Step 3: Build output array (Traverse from right to left)
        Traversing backwards maintains stable sorting
    */
    for (int i = n - 1; i >= 0; i--) {

        int digit = (arr[i] / exp) % 10;

        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    /*
        Step 4: Copy sorted elements back to original array
    */
    for (int i = 0; i < n; i++)
        arr[i] = output[i];
}

/*
    Function: radixSort
    ---------------------
    Main Radix Sort algorithm.

    Steps:
    1. Find maximum number.
    2. Apply counting sort for every digit
       from least significant to most significant.
*/
void radixSort(int arr[], int n) {

    int m = getMax(arr, n);  // Maximum number

    /*
        Apply counting sort for each digit
        exp = 1, 10, 100, 1000...
    */
    for (int exp = 1; m / exp > 0; exp *= 10)
        countingSortForRadix(arr, n, exp);
}

/*
    Main Function
    --------------
    1. Take input size.
    2. Take non-negative integers.
    3. Call radixSort().
    4. Print sorted array.
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter non-negative integers: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    // Call Radix Sort
    radixSort(arr, n);

    // Print sorted array
    printf("Sorted array: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
