#include <stdio.h>
#include <stdbool.h>

bool is_disjoint(int arr1[], int n1, int arr2[], int n2) {
    bool hash_set[1000] = {false};
    for (int i = 0; i < n1; i++) hash_set[arr1[i]] = true;
    for (int j = 0; j < n2; j++) if (hash_set[arr2[j]]) return false;
    return true;
}

int main() {
    int a1[] = {10, 50, 90};
    int a2[] = {20, 30, 40};
    printf("--- Disjoint Array Tester using Hash Set ---\n");
    if (is_disjoint(a1, 3, a2, 3)) printf("Arrays are completely DISJOINT (No common elements)!\n");
    else printf("Arrays share common elements.\n");
    return 0;
}
