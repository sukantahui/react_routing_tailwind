#include <stdio.h>

int main() {
    int n, arr[100], sorted = 1;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for(int i = 0; i < n-1; i++) {
        if(arr[i] > arr[i+1]) {
            sorted = 0;
            break;
        }
    }
    if(sorted) printf("Array is sorted.\n");
    else printf("Array is not sorted.\n");
    return 0;
}