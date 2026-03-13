#include <stdio.h>

int main() {
    int n, arr[100], even = 0, odd = 0;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        if(arr[i] % 2 == 0) even++;
        else odd++;
    }
    printf("Even: %d, Odd: %d\n", even, odd);
    return 0;
}