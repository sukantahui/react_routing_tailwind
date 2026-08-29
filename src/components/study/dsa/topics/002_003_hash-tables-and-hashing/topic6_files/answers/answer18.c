#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <limits.h>

void find_restaurant(char list1[][64], int n1, char list2[][64], int n2) {
    int min_sum = INT_MAX;
    char result[10][64];
    int result_count = 0;

    for (int i = 0; i < n1; i++) {
        for (int j = 0; j < n2; j++) {
            if (strcmp(list1[i], list2[j]) == 0) {
                int sum = i + j;
                if (sum < min_sum) {
                    min_sum = sum;
                    result_count = 0;
                    strcpy(result[result_count++], list1[i]);
                } else if (sum == min_sum) {
                    strcpy(result[result_count++], list1[i]);
                }
            }
        }
    }

    printf("--- Minimum Index Sum of Two Lists ---\n");
    for (int r = 0; r < result_count; r++) {
        printf("Common Restaurant with Minimum Index Sum: %s (Index Sum = %d)\n", result[r], min_sum);
    }
}

int main() {
    char list1[][64] = {"Shogun", "Tapioca Express", "Burger King", "KFC"};
    char list2[][64] = {"Piatti", "The Grill House", "Shogun", "Burger King"};

    find_restaurant(list1, 4, list2, 4);

    return 0;
}

