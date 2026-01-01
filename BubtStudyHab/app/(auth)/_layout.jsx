
import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';




export default function AuthLayout() {


  return (
    <>
      <Stack>
        <Stack.Screen name="welcomepage" options={{ headerShown: false }} />
        <Stack.Screen name="signup" options={{ headerShown: false }} />
        <Stack.Screen name="signin" options={{ headerShown: false }} />


      </Stack>
              <StatusBar style="auto" />
             </>


  );
}