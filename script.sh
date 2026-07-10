#!/usr/bin/env bash

set -euo pipefail

TARGET_DIR=${1}

if [ ! -d "$TARGET_DIR" ]; then
    echo "Erro: diretório alvo não existe: $TARGET_DIR" >&2
    exit 1
fi

if [ ! -w "$TARGET_DIR" ]; then
    echo "Erro: sem permissão de escrita em: $TARGET_DIR" >&2
    exit 1
fi

declare -a dirs=(
    "./src/entities"
    "./src/factories"
    "./src/services"
    "./src/repositories"
    "./src/utils"
    "./docs"
    "./database"
)

for dir in "${dirs[@]}"; do
    target_path="$TARGET_DIR/$dir"
    if [ -d "$target_path" ]; then
        echo "Já existe: $target_path"
    else
        mkdir -p "$target_path"
        echo "Criado: $target_path"
    fi
done

echo "Estrutura criada com sucesso em $TARGET_DIR"

