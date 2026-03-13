#include <stdio.h>

int main() {
    int n1, n2, a[100], b[100];
    printf("Enter size of first sorted array: ");
    scanf("%d", &n1);
    printf("Enter elements: ");
    for(int i = 0; i < n1; i++) scanf("%d", &a[i]);
    printf("Enter size of second sorted array: ");
    scanf("%d", &n2);
    printf("Enter elements: ");
    for(int i = 0; i < n2; i++) scanf("%d", &b[i]);
    // Union
    int i = 0, j = 0;
    printf("Union: ");
    while(i < n1 && j < n2) {
        if(a[i] < b[j]) printf("%d ", a[i++]);
        else if(b[j] < a[i]) printf("%d ", b[j++]);
        else { printf("%d ", a[i]); i++; j++; }
    }
    while(i < n1) printf("%d ", a[i++]);
    while(j < n2) printf("%d ", b[j++]);
    printf("\n");
    // Intersection
    i = 0; j = 0;
    printf("Intersection: ");
    while(i < n1 && j < n2) {
        if(a[i] < b[j]) i++;
        else if(b[j] < a[i]) j++;
        else { printf("%d ", a[i]); i++; j++; }
    }
    printf("\n");
    return 0;
}