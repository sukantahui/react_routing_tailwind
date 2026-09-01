#include <stdio.h>

int jump(int arr[], int n) {
    int jumps = 0, currentEnd = 0, farthest = 0;
    for (int i = 0; i < n - 1; i++) {
        if (i + arr[i] > farthest) farthest = i + arr[i];
        if (i == currentEnd) {
            jumps++;
            currentEnd = farthest;
        }
    }
    return jumps;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter jump distances: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int minJumps = jump(arr, n);
    printf("Minimum jumps = %d\n", minJumps);
    return 0;
}