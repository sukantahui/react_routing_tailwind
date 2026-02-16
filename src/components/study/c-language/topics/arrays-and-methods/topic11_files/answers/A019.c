#include <stdio.h>

int main() {
    int n1, n2, a[100], b[100], merged[200];
    printf("Enter size of first array: ");
    scanf("%d", &n1);
    printf("Enter sorted elements: ");
    for(int i = 0; i < n1; i++) scanf("%d", &a[i]);
    printf("Enter size of second array: ");
    scanf("%d", &n2);
    printf("Enter sorted elements: ");
    for(int i = 0; i < n2; i++) scanf("%d", &b[i]);
    int i = 0, j = 0, k = 0;
    while(i < n1 && j < n2) {
        if(a[i] < b[j]) merged[k++] = a[i++];
        else merged[k++] = b[j++];
    }
    while(i < n1) merged[k++] = a[i++];
    while(j < n2) merged[k++] = b[j++];
    printf("Merged array: ");
    for(int idx = 0; idx < k; idx++) printf("%d ", merged[idx]);
    printf("\n");
    return 0;
}