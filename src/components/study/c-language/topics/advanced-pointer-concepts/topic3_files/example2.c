#include <stdio.h>
#include <limits.h>

// Function that returns multiple values using pointers
void analyzeArray(int arr[], int size, int *sum, int *avg, int *max, int *min) {
    if (arr == NULL || size <= 0) {
        *sum = 0;
        *avg = 0;
        *max = 0;
        *min = 0;
        return;
    }
    
    *sum = 0;
    *max = INT_MIN;
    *min = INT_MAX;
    
    for(int i = 0; i < size; i++) {
        *sum += arr[i];
        if(arr[i] > *max) *max = arr[i];
        if(arr[i] < *min) *min = arr[i];
    }
    
    *avg = *sum / size;
}

// Function to compute statistics for students
void computeStudentStats(int scores[], int count, int *highest, int *lowest, double *average) {
    if (count <= 0) return;
    
    *highest = scores[0];
    *lowest = scores[0];
    int sum = 0;
    
    for(int i = 0; i < count; i++) {
        sum += scores[i];
        if(scores[i] > *highest) *highest = scores[i];
        if(scores[i] < *lowest) *lowest = scores[i];
    }
    
    *average = (double)sum / count;
}

int main() {
    // Example 1: Array analysis
    int data[] = {12, 45, 23, 89, 34, 67, 91, 28, 56, 73};
    int size = sizeof(data) / sizeof(data[0]);
    int sum, avg, max, min;
    
    printf("=== Returning Multiple Values ===\n");
    analyzeArray(data, size, &sum, &avg, &max, &min);
    printf("Array: ");
    for(int i = 0; i < size; i++) printf("%d ", data[i]);
    printf("\nSum: %d, Average: %d, Max: %d, Min: %d\n\n", sum, avg, max, min);
    
    // Example 2: Student scores from Barrackpore CNAT
    int cnat_scores[] = {85, 92, 78, 88, 95, 87, 90, 84, 91, 89};
    int highest, lowest;
    double average;
    
    computeStudentStats(cnat_scores, 10, &highest, &lowest, &average);
    printf("Barrackpore CNAT Student Scores:\n");
    printf("Highest: %d, Lowest: %d, Average: %.2f\n", highest, lowest, average);
    
    return 0;
}