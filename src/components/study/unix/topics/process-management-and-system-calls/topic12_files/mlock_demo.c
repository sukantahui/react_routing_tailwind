// mlock_demo.c – demonstrate mlock() to prevent swapping
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/mman.h>
#include <unistd.h>
#include <errno.h>

int main() {
    size_t size = 10 * 1024 * 1024; // 10 MB
    char *buffer = malloc(size);
    if (!buffer) {
        perror("malloc");
        return 1;
    }

    memset(buffer, 'A', size); // touch pages

    printf("Locking %zu bytes of memory...\n", size);
    if (mlock(buffer, size) == 0) {
        printf("Memory locked successfully. These pages will not be swapped out.\n");
    } else {
        perror("mlock (try running as root or set ulimit -l unlimited)");
        free(buffer);
        return 1;
    }

    printf("Press Enter to unlock and free memory...\n");
    getchar();

    if (munlock(buffer, size) == 0) {
        printf("Memory unlocked.\n");
    } else {
        perror("munlock");
    }

    free(buffer);
    return 0;
}