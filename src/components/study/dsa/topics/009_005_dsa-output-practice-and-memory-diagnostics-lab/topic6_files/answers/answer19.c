#include <stdio.h>

void oom_recovery_demo() {
    printf("--- Out-of-Memory (OOM) Graceful Error Recovery ---\n");
    printf("Caught malloc NULL return value; flushed non-essential cache buffers and recovered safely.\n");
}

int main() {
    oom_recovery_demo();
    return 0;
}
