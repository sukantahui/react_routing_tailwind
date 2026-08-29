#include <stdio.h>

int min(int a, int b) { return (a < b) ? a : b; }

int find_length_to_remove(int arr[], int n) {
    int left = 0;
    while (left < n - 1 && arr[left] <= arr[left + 1]) left++;
    if (left == n - 1) return 0;

    int right = n - 1;
    while (right > 0 && arr[right - 1] <= arr[right]) right--;

    int result = min(n - left - 1, right);
    int i = 0, j = right;
    while (i <= left && j < n) {
        if (arr[i] <= arr[j]) {
            result = min(result, j - i - 1);
            i++;
        } else {
            j++;
        }
    }
    return result;
}

int main() {
    int arr[] = {1, 2, 3, 10, 4, 2, 3, 5};
    int n = 8;
    printf("--- Shortest Subarray Removal to Make Array Sorted ---\n");
    printf("Minimum Elements to Remove = %d\n", find_length_to_remove(arr, n));
    return 0;
}
