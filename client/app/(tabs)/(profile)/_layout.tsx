import { Stack } from "expo-router";

const StackLayout = () => {
    return (
        <Stack initialRouteName="profile">
            <Stack.Screen
                name="index"
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
};

export default StackLayout;
