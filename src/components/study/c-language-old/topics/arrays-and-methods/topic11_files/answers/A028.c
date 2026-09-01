#include <stdio.h>

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    int total = 0, leftSum = 0;
    for(int i = 0; i < n; i++) total += arr[i];
    int found = -1;
    for(int i = 0; i < n; i++) {
        total -= arr[i];
        if(leftSum == total) {
            found = i;
            break;
        }
        leftSum += arr[i];
    }
    if(found != -1)
        printf("Equilibrium index found at %d\n", found);
    else
        printf("No equilibrium index\n");
    return 0;
}