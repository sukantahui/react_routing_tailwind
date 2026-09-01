#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;   // points to arr[0]

    printf("p points to %d\n", *p);
    p = p + 2;
    printf("After p+2, points to %d\n", *p);
    p = p - 1;
    printf("After p-1, points to %d\n", *p);

    // Increment and decrement
    p++;   // now points to next element
    printf("After p++: %d\n", *p);
    p--;   // back
    printf("After p--: %d\n", *p);

    // Using compound assignment
    p += 3;
    printf("After p+=3: %d\n", *p);

    // Difference between pointers
    int *start = arr;
    int *end = &arr[4];
    printf("Number of elements between start and end: %ld\n", end - start);

    return 0;
}