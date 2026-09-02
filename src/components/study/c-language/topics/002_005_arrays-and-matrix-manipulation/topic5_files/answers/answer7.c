#include <stdio.h>
#include <limits.h>

/**
 * Project 7: Second Largest & Second Smallest Element Finder in Single Pass O(n)
 * Finds 1st/2nd largest and 1st/2nd smallest numbers without sorting.
 * Educator: Sukanta Hui (Coder & AccoTax, Barrackpore)
 */

int main(void) {
    int arr[] = {12, 35, 1, 10, 34, 1, 35};
    int n = sizeof(arr) / sizeof(arr[0]);

    if (n < 2) {
        printf("Array must contain at least 2 distinct elements.\n");
        return 1;
    }

    int firstMax = INT_MIN, secondMax = INT_MIN;
    int firstMin = INT_MAX, secondMin = INT_MAX;

    for (int i = 0; i < n; i++) {
        // Largest logic
        if (arr[i] > firstMax) {
            secondMax = firstMax;
            firstMax = arr[i];
        } else if (arr[i] > secondMax && arr[i] != firstMax) {
            secondMax = arr[i];
        }

        // Smallest logic
        if (arr[i] < firstMin) {
            secondMin = firstMin;
            firstMin = arr[i];
        } else if (arr[i] < secondMin && arr[i] != firstMin) {
            secondMin = arr[i];
        }
    }

    printf("Dataset: [ 12, 35, 1, 10, 34, 1, 35 ]\n\n");
    printf("• Largest        : %d\n", firstMax);
    printf("• Second Largest : %d\n", secondMax);
    printf("• Smallest       : %d\n", firstMin);
    printf("• Second Smallest: %d\n", secondMin);

    return 0;
}
