#include <stdio.h>

int main() {
    int arr[10]; // fixed size – what if we need more?
    int n;

    printf("How many numbers? ");
    scanf("%d", &n);

    if (n > 10) {
        printf("Error: too many numbers, buffer overflow!\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        printf("Enter number %d: ", i+1);
        scanf("%d", &arr[i]);
    }

    printf("You entered: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
    return 0;
}