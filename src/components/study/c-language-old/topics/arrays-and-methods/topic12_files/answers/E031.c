#include <stdio.h>

void majorityElement(int arr[], int n) {
    int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == candidate1) count1++;
        else if (arr[i] == candidate2) count2++;
        else if (count1 == 0) { candidate1 = arr[i]; count1 = 1; }
        else if (count2 == 0) { candidate2 = arr[i]; count2 = 1; }
        else { count1--; count2--; }
    }
    count1 = count2 = 0;
    for (int i = 0; i < n; i++) {
        if (arr[i] == candidate1) count1++;
        else if (arr[i] == candidate2) count2++;
    }
    printf("Majority elements ( > n/3 ): ");
    if (count1 > n / 3) printf("%d ", candidate1);
    if (count2 > n / 3) printf("%d ", candidate2);
    printf("\n");
}

int main() {
    int n, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);

    majorityElement(arr, n);
    return 0;
}