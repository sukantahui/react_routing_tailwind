#include <stdio.h>

int main() {
    int n, arr[100], max, min;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    max = min = arr[0];
    for(int i = 1; i < n; i++) {
        if(arr[i] > max) max = arr[i];
        if(arr[i] < min) min = arr[i];
    }
    printf("Maximum = %d, Minimum = %d\n", max, min);
    return 0;
}