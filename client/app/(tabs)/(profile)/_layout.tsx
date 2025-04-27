import { Stack } from "expo-router";

const StackLayout = () => {
    return (
        <Stack>
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
