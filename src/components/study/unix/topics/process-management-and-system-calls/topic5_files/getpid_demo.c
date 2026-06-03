// getpid_demo.c – demonstrate getpid() and getppid()
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>

int main() {
    printf("I am the original process. My PID = %d, my parent PID = %d\n", getpid(), getppid());

    pid_t child = fork();
    if (child == -1) {
        perror("fork");
        return 1;
    }

    if (child == 0) {
        // Child process
        printf("Child:  PID = %d, PPID = %d\n", getpid(), getppid());
        // Simulate work
        sleep(1);
    } else {
        // Parent process
        printf("Parent: PID = %d, my child's PID = %d, my PPID = %d\n", getpid(), child, getppid());
        wait(NULL); // wait for child
    }
    return 0;
}