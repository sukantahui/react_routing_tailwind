// sched_demo.c – demonstrate nice, sched_yield, and real‑time policies
#define _GNU_SOURCE
#include <stdio.h>
#include <unistd.h>
#include <sys/resource.h>
#include <sched.h>
#include <errno.h>
#include <string.h>

int main() {
    printf("PID: %d\n", getpid());
    int old_nice = nice(0);
    printf("Current nice: %d\n", old_nice);
    
    // Lower priority (increase niceness)
    nice(10);
    printf("New nice after nice(10): %d\n", nice(0));
    
    // Voluntarily yield
    printf("Calling sched_yield()...\n");
    sched_yield();
    
    // Try to set SCHED_FIFO (requires root)
    struct sched_param param = { .sched_priority = 1 };
    if (sched_setscheduler(0, SCHED_FIFO, &param) == 0) {
        printf("Successfully set SCHED_FIFO priority 1\n");
    } else {
        perror("sched_setscheduler (run as root to enable)");
    }
    
    printf("Done.\n");
    return 0;
}