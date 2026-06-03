// zombie_demo.c – intentionally create a zombie (parent does not wait)
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main() {
    pid_t pid = fork();

    if (pid == -1) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        // Child process
        printf("Child (PID %d) is exiting. It will become a zombie.\n", getpid());
        exit(0);
    } else {
        // Parent process – does NOT wait
        printf("Parent (PID %d) created child %d\n", getpid(), pid);
        printf("Child is now a zombie. Run 'ps -l' in another terminal to see state 'Z'.\n");
        printf("Press Enter to exit parent. Then init will adopt and reap the zombie.\n");
        getchar();
        printf("Parent exiting. The zombie will be reaped by init.\n");
    }
    return 0;
}