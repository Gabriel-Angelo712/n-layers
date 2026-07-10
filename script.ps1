param(
    [Parameter(Mandatory=$true)]
    [string]$TargetDir
)

if (-not (Test-Path -Path $TargetDir -PathType Container)) {
    Write-Error "Erro: diretório alvo não existe: $TargetDir"
    exit 1
}

try {
    $acl = Get-Acl -Path $TargetDir
} catch {
    Write-Error "Erro: não foi possível verificar permissões em: $TargetDir"
    exit 1
}

$testFile = [System.IO.Path]::Combine($TargetDir, [System.IO.Path]::GetRandomFileName())
try {
    $stream = [System.IO.File]::Create($testFile)
    $stream.Close()
    Remove-Item -Path $testFile -Force -ErrorAction Stop
} catch {
    Write-Error "Erro: sem permissão de escrita em: $TargetDir"
    exit 1
}

$dirs = @(
    "src/entities",
    "src/factories",
    "src/services",
    "src/repositories",
    "src/utils",
    "docs",
    "database"
)

foreach ($dir in $dirs) {
    $targetPath = Join-Path -Path $TargetDir -ChildPath $dir
    if (Test-Path -Path $targetPath -PathType Container) {
        Write-Host "Já existe: $targetPath"
    } else {
        New-Item -Path $targetPath -ItemType Directory -Force | Out-Null
        Write-Host "Criado: $targetPath"
    }
}

Write-Host "Estrutura criada com sucesso em $TargetDir"
