Write-Host "🔍 Checking OpenSSL..."

$openssl = Get-Command openssl -ErrorAction SilentlyContinue

if ($openssl) {
    Write-Host "✅ OpenSSL is already installed:"
    openssl version
    exit
}

Write-Host "❌ OpenSSL not found. Installing via Chocolatey..."

# Check if Chocolatey exists
if (!(Get-Command choco -ErrorAction SilentlyContinue)) {
    Write-Host "⚠️ Chocolatey not found. Installing Chocolatey first..."

    Set-ExecutionPolicy Bypass -Scope Process -Force
    [System.Net.ServicePointManager]::SecurityProtocol = `
        [System.Net.ServicePointManager]::SecurityProtocol -bor 3072

    Invoke-Expression ((New-Object System.Net.WebClient).DownloadString('https://community.chocolatey.org/install.ps1'))
}

# Install OpenSSL
choco install openssl -y

Write-Host "✅ Installed OpenSSL:"
openssl version