#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Comparator for integers
int cmp_int(const void* a, const void* b) {
    return *(int*)a - *(int*)b;
}

// Comparator for strings (alphabetical)
int cmp_string(const void* a, const void* b) {
    return strcmp(*(const char**)a, *(const char**)b);
}

int main() {
    // Integer array
    int nums[] = {42, 17, 8, 99, 23};
    size_t n_nums = sizeof(nums)/sizeof(nums[0]);
    qsort(nums, n_nums, sizeof(int), cmp_int);
    printf("Sorted ints: ");
    for (size_t i = 0; i < n_nums; i++) printf("%d ", nums[i]);
    printf("\n");
    
    // String array (array of pointers)
    const char* fruits[] = {"banana", "apple", "cherry", "date"};
    size_t n_fruits = sizeof(fruits)/sizeof(fruits[0]);
    qsort(fruits, n_fruits, sizeof(const char*), cmp_string);
    printf("Sorted strings: ");
    for (size_t i = 0; i < n_fruits; i++) printf("%s ", fruits[i]);
    printf("\n");
    
    return 0;
}