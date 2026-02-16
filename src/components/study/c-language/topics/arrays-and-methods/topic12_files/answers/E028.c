#include <stdio.h>

int subarraysDivByK(int arr[], int n, int k) {
    int modCount[k];
    for (int i = 0; i < k; i++) modCount[i] = 0;
    int sum = 0, count = 0;
    modCount[0] = 1;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
        int mod = sum % k;
        if (mod < 0) mod += k;
        count += modCount[mod];
        modCount[mod]++;
    }
    return count;
}

int main() {
    int n, k, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter k: ");
    scanf("%d", &k);

    int count = subarraysDivByK(arr, n, k);
    printf("Number of subarrays = %d\n", count);
    return 0;
}