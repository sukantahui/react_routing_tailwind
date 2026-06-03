// pipe_demo.c – parent sends message to child via pipe
#include <stdio.h>
#include <unistd.h>
#include <string.h>
#include <sys/wait.h>

int main() {
    int fd[2];
    if (pipe(fd) == -1) {
        perror("pipe");
        return 1;
    }

    pid_t pid = fork();
    if (pid == -1) {
        perror("fork");
        return 1;
    }

    if (pid == 0) {
        // Child: read from pipe
        close(fd[1]);  // close write end
        char buf[256];
        ssize_t n = read(fd[0], buf, sizeof(buf) - 1);
        if (n > 0) {
            buf[n] = '\0';
            printf("Child received: %s\n", buf);
        }
        close(fd[0]);
    } else {
        // Parent: write to pipe
        close(fd[0]);  // close read end
        const char *msg = "Hello from parent process!";
        write(fd[1], msg, strlen(msg) + 1);
        close(fd[1]);
        wait(NULL);
        printf("Parent: child reaped.\n");
    }
    return 0;
}