#include <stdio.h>
#include <stdlib.h>
#include <limits.h>

int compare(const void *a, const void *b) {
    return (*(int*)a - *(int*)b);
}

int threeSumClosest(int arr[], int n, int target) {
    qsort(arr, n, sizeof(int), compare);
    int closest = arr[0] + arr[1] + arr[2];
    for (int i = 0; i < n - 2; i++) {
        int left = i + 1, right = n - 1;
        while (left < right) {
            int sum = arr[i] + arr[left] + arr[right];
            if (abs(sum - target) < abs(closest - target))
                closest = sum;
            if (sum < target) left++;
            else if (sum > target) right--;
            else return sum;
        }
    }
    return closest;
}

int main() {
    int n, target, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target: ");
    scanf("%d", &target);

    int closest = threeSumClosest(arr, n, target);
    printf("Closest sum = %d\n", closest);
    return 0;
}