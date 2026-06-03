// simple_fork.c – minimal fork() demonstration
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    pid_t pid = fork();

    if (pid == -1) {
        perror("fork failed");
        return 1;
    }
    else if (pid == 0) {
        printf("CHILD:  PID = %d, Parent PID = %d\n", getpid(), getppid());
        // Child exits immediately – no zombie because parent will wait
    }
    else {
        // Parent waits for child to finish
        wait(NULL);
        printf("PARENT: PID = %d, Child PID = %d (reaped)\n", getpid(), pid);
    }
    return 0;
}