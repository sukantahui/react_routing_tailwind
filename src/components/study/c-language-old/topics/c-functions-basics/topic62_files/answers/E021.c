#include <stdio.h>

void findMissingRepeating(int arr[], int n, int *repeat, int *miss) {
    int xor = 0;
    for (int i = 0; i < n; i++) xor ^= arr[i];
    for (int i = 1; i <= n; i++) xor ^= i;

    int set_bit = xor & ~(xor - 1);
    int x = 0, y = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] & set_bit) x ^= arr[i];
        else y ^= arr[i];
    }
    for (int i = 1; i <= n; i++) {
        if (i & set_bit) x ^= i;
        else y ^= i;
    }

    // Find which is repeating and which is missing
    for (int i = 0; i < n; i++) {
        if (arr[i] == x) {
            *repeat = x;
            *miss = y;
            return;
        }
    }
    *repeat = y;
    *miss = x;
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int repeat, miss;
    findMissingRepeating(arr, n, &repeat, &miss);
    printf("Repeating = %d, Missing = %d\n", repeat, miss);
    return 0;
}
