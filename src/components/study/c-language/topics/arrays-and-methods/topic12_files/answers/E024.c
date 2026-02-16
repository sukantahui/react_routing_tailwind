#include <stdio.h>

#define MAX 10000

int main() {
    int n, target, arr[100];
    printf("Enter size: ");
    scanf("%d", &n);
    printf("Enter elements: ");
    for (int i = 0; i < n; i++) scanf("%d", &arr[i]);
    printf("Enter target sum: ");
    scanf("%d", &target);

    int freq[MAX * 2 + 1] = {0}; // offset to handle negatives
    int offset = MAX;

    for (int i = 0; i < n; i++) {
        int complement = target - arr[i];
        if (freq[complement + offset] > 0) {
            for (int j = 0; j < freq[complement + offset]; j++)
                printf("(%d,%d) ", complement, arr[i]);
        }
        freq[arr[i] + offset]++;
    }
    printf("\n");
    return 0;
}