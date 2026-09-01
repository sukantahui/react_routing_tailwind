#include <stdio.h>

int main() {
    int n, arr[100], target, found = 0;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);
    for(int i = 0; i < n-1; i++) {
        for(int j = i+1; j < n; j++) {
            if(arr[i] + arr[j] == target) {
                printf("Pair found: %d + %d = %d\n", arr[i], arr[j], target);
                found = 1;
                break;
            }
        }
        if(found) break;
    }
    if(!found) printf("No pair found\n");
    return 0;
}