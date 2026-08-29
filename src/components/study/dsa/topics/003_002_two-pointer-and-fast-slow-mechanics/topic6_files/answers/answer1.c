#include <stdio.h>

void sorted_two_sum(int arr[], int n, int target) {
    int left = 0, right = n - 1;
    while (left < right) {
        int sum = arr[left] + arr[right];
        if (sum == target) {
            printf("Found Pair: %d + %d = %d (Indices: %d, %d)\n", arr[left], arr[right], target, left, right);
            return;
        }
        if (sum < target) left++;
        else right--;
    }
    printf("No pair found.\n");
}

int main() {
    int arr[] = {2, 7, 11, 15};
    int n = 4, target = 9;
    printf("--- Two-Pointer Convergent Search ---\n");
    sorted_two_sum(arr, n, target);
    return 0;
}
