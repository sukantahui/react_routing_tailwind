#include <stdio.h>

// O(n) – linear search
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) { // loop runs up to n times
        if (arr[i] == key) {
            return i; // found
        }
    }
    return -1; // not found
}

int main() {
    int arr[] = {10, 23, 45, 67, 89, 12, 34, 56, 78, 90};
    int n = sizeof(arr) / sizeof(arr[0]);

    int key = 89;
    int index = linearSearch(arr, n, key);
    if (index != -1)
        printf("Found %d at index %d\n", key, index);
    else
        printf("%d not found\n", key);

    // Worst case: searching for a value not in array (checks all n elements)
    key = 99;
    index = linearSearch(arr, n, key);
    printf("Search for %d: %d iterations (worst case O(n))\n", key, index == -1 ? n : index);

    return 0;
}