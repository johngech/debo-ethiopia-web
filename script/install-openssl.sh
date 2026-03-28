#!/usr/bin/env bash

set -e

echo "🔍 Checking OpenSSL..."

if command -v openssl >/dev/null 2>&1; then
  echo "✅ OpenSSL is already installed:"
  openssl version
  exit 0
fi

echo "❌ OpenSSL not found. Installing..."

# Detect OS
if [ -f /etc/debian_version ]; then
  echo "➡️ Debian/Ubuntu detected"
  sudo apt update
  sudo apt install -y openssl

elif [ -f /etc/redhat-release ]; then
  echo "➡️ RHEL/CentOS/Fedora detected"
  sudo dnf install -y openssl || sudo yum install -y openssl

elif [[ "$OSTYPE" == "darwin"* ]]; then
  echo "➡️ macOS detected"
  brew install openssl

else
  echo "⚠️ Unknown OS. Please install OpenSSL manually."
  exit 1
fi

echo "✅ Installed OpenSSL:"
openssl version