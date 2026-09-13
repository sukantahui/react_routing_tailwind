#include <stdio.h>
#include <stdlib.h>

/* 1. Stringizing Operator (#): Converts macro parameter to string literal */
#define PRINT_EXPR(expr) \
    printf("Expression: %-20s = %d\n", #expr, (expr))

/* 2. Double-Stringizing helper to stringize expanded macros */
#define STR_HELPER(x) #x
#define STR(x) STR_HELPER(x)

#define VERSION_MAJOR 4
#define VERSION_MINOR 11

/* 3. Token Concatenation Operator (##): Pastes two tokens together into a single C identifier */
#define DECLARE_STRUCT(type, name) \
    typedef struct { \
        type value; \
        int id; \
    } Node_##name

/* Instantiate dynamic types using token concatenation */
DECLARE_STRUCT(int, Int);
DECLARE_STRUCT(float, Float);
DECLARE_STRUCT(char, Char);

/* 4. Action Command Generator via ## */
#define RUN_CMD(action) handle_cmd_##action()

void handle_cmd_start(void) { printf("    [Action] Starting telemetry service...\n"); }
void handle_cmd_stop(void)  { printf("    [Action] Stopping telemetry service...\n"); }
void handle_cmd_reset(void) { printf("    [Action] Resetting core parameters...\n"); }

int main(void) {
    printf("=====================================================\n");
    printf("  Preprocessor Metaprogramming: # and ## Operators\n");
    printf("=====================================================\n\n");

    /* 1. Stringizing in Action */
    printf(">>> 1. Stringizing Operator (#):\n");
    int a = 15, b = 25;
    PRINT_EXPR(a + b);
    PRINT_EXPR(a * b - 50);
    PRINT_EXPR((a < b) ? 100 : 200);

    /* 2. Stringizing Macro Constants */
    printf("\n>>> 2. Stringizing Expanded Macro Constants:\n");
    printf("    Build Version: %s\n", STR(VERSION_MAJOR) "." STR(VERSION_MINOR));

    /* 3. Token Concatenation in Action */
    printf("\n>>> 3. Token Concatenation (##) Struct Instantiation:\n");
    Node_Int nodeA = {42, 101};
    Node_Float nodeB = {3.14159f, 102};
    Node_Char nodeC = {'Z', 103};

    printf("    Node_Int   -> id: %d, value: %d\n", nodeA.id, nodeA.value);
    printf("    Node_Float -> id: %d, value: %.5f\n", nodeB.id, nodeB.value);
    printf("    Node_Char  -> id: %d, value: '%c'\n", nodeC.id, nodeC.value);

    /* 4. Command Dispatch via Token Pasting */
    printf("\n>>> 4. Dynamic Function Dispatch via Token Pasting:\n");
    RUN_CMD(start);
    RUN_CMD(reset);
    RUN_CMD(stop);

    printf("\n=== Metaprogramming Demonstration Completed Successfully ===\n");
    return EXIT_SUCCESS;
}
