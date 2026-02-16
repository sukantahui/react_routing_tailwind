#include <stdio.h>
#include <stdlib.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

void fourSum(int arr[], int n, int target) {
    qsort(arr, n, sizeof(int), compare);
    for (int i = 0; i < n - 3; i++) {
        if (i > 0 && arr[i] == arr[i - 1]) continue;
        for (int j = i + 1; j < n - 2; j++) {
            if (j > i + 1 && arr[j] == arr[j - 1]) continue;
            int left = j + 1, right = n - 1;
            while (left < right) {
                int sum = arr[i] + arr[j] + arr[left] + arr[right];
                if (sum == target) {
                    printf("[%d,%d,%d,%d] ", arr[i], arr[j], arr[left], arr[right]);
                    while (left < right && arr[left] == arr[left + 1]) left++;
                    while (left < right && arr[right] == arr[right - 1]) right--;
                    left++; right--;
                } else if (sum < target) left++;
                else right--;
            }
        }
    }
    printf("\n");
}

int main() {
    int n, target, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target: ");
    scanf("%d", &target);

    fourSum(arr, n, target);
    return 0;
}