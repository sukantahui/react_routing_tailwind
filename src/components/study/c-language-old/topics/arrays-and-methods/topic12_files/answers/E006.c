#include <stdio.h>
#include <limits.h>

/*
    Function: findMedianSortedArrays
    ---------------------------------
    Finds median of two sorted arrays using Binary Search.

    Time Complexity: O(log(min(m, n)))
    Space Complexity: O(1)

    Idea:
    Instead of merging arrays (O(m+n)),
    we use Binary Search on the smaller array.
*/
double findMedianSortedArrays(int nums1[], int m, int nums2[], int n) {

    /*
        Always apply binary search on smaller array
        to reduce complexity.
    */
    if (m > n)
        return findMedianSortedArrays(nums2, n, nums1, m);

    int low = 0, high = m;

    while (low <= high) {

        // Partition index for first array
        int partX = (low + high) / 2;

        // Partition index for second array
        int partY = (m + n + 1) / 2 - partX;

        /*
            Handle edge cases using INT_MIN and INT_MAX
            when partition touches array boundaries
        */
        int maxX = (partX == 0) ? INT_MIN : nums1[partX - 1];
        int minX = (partX == m) ? INT_MAX : nums1[partX];

        int maxY = (partY == 0) ? INT_MIN : nums2[partY - 1];
        int minY = (partY == n) ? INT_MAX : nums2[partY];

        /*
            Correct partition condition:
            Left side max <= Right side min
        */
        if (maxX <= minY && maxY <= minX) {

            // If total elements are even
            if ((m + n) % 2 == 0) {

                int leftMax = (maxX > maxY) ? maxX : maxY;
                int rightMin = (minX < minY) ? minX : minY;

                return (double)(leftMax + rightMin) / 2.0;
            }
            else {
                // If odd → median is max of left side
                return (double)((maxX > maxY) ? maxX : maxY);
            }
        }

        /*
            If left side of nums1 is too big,
            move partition left.
        */
        else if (maxX > minY)
            high = partX - 1;

        /*
            Else move partition right.
        */
        else
            low = partX + 1;
    }

    return -1; // Should never reach here
}

/*
    Main Function
    --------------
    1. Take two sorted arrays as input.
    2. Call findMedianSortedArrays().
    3. Print median.
*/
int main() {

    int m, n;

    printf("Enter size of first sorted array: ");
    scanf("%d", &m);

    int a[m];

    printf("Enter elements: ");
    for (int i = 0; i < m; i++)
        scanf("%d", &a[i]);

    printf("Enter size of second sorted array: ");
    scanf("%d", &n);

    int b[n];

    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &b[i]);

    double median = findMedianSortedArrays(a, m, b, n);

    printf("Median = %g\n", median);

    return 0;
}
