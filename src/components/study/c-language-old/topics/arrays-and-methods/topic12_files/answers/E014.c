#include <stdio.h>

void slidingWindowMax(int arr[], int n, int k) {
    int deque[100]; // store indices
    int front = 0, rear = -1;

    for (int i = 0; i < n; i++) {
        // remove elements out of window
        if (front <= rear && deque[front] <= i - k) front++;

        // remove smaller elements from rear
        while (front <= rear && arr[deque[rear]] <= arr[i]) rear--;

        deque[++rear] = i;

        if (i >= k - 1) printf("%d ", arr[deque[front]]);
    }
    printf("\n");
}

int main() {
    int n, k, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter k: ");
    scanf("%d", &k);

    printf("Window maxima: ");
    slidingWindowMax(arr, n, k);
    return 0;
}