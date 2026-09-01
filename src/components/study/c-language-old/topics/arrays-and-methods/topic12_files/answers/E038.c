#include <stdio.h>

int canJump(int arr[], int n) {
    int reachable = 0;
    for (int i = 0; i < n; i++) {
        if (i > reachable) return 0;
        if (i + arr[i] > reachable) reachable = i + arr[i];
    }
    return 1;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter jump distances: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    if (canJump(arr, n))
        printf("Can reach last index.\n");
    else
        printf("Cannot reach last index.\n");
    return 0;
}