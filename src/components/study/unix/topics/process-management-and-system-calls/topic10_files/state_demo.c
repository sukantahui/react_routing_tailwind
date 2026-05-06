// state_demo.c – demonstrate process state changes: running, sleeping, zombie
#include <stdio.h>
#include <unistd.h>
#include <sys/wait.h>
#include <stdlib.h>

int main() {
    printf("Parent PID: %d (state: R while running, S while sleeping)\n", getpid());

    pid_t pid = fork();
    if (pid == -1) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        // Child: will become zombie temporarily
        printf("Child PID: %d (state: R)\n", getpid());
        sleep(2);
        printf("Child exiting – will become Z (zombie) until parent waits\n");
        exit(0);
    } else {
        // Parent: not waiting yet – child becomes zombie
        printf("Parent sleeping for 5 seconds... (state: S)\n");
        sleep(5);
        printf("Parent calling wait() to reap zombie\n");
        wait(NULL);
        printf("Parent done. Exiting.\n");
    }
    return 0;
}