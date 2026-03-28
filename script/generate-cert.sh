#!/usr/bin/env bash

set -e

CERT_DIR="../certs"
CERT_FILE="$CERT_DIR/localhost.pem"
KEY_FILE="$CERT_DIR/localhost-key.pem"

echo "📁 Creating cert directory..."
mkdir -p "$CERT_DIR"

echo "🔐 Generating HTTPS certificate..."

openssl req -x509 -newkey rsa:4096 -nodes \
  -keyout "$KEY_FILE" \
  -out "$CERT_FILE" \
  -days 365 \
  -subj "/C=ET/ST=AddisAbaba/L=AddisAbaba/O=LocalDev/OU=Dev/CN=localhost"

echo "✅ Certificate generated:"
echo " - Cert: $CERT_FILE"
echo " - Key : $KEY_FILE"