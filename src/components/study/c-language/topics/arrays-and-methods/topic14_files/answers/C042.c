#include <stdio.h>
int main() {
    int arr[3] = {1, 2, 3};
    printf("%d", arr[5]);  // out-of-bounds access
    return 0;
}
