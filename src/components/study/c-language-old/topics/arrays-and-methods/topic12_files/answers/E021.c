#include <stdio.h>

void findMissingRepeating(int arr[], int n) {
    int xor = 0;
    for (int i = 0; i < n; i++) xor ^= arr[i];
    for (int i = 1; i <= n; i++) xor ^= i;

    int setBit = xor & ~(xor - 1);
    int x = 0, y = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] & setBit) x ^= arr[i];
        else y ^= arr[i];
    }
    for (int i = 1; i <= n; i++) {
        if (i & setBit) x ^= i;
        else y ^= i;
    }

    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            printf("Repeating = %d, Missing = %d\n", x, y);
            return;
        }
    }
    printf("Repeating = %d, Missing = %d\n", y, x);
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    findMissingRepeating(arr, n);
    return 0;
}