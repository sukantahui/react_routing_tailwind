#include <stdio.h>

/*
    Function: ceilIndex
    ---------------------
    Finds the index in tail[] where key should be placed.

    It performs binary search to find the smallest
    element >= key.

    This helps maintain the sorted order in tail[].
*/
int ceilIndex(int tail[], int l, int r, int key) {

    while (l < r) {

        int m = l + (r - l) / 2;

        if (tail[m] >= key)
            r = m;          // Move left
        else
            l = m + 1;      // Move right
    }

    return r;
}

/*
    Function: LIS
    ----------------
    Returns length of Longest Increasing Subsequence.

    Idea:
    tail[i] stores the smallest possible ending value
    of an increasing subsequence of length i+1.

    We do NOT store the actual sequence,
    only maintain candidates.
*/
int LIS(int arr[], int n) {

    int tail[n];

    int len = 1;          // Length of LIS found so far
    tail[0] = arr[0];     // First element starts subsequence

    for (int i = 1; i < n; i++) {

        /*
            Case 1:
            If current element is greater than
            last element of current LIS,
            extend the subsequence.
        */
        if (arr[i] > tail[len - 1]) {

            tail[len++] = arr[i];
        }

        /*
            Case 2:
            Otherwise, find the position where
            arr[i] should replace an element in tail[]
            using binary search.
        */
        else {

            int idx = ceilIndex(tail, 0, len - 1, arr[i]);
            tail[idx] = arr[i];
        }
    }

    return len;
}

/*
    Main Function
    --------------
    1. Take input size.
    2. Take elements.
    3. Call LIS().
    4. Print LIS length.
*/
int main() {

    int n, arr[100];

    printf("Enter size: ");
    scanf("%d", &n);

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);

    int lis = LIS(arr, n);

    printf("LIS length = %d\n", lis);

    return 0;
}
