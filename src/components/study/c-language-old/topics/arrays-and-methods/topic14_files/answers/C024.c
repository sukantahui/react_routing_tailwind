#include <stdio.h>
int main() {
    int arr[] = {4, -2, 3, -1, 2};
    int max_so_far = arr[0], curr_max = arr[0];
    for (int i = 1; i < 5; i++) {
        curr_max = (arr[i] > curr_max + arr[i]) ? arr[i] : curr_max + arr[i];
        max_so_far = (curr_max > max_so_far) ? curr_max : max_so_far;
    }
    printf("%d", max_so_far);
    return 0;
}
