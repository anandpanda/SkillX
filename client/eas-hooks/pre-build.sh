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

echo "🚀 Running prebuild..."
npx expo prebuild --clean

echo "✅ Pre-build cleanup and prebuild complete"

