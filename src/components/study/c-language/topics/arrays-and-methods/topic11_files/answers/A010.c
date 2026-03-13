#include <stdio.h>

int main() {
    int n, arr[100], pos;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter position to delete: ");
    scanf("%d", &pos);
    if(pos < 0 || pos >= n) {
        printf("Invalid position\n");
        return 0;
    }
    for(int i = pos; i < n-1; i++)
        arr[i] = arr[i+1];
    n--;
    printf("Array after deletion: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}