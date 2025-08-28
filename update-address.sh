#!/bin/bash

# Script to replace old address with new address in all HTML files
echo "Starting address replacement in all HTML files..."

# List of HTML files to update
HTML_FILES=(
    "index.html"
    "contact.html"
    "careers.html"
    "blog-grid.html"
    "project.html"
    "blog-details.html"
    "privacy-policy.html"
    "terms-of-condition.html"
    "Preconstruction.html"
    "Construction-management.html"
    "Project-management.html"
    "Custom-home-renovations.html"
    "Custom-pools-spas.html"
    "project-details.html"
    "Outdoor-living.html"
    "Project-management-permitting.html"
    "Roofing-exterior-upgrades.html"
    "Concrete-masonry.html"
    "about.html"
    "service.html"
)

# Old and new addresses
OLD_ADDRESS="P.O. Box 292293 Lewisville, TX 75029"
NEW_ADDRESS="P.O. Box 292293 Lewisville, TX 75029"

# Function to update address in a single file
update_address() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "File $file not found, skipping..."
        return
    fi
    
    echo "Updating address in $file..."
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Replace the old address with the new one
    if grep -q "$OLD_ADDRESS" "$file"; then
        sed -i '' "s|$OLD_ADDRESS|$NEW_ADDRESS|g" "$file"
        echo "  - Address updated successfully in $file"
    else
        echo "  - No old address found in $file"
    fi
}

# Update each file
for file in "${HTML_FILES[@]}"; do
    update_address "$file"
done

echo "Address replacement process completed!"
echo ""
echo "Files processed: ${#HTML_FILES[@]}"
echo ""
echo "Old address: $OLD_ADDRESS"
echo "New address: $NEW_ADDRESS"
echo ""
echo "Note: All files have been backed up with .backup extension" 