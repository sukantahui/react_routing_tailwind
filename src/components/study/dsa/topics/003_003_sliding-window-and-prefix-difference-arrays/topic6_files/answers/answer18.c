#include <stdio.h>

int max(int a, int b) { return (a > b) ? a : b; }

int total_fruit(int fruits[], int n) {
    int count[100] = {0};
    int left = 0, distinct = 0, max_fruits = 0;

    for (int right = 0; right < n; right++) {
        if (count[fruits[right]] == 0) distinct++;
        count[fruits[right]]++;

        while (distinct > 2) {
            count[fruits[left]]--;
            if (count[fruits[left]] == 0) distinct--;
            left++;
        }
        max_fruits = max(max_fruits, right - left + 1);
    }
    return max_fruits;
}

int main() {
    int fruits[] = {1, 2, 1, 2, 3};
    int n = 5;
    printf("--- Fruit Into Baskets (At Most 2 Types) ---\n");
    printf("Maximum Harvested Fruits = %d\n", total_fruit(fruits, n));
    return 0;
}
