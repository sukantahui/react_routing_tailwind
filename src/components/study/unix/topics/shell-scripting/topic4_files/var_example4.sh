#!/bin/bash
# Complete Variable Management Script

echo "=== Professional Variable Management System ==="
echo ""

# Configuration section - Environment variables for script-wide use
export SCRIPT_VERSION="1.0.0"
export LOG_LEVEL="${LOG_LEVEL:-INFO}"  # Default value
export TIMESTAMP=$(date +"%Y%m%d_%H%M%S")

# Global variables for script state
config_loaded=false
error_count=0
processed_files=0

# Function to load configuration with local variables
load_configuration() {
    local config_file="${1:-config.conf}"
    local line_count=0
    
    echo "[INFO] Loading configuration from: $config_file"
    
    if [ ! -f "$config_file" ]; then
        echo "[ERROR] Config file not found: $config_file" >&2
        return 1
    fi
    
    # Use local variables to parse config
    while IFS='=' read -r key value || [ -n "$key" ]; do
        # Skip comments and empty lines
        [[ $key =~ ^# ]] || [[ -z $key ]] && continue
        
        line_count=$((line_count + 1))
        
        # Trim whitespace
        key=$(echo "$key" | xargs)
        value=$(echo "$value" | xargs)
        
        # Export as environment variable
        export "CONFIG_${key^^}"="$value"
        echo "  Loaded: $key=$value"
    done < "$config_file"
    
    config_loaded=true
    echo "[INFO] Loaded $line_count configuration items"
    return 0
}

# Function to process files with local variables
process_files() {
    local input_dir="$1"
    local output_dir="$2"
    local file_pattern="${3:-*.txt}"
    local files_processed=0
    local errors=0
    
    echo "[INFO] Processing files from: $input_dir"
    echo "[INFO] Pattern: $file_pattern"
    
    # Check if input directory exists
    if [ ! -d "$input_dir" ]; then
        echo "[ERROR] Input directory not found: $input_dir" >&2
        return 1
    fi
    
    # Create output directory if it doesn't exist
    mkdir -p "$output_dir"
    
    # Process each file
    for file in "$input_dir"/$file_pattern; do
        # Skip if no files match pattern
        [ ! -f "$file" ] && continue
        
        local filename=$(basename "$file")
        local file_size=$(stat -f%z "$file" 2>/dev/null || stat -c%s "$file" 2>/dev/null)
        local temp_output="$output_dir/temp_$filename"
        
        echo "  Processing: $filename (${file_size} bytes)"
        
        # Simulate processing with a local function
        process_single_file() {
            local input_file="$1"
            local output_file="$2"
            local attempts=0
            local max_attempts=3
            
            while [ $attempts -lt $max_attempts ]; do
                attempts=$((attempts + 1))
                
                # Simulate file processing (in real script, would do actual work)
                if cp "$input_file" "$output_file" 2>/dev/null; then
                    echo "    ✓ Processed successfully (attempt $attempts)"
                    return 0
                else
                    echo "    ✗ Attempt $attempts failed"
                    sleep 1
                fi
            done
            
            echo "    ✗ All $max_attempts attempts failed"
            return 1
        }
        
        # Process the file
        if process_single_file "$file" "$temp_output"; then
            # Rename temp file to final name
            local final_output="$output_dir/$filename"
            mv "$temp_output" "$final_output" 2>/dev/null
            
            files_processed=$((files_processed + 1))
            echo "    → Saved to: $final_output"
        else
            errors=$((errors + 1))
            echo "    → Failed to process: $filename"
        fi
    done
    
    # Update global counters
    processed_files=$((processed_files + files_processed))
    error_count=$((error_count + errors))
    
    # Return local counts
    echo "$files_processed $errors"
}

# Function to generate report with local calculations
generate_report() {
    local start_time="$1"
    local end_time="$2"
    local report_file="${3:-report_$TIMESTAMP.txt}"
    
    echo "[INFO] Generating report: $report_file"
    
    # Calculate duration
    local duration=$((end_time - start_time))
    local hours=$((duration / 3600))
    local minutes=$(( (duration % 3600) / 60 ))
    local seconds=$((duration % 60))
    
    # Create report with local variable for content
    local report_content="=== PROCESSING REPORT ===
    
Generated: $(date)
Script Version: $SCRIPT_VERSION
Log Level: $LOG_LEVEL

PROCESSING SUMMARY:
------------------
Files Processed: $processed_files
Errors Encountered: $error_count
Success Rate: $(( (processed_files * 100) / (processed_files + error_count) ))% (approx)

TIMING:
-------
Start Time: $(date -r "$start_time" +"%H:%M:%S")
End Time: $(date -r "$end_time" +"%H:%M:%S")
Duration: ${hours}h ${minutes}m ${seconds}s

CONFIGURATION:
-------------
Config Loaded: $config_loaded
Environment: $CONFIG_ENVIRONMENT
Max Files: ${CONFIG_MAX_FILES:-not set}

SYSTEM INFO:
-----------
User: $USER
Hostname: $(hostname)
Working Directory: $PWD
"
    
    # Write report
    echo "$report_content" > "$report_file"
    
    # Verify report was created
    local report_size=$(wc -c < "$report_file")
    echo "[INFO] Report generated: $report_file (${report_size} bytes)"
    
    # Return report filename
    echo "$report_file"
}

# Main execution
main() {
    local script_start=$(date +%s)
    
    echo "Starting script execution..."
    echo "Script Version: $SCRIPT_VERSION"
    echo "Log Level: $LOG_LEVEL"
    echo ""
    
    # Load configuration
    if ! load_configuration "script_config.conf"; then
        echo "[WARNING] Using default configuration"
        export CONFIG_ENVIRONMENT="development"
        export CONFIG_MAX_FILES=100
    fi
    
    # Process files based on configuration
    local input_dir="${CONFIG_INPUT_DIR:-/tmp/input}"
    local output_dir="${CONFIG_OUTPUT_DIR:-/tmp/output}"
    local max_files="${CONFIG_MAX_FILES:-10}"
    
    echo ""
    echo "PROCESSING PARAMETERS:"
    echo "  Input Directory: $input_dir"
    echo "  Output Directory: $output_dir"
    echo "  Max Files: $max_files"
    echo ""
    
    # Create test files if input directory is empty
    if [ ! -d "$input_dir" ] || [ -z "$(ls -A "$input_dir" 2>/dev/null)" ]; then
        echo "[INFO] Creating test files..."
        mkdir -p "$input_dir"
        for i in $(seq 1 5); do
            echo "Test content for file $i" > "$input_dir/file$i.txt"
        done
    fi
    
    # Process files
    local process_result
    process_result=$(process_files "$input_dir" "$output_dir")
    
    # Parse result (local variables from function)
    local files_processed=$(echo "$process_result" | awk '{print $1}')
    local errors=$(echo "$process_result" | awk '{print $2}')
    
    echo ""
    echo "PROCESSING COMPLETE:"
    echo "  Files processed in batch: $files_processed"
    echo "  Errors in batch: $errors"
    echo ""
    
    # Generate report
    local script_end=$(date +%s)
    local report_file
    report_file=$(generate_report "$script_start" "$script_end")
    
    echo ""
    echo "=== SCRIPT COMPLETED ==="
    echo "Total files processed: $processed_files"
    echo "Total errors: $error_count"
    echo "Report saved to: $report_file"
    echo ""
    
    # Show environment variables set
    echo "ENVIRONMENT VARIABLES SET:"
    printenv | grep -E "^(CONFIG_|SCRIPT_|LOG_)" | sort
    
    # Cleanup local test files
    rm -rf "$input_dir"/*.txt 2>/dev/null
    rm -rf "$output_dir"/*.txt 2>/dev/null
}

# Run main function
main

echo ""
echo "=== VARIABLE SCOPE DEMONSTRATION ==="
echo ""
echo "After script execution:"
echo "  Global variable 'processed_files': $processed_files"
echo "  Global variable 'error_count': $error_count"
echo "  Environment variable 'SCRIPT_VERSION': $SCRIPT_VERSION"
echo ""
echo "Note:"
echo "  • 'processed_files' and 'error_count' are global to script"
echo "  • 'SCRIPT_VERSION' is exported and available to child processes"
echo "  • Local variables from functions are no longer accessible"