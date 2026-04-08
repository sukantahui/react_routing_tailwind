#include <stdio.h>
#include <string.h>

// Comparator function pointer type
typedef int (*Comparator)(const void*, const void*);

// Generic bubble sort (works on any data type)
void bubbleSort(void* base, size_t n, size_t size, Comparator cmp) {
    for (size_t i = 0; i < n - 1; i++) {
        for (size_t j = 0; j < n - i - 1; j++) {
            char* a = (char*)base + j * size;
            char* b = (char*)base + (j + 1) * size;
            if (cmp(a, b) > 0) {
                // swap a and b
                char temp[size];
                memcpy(temp, a, size);
                memcpy(a, b, size);
                memcpy(b, temp, size);
            }
        }
    }
}

int compareInt(const void* a, const void* b) {
    int ia = *(int*)a;
    int ib = *(int*)b;
    return ia - ib;
}

int compareIntDesc(const void* a, const void* b) {
    return compareInt(b, a);
}

int main() {
    int arr[] = {5, 2, 9, 1, 7};
    size_t n = sizeof(arr)/sizeof(arr[0]);
    
    bubbleSort(arr, n, sizeof(int), compareInt);
    for (size_t i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    
    bubbleSort(arr, n, sizeof(int), compareIntDesc);
    for (size_t i = 0; i < n; i++) printf("%d ", arr[i]);
    printf("\n");
    
    return 0;
}