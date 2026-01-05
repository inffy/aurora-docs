#!/bin/bash
# Script to download GitHub user-attachment images
# This script should be run from an environment with internet access

set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
OUTPUT_DIR="$SCRIPT_DIR/static/img/user-attachments"

# Create output directory if it doesn't exist
mkdir -p "$OUTPUT_DIR"

# Array of image UUIDs to download
images=(
    "682057ec-e435-4fe7-aca5-928ee1a7063f"
    "af508f58-e696-4eba-956b-ad3dea19d315"
    "55798d51-0ec0-4029-af90-fae9d9ade5cd"
    "59e24766-0885-4fc8-a6e9-87339672487c"
    "c1359b27-a04b-4ca4-82b7-ca669890c653"
    "d096c0bf-4dea-4dca-a3d5-d41c8ac80bd9"
    "3d93c1f3-eb12-44c5-bd0f-08fef60e0c2b"
    "611291de-4cea-4b20-8050-8f0dcc5b2109"
    "f36f5e8e-2b5d-4ef1-bb97-97da0d62e185"
)

echo "Downloading GitHub user-attachment images..."
echo "Output directory: $OUTPUT_DIR"
echo

success_count=0
fail_count=0

for uuid in "${images[@]}"; do
    output_file="$OUTPUT_DIR/${uuid}.png"
    
    # Skip if file already exists
    if [ -f "$output_file" ]; then
        echo "✓ Already exists: ${uuid}.png"
        ((success_count++))
        continue
    fi
    
    echo "Downloading: ${uuid}..."
    url="https://github.com/user-attachments/assets/${uuid}"
    
    if curl -L -f -s -o "$output_file" "$url"; then
        echo "✓ Downloaded: ${uuid}.png"
        ((success_count++))
    else
        echo "✗ Failed to download: ${uuid}"
        ((fail_count++))
        # Remove partial file if it exists
        rm -f "$output_file"
    fi
done

echo
echo "Download complete!"
echo "Success: $success_count, Failed: $fail_count"

if [ $fail_count -gt 0 ]; then
    echo
    echo "ERROR: Some images failed to download."
    echo "Please check your internet connection and try again."
    exit 1
fi

echo
echo "All images downloaded successfully!"
echo "You can now build and test the documentation site."
