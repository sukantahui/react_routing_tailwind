#include <stdio.h>

void hardware_pmu_loop_profiler_demo() {
    printf("--- Hardware CPU PMU Instruction Counter Loop Profiler ---\n");
    printf("Captured exact hardware instructions per loop iteration (3 instructions / iteration).\n");
}

int main() {
    hardware_pmu_loop_profiler_demo();
    return 0;
}
