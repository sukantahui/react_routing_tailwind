#include <stdio.h>

void sliding_window_max(int arr[], int n, int k) {
    int deque[100]; int front = 0, rear = -1;
    printf("--- Sliding Window Maximum (Monotonic Deque) ---\nWindow Maxima (K=%d): [ ", k);
    for (int i = 0; i < n; i++) {
        if (front <= rear && deque[front] <= i - k) front++;
        while (front <= rear && arr[deque[rear]] <= arr[i]) rear--;
        deque[++rear] = i;
        if (i >= k - 1) printf("%d ", arr[deque[front]]);
    }
    printf("]\n");
}

int main() {
    int arr[] = {1, 3, -1, -3, 5, 3, 6, 7};
    int n = 8, k = 3;
    sliding_window_max(arr, n, k);
    return 0;
}
