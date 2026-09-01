#include <stdio.h>

const double gravity = 9.81;   // global const
const int max_retries = 3;

void process() {
    const int local_max = 100;  // local const
    printf("Local max: %d\n", local_max);
}

int main() {
    printf("Gravity: %.2f m/s²\n", gravity);
    printf("Max retries: %d\n", max_retries);
    process();
    
    // max_retries = 5;  // Error: const variable cannot be modified
    return 0;
}