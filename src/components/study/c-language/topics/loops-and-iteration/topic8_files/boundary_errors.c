/**
 * boundary_errors.c
 *
 * BUG: Does not handle empty input correctly.
 * Also, array index can become negative.
 * 
 * 🐞 What's wrong?
 *    - If n <= 0, the loop should not run, but it does.
 *    - Negative n causes i to go negative – undefined behaviour.
 */

#include <stdio.h>

int main() {
    int n;
    printf("How many numbers? ");
    scanf("%d", &n);

    int arr[100];  // assume max 100

    // BUG 1: loop runs even when n is 0 or negative
    for (int i = 0; i < n; i++) {
        arr[i] = i * 10;
    }

    // BUG 2: when n is negative, i goes further negative
    for (int i = 0; i < n; i++) {  // condition false if n <= 0? No, i < n is false if i=0, n=0? 0<0 false – good. But if n negative, i < n is false immediately? Actually if n = -5, i=0, 0 < -5 is false, so loop skipped – that part is fine. But earlier loop also skipped. So main bug is not checking n <= 0 before using arr.
        printf("%d ", arr[i]);
    }

    return 0;
}