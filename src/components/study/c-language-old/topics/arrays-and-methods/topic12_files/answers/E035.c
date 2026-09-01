#include <stdio.h>

int longestConsecutive(int arr[], int n) {
    if (n == 0) return 0;
    // simple bubble sort (for clarity)
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                int t = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = t;
            }
        }
    }

    int longest = 1, current = 1;
    for (int i = 1; i < n; i++) {
        if (arr[i] == arr[i - 1]) continue;
        if (arr[i] == arr[i - 1] + 1) current++;
        else {
            if (current > longest) longest = current;
            current = 1;
        }
    }
    if (current > longest) longest = current;
    return longest;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int len = longestConsecutive(arr, n);
    printf("Longest consecutive length = %d\n", len);
    return 0;
}