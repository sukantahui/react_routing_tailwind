#include <stdio.h>
#include <limits.h>

int min(int a, int b) { return (a < b) ? a : b; }

int shortest_subarray_sum_at_least_k(int nums[], int n, int k) {
    long P[100]; P[0] = 0;
    for (int i = 0; i < n; i++) P[i + 1] = P[i] + nums[i];

    int deque[100]; int front = 0, rear = -1;
    int min_len = INT_MAX;

    for (int i = 0; i <= n; i++) {
        while (front <= rear && P[i] - P[deque[front]] >= k) {
            min_len = min(min_len, i - deque[front++]);
        }
        while (front <= rear && P[i] <= P[deque[rear]]) rear--;
        deque[++rear] = i;
    }
    return (min_len == INT_MAX) ? -1 : min_len;
}

int main() {
    int nums[] = {2, -1, 2};
    int n = 3, k = 3;
    printf("--- Shortest Subarray Sum at Least K ---\n");
    printf("Shortest Subarray Length = %d\n", shortest_subarray_sum_at_least_k(nums, n, k));
    return 0;
}
