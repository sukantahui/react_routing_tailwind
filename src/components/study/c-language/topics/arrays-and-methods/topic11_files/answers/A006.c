#include <stdio.h>

int main() {
    int n, arr[100], key, pos = -1;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter element to search: ");
    scanf("%d", &key);
    for(int i = 0; i < n; i++) {
        if(arr[i] == key) {
            pos = i;
            break;
        }
    }
    if(pos != -1)
        printf("Element %d found at index %d\n", key, pos);
    else
        printf("Element not found\n");
    return 0;
}