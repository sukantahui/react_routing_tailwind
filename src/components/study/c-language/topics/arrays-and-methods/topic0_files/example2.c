#include <stdio.h>

int main() {
    // Initialize array at declaration
    int marks[5] = {89, 72, 94, 68, 77};

    // You can also partially initialize; remaining elements become 0
    int scores[5] = {85, 90};  // scores[0]=85, scores[1]=90, scores[2..4]=0

    // Print all marks using a loop
    for (int i = 0; i < 5; i++) {
        printf("marks[%d] = %d\n", i, marks[i]);
    }

    return 0;
}
