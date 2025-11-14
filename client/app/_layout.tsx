import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-expo";
import { Stack } from "expo-router";
import React from "react";
import Toast from "react-native-toast-message";
import * as SecureStore from "expo-secure-store";

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

if (!publishableKey) {
    throw new Error("Missing Clerk publishable key.");
}

// Token cache implementation for production builds
const tokenCache = {
    async getToken(key: string) {
        try {
            return await SecureStore.getItemAsync(key);
        } catch (err) {
            console.error("Error getting token:", err);
            return null;
        }
    },
    async saveToken(key: string, value: string) {
        try {
            await SecureStore.setItemAsync(key, value);
        } catch (err) {
            console.error("Error saving token:", err);
        }
    },
};

export default function Layout() {
    return (
        <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
            <ClerkLoaded>
                <Stack screenOptions={{ headerShown: false }} />
                <Toast />
            </ClerkLoaded>
        </ClerkProvider>
    );
}
