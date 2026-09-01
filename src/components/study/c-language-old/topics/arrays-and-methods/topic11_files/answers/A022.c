#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for(int i = 0; i < n-1; i++) {
        int minIdx = i;
        for(int j = i+1; j < n; j++) {
            if(arr[j] < arr[minIdx])
                minIdx = j;
        }
        int temp = arr[i];
        arr[i] = arr[minIdx];
        arr[minIdx] = temp;
    }
    printf("Sorted array: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}