#include <stdio.h>

void printArraySize(int arr[]) {
    // Here arr is a pointer, not an array
    printf("Inside function: sizeof(arr) = %zu\n", sizeof(arr));  // prints pointer size
}

int main() {
    int nums[10] = {1,2,3,4,5,6,7,8,9,10};

    // In main, nums is an array
    printf("In main: sizeof(nums) = %zu\n", sizeof(nums));   // 40 (if int=4)

    // When passed, nums decays to pointer
    printArraySize(nums);

    // Demonstrating decay: arr == &arr[0]
    printf("nums = %p\n", (void*)nums);
    printf("&nums[0] = %p\n", (void*)&nums[0]);
    printf("&nums = %p (address of whole array)\n", (void*)&nums);

    return 0;
}