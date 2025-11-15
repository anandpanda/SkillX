#!/bin/bash
set -e

echo "🧹 Cleaning android folder before prebuild..."
if [ -d "android" ]; then
  rm -rf android
  echo "✅ Android folder deleted"
fi

if [ -d ".expo" ]; then
  rm -rf .expo
  echo "✅ .expo cache deleted"
fi

echo "✅ Pre-build cleanup complete"

