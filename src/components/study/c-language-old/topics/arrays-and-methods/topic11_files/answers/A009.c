#include <stdio.h>

int main() {
    int n, arr[100], pos, val;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter position and value: ");
    scanf("%d %d", &pos, &val);
    if(pos < 0 || pos > n) {
        printf("Invalid position\n");
        return 0;
    }
    for(int i = n; i > pos; i--)
        arr[i] = arr[i-1];
    arr[pos] = val;
    n++;
    printf("Array after insertion: ");
    for(int i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    return 0;
}