#include <stdio.h>
#include <stdlib.h>

/* =====================================================================
 * BUILD AUTOMATION & MAKEFILE ANATOMY SIMULATION
 * =====================================================================
 * This program demonstrates how GNU Make orchestrates incremental builds
 * using targets, prerequisites, and automatic variables ($@, $<, $^).
 * ===================================================================== */

void displayMakefileExample(void) {
    printf("-----------------------------------------------------\n");
    printf("  INDUSTRIAL MAKEFILE TEMPLATE FOR MULTI-FILE C\n");
    printf("-----------------------------------------------------\n\n");

    const char *makeCode = 
        "# Compiler & Build Flags\n"
        "CC      := gcc\n"
        "CFLAGS  := -Wall -Wextra -Werror -O2 -std=c11 -Iinclude\n"
        "LDFLAGS :=\n"
        "\n"
        "# Directories\n"
        "SRC_DIR := src\n"
        "OBJ_DIR := obj\n"
        "BIN_DIR := bin\n"
        "\n"
        "# Source and Object Files\n"
        "SRCS    := $(wildcard $(SRC_DIR)/*.c)\n"
        "OBJS    := $(patsubst $(SRC_DIR)/%.c, $(OBJ_DIR)/%.o, $(SRCS))\n"
        "TARGET  := $(BIN_DIR)/student_system\n"
        "\n"
        "# Phony Targets (Prevent conflicts with files of the same name)\n"
        ".PHONY: all clean rebuild run\n"
        "\n"
        "# Default Target\n"
        "all: $(TARGET)\n"
        "\n"
        "# Linking Rule (Produces Final Binary)\n"
        "$(TARGET): $(OBJS) | $(BIN_DIR)\n"
        "\t$(CC) $(OBJS) -o $@ $(LDFLAGS)\n"
        "\t@echo \"[BUILD] Successfully linked binary: $@\"\n"
        "\n"
        "# Compilation Pattern Rule (Produces .o from .c)\n"
        "$(OBJ_DIR)/%.o: $(SRC_DIR)/%.c | $(OBJ_DIR)\n"
        "\t$(CC) $(CFLAGS) -c $< -o $@\n"
        "\t@echo \"[CC] Compiled $< -> $@\"\n"
        "\n"
        "# Directory Creation\n"
        "$(BIN_DIR) $(OBJ_DIR):\n"
        "\tmkdir -p $@\n"
        "\n"
        "# Clean Build Artifacts\n"
        "clean:\n"
        "\trm -rf $(OBJ_DIR) $(BIN_DIR)\n"
        "\t@echo \"[CLEAN] Removed build artifacts.\"\n";

    printf("%s\n", makeCode);
}

int main(void) {
    printf("=====================================================\n");
    printf("  Build Automation & Makefile Architecture in C\n");
    printf("=====================================================\n\n");

    printf(">>> 1. Inspecting Standard GNU Makefile Structure:\n\n");
    displayMakefileExample();

    printf("-----------------------------------------------------\n");
    printf(">>> 2. Automatic Variable Cheat Sheet:\n");
    printf("    $@  -> The target filename being generated.\n");
    printf("    $<  -> The FIRST prerequisite (usually source .c file).\n");
    printf("    $^  -> ALL prerequisites list (all required .o files).\n");
    printf("    $*  -> The stem matching a '%%' pattern rule.\n\n");

    printf(">>> 3. Incremental Build Logic:\n");
    printf("    Make checks file modification timestamps (mtime):\n");
    printf("    If source.c mtime > source.o mtime, source.c is recompiled.\n");
    printf("    If all .o files are up to date, Make outputs 'Nothing to be done.'\n");

    printf("\n=== Makefile Architecture Demonstration Completed ===\n");
    return EXIT_SUCCESS;
}
