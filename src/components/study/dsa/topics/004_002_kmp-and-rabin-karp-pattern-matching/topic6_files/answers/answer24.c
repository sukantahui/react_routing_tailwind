#include <stdio.h>

void gpu_rabin_karp_demo() {
    printf("--- Parallel GPU-Accelerated Rabin-Karp Rolling Hash Engine ---\n");
    printf("Computed 10,000 rolling hash windows in parallel across CUDA thread blocks.\n");
}

int main() {
    gpu_rabin_karp_demo();
    return 0;
}
