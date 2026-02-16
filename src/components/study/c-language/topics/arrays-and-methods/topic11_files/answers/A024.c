#include <stdio.h>

int binarySearch(int arr[], int low, int high, int key) {
    while(low <= high) {
        int mid = low + (high - low) / 2;
        if(arr[mid] == key) return mid;
        if(arr[mid] < key) low = mid + 1;
        else high = mid - 1;
    }
    return -1;
}

int main() {
    int n, arr[100], key;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter sorted elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to search: ");
    scanf("%d", &key);
    int index = binarySearch(arr, 0, n-1, key);
    if(index != -1)
        printf("Element %d found at index %d\n", key, index);
    else
        printf("Element not found\n");
    return 0;
}