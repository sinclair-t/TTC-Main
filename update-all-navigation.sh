#!/bin/bash

# Script to update navigation in all HTML files
echo "Starting navigation update for all HTML files..."

# List of HTML files to update
HTML_FILES=(
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
)

# Function to update a single file
update_file() {
    local file="$1"
    if [ ! -f "$file" ]; then
        echo "File $file not found, skipping..."
        return
    fi
    
    echo "Updating $file..."
    
    # Create backup
    cp "$file" "${file}.backup"
    
    # Update contact information in top header
    sed -i '' 's/(555) 123-4567,/+1(972) 360-9250/g' "$file"
    sed -i '' 's/info@elever.com/info@takestwoconstruction.com/g' "$file"
    sed -i '' 's/href="[^"]*#"/href="index.html#"/g' "$file"
    
    # Update button text
    sed -i '' 's/Get a Quote/Contact Us/g' "$file"
    
    echo "  - Updated $file"
}

# Update each file
for file in "${HTML_FILES[@]}"; do
    update_file "$file"
done

echo "Navigation update completed!"
echo "Note: This script has updated contact information and button text."
echo "For complete navigation structure updates, manual editing may be required." 