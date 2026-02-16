#include <stdio.h>

// Linear search: returns index of first occurrence, or -1 if not found
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;  // found
        }
    }
    return -1;  // not found
}

int main() {
    int marks[] = {67, 78, 89, 90, 85};
    int n = sizeof(marks) / sizeof(marks[0]);
    int searchFor = 89;

    int index = linearSearch(marks, n, searchFor);
    if (index != -1) {
        printf("Value %d found at index %d.\n", searchFor, index);
    } else {
        printf("Value %d not found.\n", searchFor);
    }

    // Search for a value not present
    searchFor = 100;
    index = linearSearch(marks, n, searchFor);
    if (index != -1) {
        printf("Value %d found at index %d.\n", searchFor, index);
    } else {
        printf("Value %d not found.\n", searchFor);
    }

    return 0;
}
#include <stdio.h>

// Linear search: returns index of first occurrence, or -1 if not found
int linearSearch(int arr[], int n, int key) {
    for (int i = 0; i < n; i++) {
        if (arr[i] == key) {
            return i;  // found
        }
    }
    return -1;  // not found
}

int main() {
    int marks[] = {67, 78, 89, 90, 85};
    int n = sizeof(marks) / sizeof(marks[0]);
    int searchFor = 89;

    int index = linearSearch(marks, n, searchFor);
    if (index != -1) {
        printf("Value %d found at index %d.\n", searchFor, index);
    } else {
        printf("Value %d not found.\n", searchFor);
    }

    // Search for a value not present
    searchFor = 100;
    index = linearSearch(marks, n, searchFor);
    if (index != -1) {
        printf("Value %d found at index %d.\n", searchFor, index);
    } else {
        printf("Value %d not found.\n", searchFor);
    }

    return 0;
}