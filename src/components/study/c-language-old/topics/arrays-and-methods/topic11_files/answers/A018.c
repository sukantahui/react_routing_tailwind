#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int j = 0;
    for(int i = 0; i < n; i++) {
        if(arr[i] != 0) {
            arr[j++] = arr[i];
        }
    }
    while(j < n) arr[j++] = 0;
    printf("Array after moving zeros: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}