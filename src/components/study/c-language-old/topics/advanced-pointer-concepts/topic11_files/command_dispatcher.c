#include <stdio.h>
#include <string.h>
#include <stdlib.h>

// Command handler functions
void cmd_help() {
    printf("Available commands: help, say <msg>, quit\n");
}
void cmd_say(char* arg) {
    if (arg) printf("You said: %s\n", arg);
    else printf("Say what?\n");
}
void cmd_quit() {
    printf("Goodbye!\n");
    exit(0);
}

// Struct linking command name to function
typedef struct {
    const char* name;
    void (*func)(char*);
} Command;

// Dispatch table
Command commands[] = {
    {"help", cmd_help},
    {"say", cmd_say},
    {"quit", cmd_quit},
    {NULL, NULL}  // sentinel
};

int main() {
    char input[100];
    while (1) {
        printf("> ");
        fgets(input, sizeof(input), stdin);
        input[strcspn(input, "\n")] = '\0';  // remove newline
        
        // Parse command and argument
        char* cmd_str = strtok(input, " ");
        char* arg = strtok(NULL, "");
        
        // Lookup command in dispatch table
        int found = 0;
        for (int i = 0; commands[i].name != NULL; i++) {
            if (strcmp(cmd_str, commands[i].name) == 0) {
                commands[i].func(arg);
                found = 1;
                break;
            }
        }
        if (!found) printf("Unknown command. Type 'help'\n");
    }
    return 0;
}