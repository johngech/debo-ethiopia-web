$CertDir = "../certs"
$CertFile = "$CertDir/localhost.pem"
$KeyFile = "$CertDir/localhost-key.pem"

Write-Host "📁 Creating cert directory..."
New-Item -ItemType Directory -Force -Path $CertDir | Out-Null

Write-Host "🔐 Generating HTTPS certificate..."

openssl req -x509 -newkey rsa:4096 -nodes `
  -keyout $KeyFile `
  -out $CertFile `
  -days 365 `
  -subj "/C=ET/ST=AddisAbaba/L=AddisAbaba/O=LocalDev/OU=Dev/CN=localhost"

Write-Host "✅ Certificate generated:"
Write-Host " - Cert: $CertFile"
Write-Host " - Key : $KeyFile"