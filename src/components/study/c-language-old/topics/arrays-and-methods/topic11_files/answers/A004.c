#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for(int i = 0, j = n-1; i < j; i++, j--) {
        int temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
    }
    printf("Reversed array: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}