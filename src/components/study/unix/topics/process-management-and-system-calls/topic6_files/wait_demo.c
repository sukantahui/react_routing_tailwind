// wait_demo.c – demonstrate wait() and waitpid()
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>

int main() {
    printf("Parent PID: %d\n", getpid());

    pid_t pid1 = fork();
    if (pid1 == 0) {
        // Child 1: exit with code 1
        sleep(1);
        printf("Child 1 (PID %d) exiting with code 1\n", getpid());
        exit(1);
    }

    pid_t pid2 = fork();
    if (pid2 == 0) {
        // Child 2: exit with code 2
        sleep(2);
        printf("Child 2 (PID %d) exiting with code 2\n", getpid());
        exit(2);
    }

    // Parent: wait for both
    int status;
    pid_t child;
    while ((child = wait(&status)) > 0) {
        if (WIFEXITED(status)) {
            printf("Parent: child %d exited with status %d\n", child, WEXITSTATUS(status));
        } else if (WIFSIGNALED(status)) {
            printf("Parent: child %d killed by signal %d\n", child, WTERMSIG(status));
        }
    }

    printf("Parent: all children reaped\n");
    return 0;
}