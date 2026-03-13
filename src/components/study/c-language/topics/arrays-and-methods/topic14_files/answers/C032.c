#include <stdio.h>
int main() {
    int arr[5] = {5, 4, 3, 2, 1};
    int (*ptr)[5] = &arr;
    printf("%d", (*ptr)[0]);
    return 0;
}
