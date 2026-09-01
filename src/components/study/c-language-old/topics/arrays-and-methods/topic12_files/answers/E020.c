#include <stdio.h>

int findDuplicate(int arr[], int n) {
    int slow = arr[0], fast = arr[0];
    do {
        slow = arr[slow];
        fast = arr[arr[fast]];
    } while (slow != fast);

    slow = arr[0];
    while (slow != fast) {
        slow = arr[slow];
        fast = arr[fast];
    }
    return slow;
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    int dup = findDuplicate(arr, n);
    printf("Duplicate number = %d\n", dup);
    return 0;
}