#include <stdio.h>

void sortColors(int arr[], int n) {
    int low = 0, mid = 0, high = n - 1;
    while (mid <= high) {
        switch (arr[mid]) {
            case 0:
                int temp = arr[low];
                arr[low] = arr[mid];
                arr[mid] = temp;
                low++; mid++;
                break;
            case 1:
                mid++;
                break;
            case 2:
                temp = arr[mid];
                arr[mid] = arr[high];
                arr[high] = temp;
                high--;
                break;
        }
    }
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements (0,1,2): ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    sortColors(arr, n);

    printf("Sorted array: ");
    for (int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}