#include <stdio.h>

int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++)
        if (arr[i] == key) return i;
    return -1;
}

int main() {
    int n, key;
    printf("Enter size: ");
    scanf("%d", &n);
    int arr[n];
    printf("Enter elements: ");
    for (int i = 0; i < n; i++)
        scanf("%d", &arr[i]);
    printf("Enter key: ");
    scanf("%d", &key);
    int index = linearSearch(arr, n, key);
    if (index != -1)
        printf("Key found at index %d\n", index);
    else
        printf("Key not found\n");
    return 0;
}
