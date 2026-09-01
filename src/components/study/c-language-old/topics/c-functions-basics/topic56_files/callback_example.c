// callback_example.c – Using a function pointer as a callback with qsort
#include <stdio.h>
#include <stdlib.h>

// Comparator for ascending order
int compare_asc(const void *a, const void *b) {
    int ia = *(int *)a;
    int ib = *(int *)b;
    return ia - ib;
}

// Comparator for descending order
int compare_desc(const void *a, const void *b) {
    int ia = *(int *)a;
    int ib = *(int *)b;
    return ib - ia;
}

// Function that prints an array
void print_array(int *arr, int n) {
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");
}

int main() {
    int arr[] = {5, 2, 8, 1, 9, 3};
    int n = sizeof(arr) / sizeof(arr[0]);

    printf("Original: ");
    print_array(arr, n);

    // qsort takes a function pointer comparator
    qsort(arr, n, sizeof(int), compare_asc);
    printf("Ascending: ");
    print_array(arr, n);

    qsort(arr, n, sizeof(int), compare_desc);
    printf("Descending: ");
    print_array(arr, n);

    return 0;
}