#!/bin/sh
# Create a writable directory for Rust/Cargo
mkdir -p /opt/render/project/src/.cargo
export CARGO_HOME=/opt/render/project/src/.cargo

# Upgrade pip
pip install --upgrade pip

# Install Python dependencies
pip install -r requirements.txt
