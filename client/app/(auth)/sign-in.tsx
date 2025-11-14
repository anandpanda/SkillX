import React, { useCallback, useEffect } from "react";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";
import { useSSO } from "@clerk/clerk-expo";
import LoginScreen from "@/app/pages/login";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const useWarmUpBrowser = () => {
    useEffect(() => {
        void WebBrowser.warmUpAsync();
        return () => {
            void WebBrowser.coolDownAsync();
        };
    }, []);
};

WebBrowser.maybeCompleteAuthSession();

export default function Page() {
    const router = useRouter();
    useWarmUpBrowser();

    const { startSSOFlow } = useSSO();

    const onPress = useCallback(async () => {
        try {
            const { createdSessionId, setActive, signIn, signUp } =
                await startSSOFlow({
                    strategy: "oauth_google",
                    redirectUrl: AuthSession.makeRedirectUri(),
                });

            if (createdSessionId) {
                await setActive!({ session: createdSessionId });
                router.replace("/(tabs)/(home)");
            } else {
                console.log("Additional steps required", { signIn, signUp });
                Alert.alert(
                    "Additional Steps Required",
                    "Please complete the sign-up process"
                );
            }
        } catch (err: any) {
            console.error("❌ OAuth Error:", JSON.stringify(err, null, 2));

            Alert.alert(
                "Authentication Error",
                err?.errors?.[0]?.message ||
                    "Failed to sign in. Please try again."
            );
        }
    }, [router, startSSOFlow]);

    return <LoginScreen login={onPress} />;
}
