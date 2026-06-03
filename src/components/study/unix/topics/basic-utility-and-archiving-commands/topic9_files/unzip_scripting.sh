#!/bin/bash
# unzip_scripting.sh - Using unzip in automation

echo "=== Scripting with unzip ==="

# Function: extract all ZIPs in a directory
extract_all_zips() {
    local dir=$1
    for zipfile in "$dir"/*.zip; do
        if [ -f "$zipfile" ]; then
            local base=$(basename "$zipfile" .zip)
            mkdir -p "$dir/extracted_$base"
            unzip -q "$zipfile" -d "$dir/extracted_$base"
            echo "Extracted: $zipfile -> extracted_$base/"
        fi
    done
}

# Function: extract only config files from a backup
extract_configs() {
    local archive=$1
    local outdir=$2
    if [ -f "$archive" ]; then
        unzip -j "$archive" "*.conf" "*.cfg" "*.ini" -d "$outdir" 2>/dev/null
        echo "Config files extracted to $outdir"
    else
        echo "Archive not found"
    fi
}

# Create sample ZIPs
echo "Creating test environment..."
mkdir -p zips
for i in 1 2 3; do
    mkdir -p "data$i"
    echo "content $i" > "data$i/file$i.txt"
    echo "config $i" > "data$i/app$i.conf"
    zip -q -r "zips/backup$i.zip" "data$i"
done

echo -e "\n1. Batch extract all ZIPs:"
extract_all_zips zips
ls -l zips/

echo -e "\n2. Extract only config files from backup:"
zip -r all.zip data1 data2
mkdir config_out
extract_configs all.zip config_out
ls -l config_out/

echo -e "\n3. Unzip with progress using pv (if installed):"
if command -v pv &>/dev/null; then
    pv all.zip | unzip -q -d pv_out
    echo "Extracted with progress"
else
    unzip -q all.zip -d pv_out
    echo "pv not installed, regular unzip used"
fi

echo -e "\n4. Validate all ZIPs in a directory:"
for zipf in zips/*.zip; do
    if unzip -t "$zipf" &>/dev/null; then
        echo "✓ $zipf is valid"
    else
        echo "✗ $zipf is corrupt"
    fi
done

echo -e "\n5. Extract respecting timestamps (default behavior):"
mkdir timestamps
unzip -q all.zip -d timestamps
ls -l timestamps/data1/

# Cleanup
rm -rf data1 data2 data3 zips all.zip config_out pv_out timestamps