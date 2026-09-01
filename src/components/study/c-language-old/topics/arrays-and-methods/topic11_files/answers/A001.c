#include <stdio.h>

int main() {
    int n, arr[100], sum = 0;
    float avg;
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for(int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
        sum += arr[i];
    }
    avg = (float)sum / n;
    printf("Sum = %d, Average = %.2f\n", sum, avg);
    return 0;
}