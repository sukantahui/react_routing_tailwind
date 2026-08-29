#include <stdio.h>

void max_sliding_window(int nums[], int n, int k) {
    int deque[100]; int front = 0, rear = -1;
    printf("--- Sliding Window Maximum Monotonic Deque ---\nWindow Maxima: [ ");
    for (int i = 0; i < n; i++) {
        if (front <= rear && deque[front] <= i - k) front++;
        while (front <= rear && nums[deque[rear]] <= nums[i]) rear--;
        deque[++rear] = i;
        if (i >= k - 1) printf("%d ", nums[deque[front]]);
    }
    printf("]\n");
}

int main() {
    int nums[] = {1, 3, -1, -3, 5, 3, 6, 7};
    int n = 8, k = 3;
    max_sliding_window(nums, n, k);
    return 0;
}
