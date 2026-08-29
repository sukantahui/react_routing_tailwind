#include <stdio.h>

double find_max_average(int nums[], int n, int k) {
    long window_sum = 0;
    for (int i = 0; i < k; i++) window_sum += nums[i];

    long max_sum = window_sum;
    for (int i = k; i < n; i++) {
        window_sum += nums[i] - nums[i - k];
        if (window_sum > max_sum) max_sum = window_sum;
    }
    return (double)max_sum / k;
}

int main() {
    int nums[] = {1, 12, -5, -6, 50, 3};
    int n = 6, k = 4;
    printf("--- Maximum Average Subarray of Size K ---\n");
    printf("Maximum Average = %.5f\n", find_max_average(nums, n, k));
    return 0;
}
