#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int longest_mountain(int arr[], int n) {
    int max_len = 0, i = 1;
    while (i < n - 1) {
        bool is_peak = (arr[i] > arr[i - 1] && arr[i] > arr[i + 1]);
        if (is_peak) {
            int left = i - 1;
            while (left > 0 && arr[left] > arr[left - 1]) left--;
            int right = i + 1;
            while (right < n - 1 && arr[right] > arr[right + 1]) right++;
            max_len = max(max_len, right - left + 1);
            i = right;
        } else {
            i++;
        }
    }
    return max_len;
}

int main() {
    int arr[] = {2, 1, 4, 7, 3, 2, 5};
    int n = 7;
    printf("--- Longest Mountain in Array ---\n");
    printf("Longest Mountain Subarray Length = %d\n", longest_mountain(arr, n));
    return 0;
}
