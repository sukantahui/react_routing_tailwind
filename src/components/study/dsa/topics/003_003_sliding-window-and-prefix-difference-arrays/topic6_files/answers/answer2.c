#include <stdio.h>

void first_negative_in_window(int arr[], int n, int k) {
    int queue[100]; int front = 0, rear = 0;
    printf("--- First Negative Number in Window K=%d ---\nFirst Negatives: [ ", k);
    for (int i = 0; i < n; i++) {
        if (arr[i] < 0) queue[rear++] = i;
        if (i >= k - 1) {
            while (front < rear && queue[front] <= i - k) front++;
            if (front < rear) printf("%d ", arr[queue[front]]);
            else printf("0 ");
        }
    }
    printf("]\n");
}

int main() {
    int arr[] = {-8, 2, 3, -6, 10};
    int n = 5, k = 2;
    first_negative_in_window(arr, n, k);
    return 0;
}
