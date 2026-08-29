#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int longest_consecutive_subsequence(int arr[], int n) {
    if (n == 0) return 0;

    qsort(arr, n, sizeof(int), compare);

    int max_streak = 1;
    int current_streak = 1;

    for (int i = 1; i < n; i++) {
        if (arr[i] != arr[i - 1]) {
            if (arr[i] == arr[i - 1] + 1) {
                current_streak++;
            } else {
                if (current_streak > max_streak) max_streak = current_streak;
                current_streak = 1;
            }
        }
    }
    if (current_streak > max_streak) max_streak = current_streak;

    return max_streak;
}

int main() {
    int arr[] = {100, 4, 200, 1, 3, 2};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("--- Longest Consecutive Subsequence ---\nArray: [ 100 4 200 1 3 2 ]\n");
    int len = longest_consecutive_subsequence(arr, n);

    printf("Longest Consecutive Length: %d (Sequence [1, 2, 3, 4])\n", len);
    return 0;
}
