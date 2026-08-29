#include <stdio.h>
#include <stdbool.h>

bool two_sum(int arr[], int n, int target, int *out1, int *out2) {
    for (int i = 0; i < n; i++) {
        for (int j = i + 1; j < n; j++) {
            if (arr[i] + arr[j] == target) {
                *out1 = arr[i];
                *out2 = arr[j];
                return true;
            }
        }
    }
    return false;
}

int main() {
    int arr[] = {2, 7, 11, 15};
    int n = sizeof(arr) / sizeof(arr[0]);
    int target = 9;
    int val1, val2;

    printf("--- Two Sum Pair Locator ---\nTarget: %d\n", target);
    if (two_sum(arr, n, target, &val1, &val2)) {
        printf("Pair Found: %d + %d = %d\n", val1, val2, target);
    } else {
        printf("No pair found adding up to %d\n", target);
    }

    return 0;
}
