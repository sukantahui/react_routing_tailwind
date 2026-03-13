#include <stdio.h>

int main() {
    int n, arr[100], rev[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    for(int i = 0; i < n; i++) rev[i] = arr[n-1-i];
    printf("Reversed array: ");
    for(int i = 0; i < n; i++) printf("%d ", rev[i]);
    printf("\n");
    return 0;
}