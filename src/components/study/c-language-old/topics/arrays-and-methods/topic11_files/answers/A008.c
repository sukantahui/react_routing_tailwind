#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter sorted elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int j = 0;
    for(int i = 0; i < n; i++) {
        if(arr[i] != arr[i+1]) {
            arr[j++] = arr[i];
        }
    }
    printf("Array after removing duplicates: ");
    for(int i = 0; i < j; i++) printf("%d ", arr[i]);
    printf("\nNew length = %d\n", j);
    return 0;
}