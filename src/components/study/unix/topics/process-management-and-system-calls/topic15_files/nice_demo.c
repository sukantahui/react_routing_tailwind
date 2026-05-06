// nice_demo.c – demonstrate nice() system call
#include <stdio.h>
#include <unistd.h>
#include <errno.h>
#include <sys/resource.h>
#include <stdlib.h>

int main() {
    int old_nice = nice(0);
    if (old_nice == -1 && errno != 0) {
        perror("nice(0)");
        return 1;
    }
    printf("Current nice: %d\n", old_nice);

    // Increase nice by 10 (lower priority)
    int new_nice = nice(10);
    if (new_nice == -1 && errno != 0) {
        perror("nice(10)");
        return 1;
    }
    printf("After nice(10): %d\n", new_nice);

    // Try to set negative nice (requires root)
    errno = 0;
    int neg = nice(-20);
    if (neg == -1 && errno != 0) {
        perror("nice(-20) failed (expected unless root)");
    } else {
        printf("After nice(-20): %d\n", neg);
    }

    // Get current priority via getpriority (alternative)
    int prio = getpriority(PRIO_PROCESS, 0);
    printf("getpriority() says: %d\n", prio);

    return 0;
}