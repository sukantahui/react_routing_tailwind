#include <stdio.h>
#include <limits.h>

int main() {
    int n, arr[100];
    int first, second;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    first = second = INT_MIN;
    for(int i = 0; i < n; i++) {
        if(arr[i] > first) {
            second = first;
            first = arr[i];
        } else if(arr[i] > second && arr[i] != first) {
            second = arr[i];
        }
    }
    if(second == INT_MIN)
        printf("No second largest\n");
    else
        printf("Second largest = %d\n", second);
    return 0;
}