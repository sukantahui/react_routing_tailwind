#include <stdio.h>
#include <stdlib.h>

int cmp(const void *a, const void *b) {
    return *(int*)a - *(int*)b;
}

void findTriplets(int arr[], int n) {
    qsort(arr, n, sizeof(int), cmp);
    printf("Triplets: ");
    int found = 0;
    for (int i = 0; i < n-2; i++) {
        if (i > 0 && arr[i] == arr[i-1]) continue;
        int left = i+1, right = n-1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (sum == 0) {
                printf("[%d, %d, %d] ", arr[i], arr[left], arr[right]);
                found = 1;
                while (left < right && arr[left] == arr[left+1]) left++;
                while (left < right && arr[right] == arr[right-1]) right--;
                left++; right--;
            } else if (sum < 0) {
                left++;
            } else {
                right--;
            }
        }
    }
    if (!found) printf("None");
    printf("\n");
}

int main() {
    int n;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    findTriplets(arr, n);
    return 0;
}
