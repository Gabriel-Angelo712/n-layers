#!/bin/bash

PATH_DIR="$1"

PATHS=(
    "src/entities"
    "src/factories"
    "src/services"
    "src/repositories"
    "src/utils"
    "docs"
    "database"
)

# Validações iniciais
[ -z "$PATH_DIR" ] && { echo "Error: Directory required"; exit 1; }
[ ! -d "$PATH_DIR" ] && { echo "Error: '$PATH_DIR' is not a directory"; exit 1; }
[ ! -r "$PATH_DIR" ] && { echo "Error: No read permission"; exit 1; }
[ ! -w "$PATH_DIR" ] && { echo "Error: No write permission"; exit 1; }

echo "Directory was correctly provided"
echo "Verifying permissions"
echo "Permissions successfully verified"

# Criar estrutura
for path in "${PATHS[@]}"; do
    if [ -d "$PATH_DIR/$path" ]; then
        echo "Directory $path already exist"
    else
        mkdir -p "$PATH_DIR/$path" && echo "Directory $path successfully created"
    fi
done