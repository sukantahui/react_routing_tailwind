#!/bin/bash
# Advanced getopts example with multiple features
# Used by Swadeep in Naihati school administration

# Initialize variables
INPUT_FILES=()
OUTPUT_DIR="."
COMPRESS=0
EXTRACT=0
FORCE=0
LOG_LEVEL="INFO"

# Parse options
while getopts ":i:o:cefvl:" opt; do
    case $opt in
        i)
            # Multiple -i options allowed
            INPUT_FILES+=("$OPTARG")
            ;;
        o)
            OUTPUT_DIR="$OPTARG"
            ;;
        c)
            COMPRESS=1
            ;;
        e)
            EXTRACT=1
            ;;
        f)
            FORCE=1
            ;;
        v)
            # Multiple -v increases verbosity
            if [ "$LOG_LEVEL" = "INFO" ]; then
                LOG_LEVEL="DEBUG"
            elif [ "$LOG_LEVEL" = "DEBUG" ]; then
                LOG_LEVEL="TRACE"
            fi
            ;;
        l)
            case "$OPTARG" in
                error|ERROR) LOG_LEVEL="ERROR" ;;
                warn|WARN)   LOG_LEVEL="WARN"  ;;
                info|INFO)   LOG_LEVEL="INFO"  ;;
                debug|DEBUG) LOG_LEVEL="DEBUG" ;;
                trace|TRACE) LOG_LEVEL="TRACE" ;;
                *)
                    echo "Invalid log level: $OPTARG" >&2
                    echo "Valid levels: error, warn, info, debug, trace" >&2
                    exit 1
                    ;;
            esac
            ;;
        \?)
            echo "Invalid option: -$OPTARG" >&2
            exit 1
            ;;
        :)
            echo "Option -$OPTARG requires an argument." >&2
            exit 1
            ;;
    esac
done

shift $((OPTIND - 1))

# Validate inputs
if [ ${#INPUT_FILES[@]} -eq 0 ]; then
    echo "Error: At least one input file (-i) is required." >&2
    exit 1
fi

# Check for conflicting options
if [ $COMPRESS -eq 1 ] && [ $EXTRACT -eq 1 ]; then
    echo "Error: Cannot use -c (compress) and -e (extract) together." >&2
    exit 1
fi

# Validate output directory
if [ ! -d "$OUTPUT_DIR" ]; then
    if [ $FORCE -eq 1 ]; then
        mkdir -p "$OUTPUT_DIR"
        echo "Created output directory: $OUTPUT_DIR"
    else
        echo "Error: Output directory '$OUTPUT_DIR' doesn't exist." >&2
        echo "Use -f to create it automatically." >&2
        exit 1
    fi
fi

# Log based on level
log() {
    local level="$1"
    local message="$2"
    
    case "$LOG_LEVEL" in
        ERROR) [[ "$level" =~ ^(ERROR)$ ]] && echo "[$level] $message" >&2 ;;
        WARN)  [[ "$level" =~ ^(ERROR|WARN)$ ]] && echo "[$level] $message" >&2 ;;
        INFO)  [[ "$level" =~ ^(ERROR|WARN|INFO)$ ]] && echo "[$level] $message" ;;
        DEBUG) [[ "$level" =~ ^(ERROR|WARN|INFO|DEBUG)$ ]] && echo "[$level] $message" ;;
        TRACE) echo "[$level] $message" ;;
    esac
}

# Process files
log "INFO" "Starting processing with log level: $LOG_LEVEL"
log "DEBUG" "Output directory: $OUTPUT_DIR"
log "DEBUG" "Force mode: $FORCE"
log "DEBUG" "Compress: $COMPRESS, Extract: $EXTRACT"

for file in "${INPUT_FILES[@]}"; do
    if [ ! -f "$file" ]; then
        log "ERROR" "Input file not found: $file"
        continue
    fi
    
    log "INFO" "Processing: $file"
    
    if [ $COMPRESS -eq 1 ]; then
        log "DEBUG" "Compressing $file"
        # Compression logic here
    elif [ $EXTRACT -eq 1 ]; then
        log "DEBUG" "Extracting $file"
        # Extraction logic here
    else
        log "DEBUG" "Copying $file to $OUTPUT_DIR"
        cp "$file" "$OUTPUT_DIR/"
    fi
done

log "INFO" "Processing complete"