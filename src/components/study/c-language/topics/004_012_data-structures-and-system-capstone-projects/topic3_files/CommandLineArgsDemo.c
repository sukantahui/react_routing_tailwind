#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdbool.h>

/* Structure representing parsed CLI configuration */
typedef struct {
    char *inputFileName;
    char *outputFileName;
    int verbosityLevel;
    bool isDryRun;
    bool showHelp;
} CliConfig;

/* Helper to display CLI usage manual */
void printUsage(const char *progName) {
    printf("Usage: %s [OPTIONS] -i <input_file>\n", progName);
    printf("Options:\n");
    printf("  -i, --input <file>     Specify input data file (Required)\n");
    printf("  -o, --output <file>    Specify output file (Default: out.dat)\n");
    printf("  -v, --verbose          Increase verbosity level\n");
    printf("  -d, --dry-run          Simulate execution without modifying files\n");
    printf("  -h, --help             Display this help message and exit\n");
}

/* Parse command-line arguments manually without third-party dependencies */
bool parseArguments(int argc, char *argv[], CliConfig *config) {
    /* Initialize default configuration values */
    config->inputFileName = NULL;
    config->outputFileName = "out.dat";
    config->verbosityLevel = 0;
    config->isDryRun = false;
    config->showHelp = false;

    for (int i = 1; i < argc; i++) {
        if (strcmp(argv[i], "-h") == 0 || strcmp(argv[i], "--help") == 0) {
            config->showHelp = true;
            return true;
        } else if (strcmp(argv[i], "-v") == 0 || strcmp(argv[i], "--verbose") == 0) {
            config->verbosityLevel++;
        } else if (strcmp(argv[i], "-d") == 0 || strcmp(argv[i], "--dry-run") == 0) {
            config->isDryRun = true;
        } else if (strcmp(argv[i], "-i") == 0 || strcmp(argv[i], "--input") == 0) {
            if (i + 1 < argc) {
                config->inputFileName = argv[++i];
            } else {
                fprintf(stderr, "Error: Option '%s' requires a file argument.\n", argv[i]);
                return false;
            }
        } else if (strcmp(argv[i], "-o") == 0 || strcmp(argv[i], "--output") == 0) {
            if (i + 1 < argc) {
                config->outputFileName = argv[++i];
            } else {
                fprintf(stderr, "Error: Option '%s' requires a file argument.\n", argv[i]);
                return false;
            }
        } else {
            fprintf(stderr, "Error: Unrecognized option '%s'.\n", argv[i]);
            return false;
        }
    }

    if (config->inputFileName == NULL) {
        fprintf(stderr, "Error: Missing required argument '-i <input_file>'.\n");
        return false;
    }

    return true;
}

int main(int argc, char *argv[]) {
    printf("=====================================================\n");
    printf("  C Command-Line Argument Processing (argc / argv)\n");
    printf("=====================================================\n\n");

    printf(">>> 1. Raw CLI Argument Inspection:\n");
    printf("    Total argument count (argc) = %d\n", argc);
    for (int i = 0; i < argc; i++) {
        printf("    argv[%d] = \"%s\"\n", i, argv[i]);
    }

    printf("\n-----------------------------------------------------\n");
    printf(">>> 2. Parsing Simulated CLI Options:\n");

    /* Simulated arguments for demonstration purposes */
    char *simulatedArgv[] = {
        argv[0],
        "-i", "students.csv",
        "-o", "report.dat",
        "-v", "-v",
        "--dry-run"
    };
    int simulatedArgc = sizeof(simulatedArgv) / sizeof(simulatedArgv[0]);

    printf("    Parsing simulated arguments: ");
    for (int i = 0; i < simulatedArgc; i++) printf("%s ", simulatedArgv[i]);
    printf("\n\n");

    CliConfig config;
    if (parseArguments(simulatedArgc, simulatedArgv, &config)) {
        printf(">>> Parsed Configuration Result:\n");
        printf("    Input File  : %s\n", config.inputFileName);
        printf("    Output File : %s\n", config.outputFileName);
        printf("    Verbosity   : %d (Levels of debug)\n", config.verbosityLevel);
        printf("    Dry Run Mode: %s\n", config.isDryRun ? "TRUE" : "FALSE");
    } else {
        printUsage(simulatedArgv[0]);
    }

    printf("\n=== Command-Line Argument Processing Completed ===\n");
    return EXIT_SUCCESS;
}
