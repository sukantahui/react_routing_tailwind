#include <stdio.h>

#define MAX 10000

int subarraySum(int arr[], int n, int k) {
    int count = 0;
    for (int i = 0; i < n; i++) {
        int sum = 0;
        for (int j = i; j < n; j++) {
            sum += arr[j];
            if (sum == k) count++;
        }
    }
    return count;
}

int main() {
    int n, k, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target: ");
    scanf("%d", &k);

    int count = subarraySum(arr, n, k);
    printf("Number of subarrays = %d\n", count);
    return 0;
}