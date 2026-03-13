#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int first = arr[0];
    for(int i = 0; i < n-1; i++)
        arr[i] = arr[i+1];
    arr[n-1] = first;
    printf("Array after left rotation: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}