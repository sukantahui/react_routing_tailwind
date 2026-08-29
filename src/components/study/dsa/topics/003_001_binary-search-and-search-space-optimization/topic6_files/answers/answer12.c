#include <stdio.h>

int ship_within_days(int weights[], int n, int days) {
    int max_w = 0, sum_w = 0;
    for (int i = 0; i < n; i++) {
        if (weights[i] > max_w) max_w = weights[i];
        sum_w += weights[i];
    }
    int low = max_w, high = sum_w, ans = sum_w;
    while (low <= high) {
        int mid = low + (high - low) / 2;
        int current_days = 1, current_load = 0;
        for (int i = 0; i < n; i++) {
            if (current_load + weights[i] > mid) {
                current_days++;
                current_load = 0;
            }
            current_load += weights[i];
        }
        if (current_days <= days) {
            ans = mid;
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return ans;
}

int main() {
    int weights[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
    int n = 10, days = 5;
    printf("--- Capacity To Ship Packages Within D Days ---\n");
    printf("Minimum Ship Capacity = %d\n", ship_within_days(weights, n, days));
    return 0;
}
