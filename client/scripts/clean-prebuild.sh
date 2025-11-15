#!/bin/bash
set -e

echo "🧹 Cleaning android folder..."
rm -rf android
echo "✅ Android folder deleted"

echo "🧹 Cleaning .expo cache..."
rm -rf .expo
echo "✅ .expo cache deleted"

echo "🚀 Running prebuild..."
npx expo prebuild --clean

echo "✅ Prebuild complete"

