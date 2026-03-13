// ❌ Bad: too many responsibilities, not reusable
#include <stdio.h>

// This function does everything: input, calculation, output
void processNumbers() {
    int n;
    printf("Enter how many numbers: ");
    scanf("%d", &n);

    int arr[100];
    printf("Enter %d numbers: ", n);
    for (int i = 0; i < n; i++) {
        scanf("%d", &arr[i]);
    }

    // calculate and print primes (mixed concerns)
    for (int i = 0; i < n; i++) {
        int num = arr[i];
        int isPrime = 1;
        if (num <= 1) isPrime = 0;
        for (int j = 2; j * j <= num; j++) {
            if (num % j == 0) {
                isPrime = 0;
                break;
            }
        }
        if (isPrime)
            printf("%d is prime\n", num);
        else
            printf("%d is not prime\n", num);
    }
}

int main() {
    processNumbers(); // Can't reuse the prime logic elsewhere
    return 0;
}