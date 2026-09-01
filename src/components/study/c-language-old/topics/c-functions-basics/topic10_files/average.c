#include <stdio.h>

// Function that computes the average of an integer array
float average(int arr[], int n) {
    int sum = 0;
    for (int i = 0; i < n; i++) {
        sum += arr[i];
    }
    return (float)sum / n;
}

int main() {
    int marks[] = {85, 92, 78, 96};
    float avg = average(marks, 4);
    printf("Average mark = %.2f\n", avg);
    return 0;
}