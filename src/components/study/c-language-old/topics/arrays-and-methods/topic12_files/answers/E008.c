#include <stdio.h>

/*
    Function: swap
    ----------------
    Swaps two integers using pointers.
*/
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}

/*
    Function: reverse
    -------------------
    Reverses a portion of the array
    from index start to end.
*/
void reverse(int arr[], int start, int end) {
    while (start < end) {
        swap(&arr[start], &arr[end]);
        start++;
        end--;
    }
}

/*
    Function: nextPermutation
    ----------------------------
    Rearranges numbers into the next lexicographically
    greater permutation.

    If no greater permutation exists,
    it rearranges to the smallest permutation.
*/
void nextPermutation(int arr[], int n) {

    /*
        Step 1:
        Find the first decreasing element from right.
        (Find index i such that arr[i] < arr[i+1])
    */
    int i = n - 2;
    while (i >= 0 && arr[i] >= arr[i + 1])
        i--;

    /*
        Step 2:
        If such element exists,
        find element just greater than arr[i]
        from right side.
    */
    if (i >= 0) {
        int j = n - 1;

        while (arr[j] <= arr[i])
            j--;

        // Swap them
        swap(&arr[i], &arr[j]);
    }

    /*
        Step 3:
        Reverse the suffix (right part)
        to make it smallest possible.
    */
    reverse(arr, i + 1, n - 1);
}

/*
    Main Function
    --------------
    1. Take array size.
    2. Take elements.
    3. Generate next permutation.
    4. Print result.
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    nextPermutation(arr, n);

    printf("Next permutation: ");
    for (int i = 0; i < n; i++)
        printf("%d ", arr[i]);

    printf("\n");

    return 0;
}
