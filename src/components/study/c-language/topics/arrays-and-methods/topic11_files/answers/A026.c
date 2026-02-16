#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int maxFromRight = arr[n-1];
    printf("Leaders: %d ", maxFromRight);
    for(int i = n-2; i >= 0; i--) {
        if(arr[i] > maxFromRight) {
            maxFromRight = arr[i];
            printf("%d ", arr[i]);
        }
    }
    printf("\n");
    return 0;
}