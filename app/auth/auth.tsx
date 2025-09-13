import { useEffect, useState } from "react";
import { Link, Stack, useRouter } from "expo-router";
import { KeyboardAvoidingView, View, Platform, StyleSheet } from "react-native";
// react-native-paper Components
import { Text, TextInput, Button, useTheme } from 'react-native-paper'
// Vector icons
import Feather from '@expo/vector-icons/Feather';
import { mainTheme } from "@/app/theme/themes";

export default function AuthScreen() {
    const router = useRouter()
    const theme = useTheme()

    // states
    const [isSignUp, setIsSignUp] = useState<boolean>(false);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    // user login/signup data states
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fullname, setFullName] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')

    // Show error msg just for 4 sec
    useEffect(() => {
        if(error) {
            const timer = setTimeout(() => setError(null), 4000)
            return () => clearTimeout(timer)
        }
    }, [error])

    // Check if all fields are not empty
    const handleSubmit = () => {
        if (!email || !password || (!isSignUp && (!fullname || !phoneNumber))) {
            setError("All fields are required");
            return;
        }
        router.replace('/');
    };

    return <>
        {/* headerTitle: () => <LogoTitle />} */}
        <Stack.Screen options={{headerShown: false }} />
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <View style={styles.innerContainer}>
                {/* ICON */}
                <Feather style={styles.icon} name={isSignUp ? 'at-sign' : 'user'} size={50} color={mainTheme.primary} />

                {/* Title */}
                <Text variant="headlineMedium" style={{fontWeight: 'bold'}}>
                    {isSignUp ? 'Log in to UFC Events' : 'Create your account'}
                </Text>
                {/* Description */}
                <Text style={{textAlign: 'center', paddingHorizontal: 10}}>
                    {isSignUp ?
                        'Access fight cards, track upcoming events, and stay updated.' :
                        'Join UFC Events to follow fighters, view match cards, and never miss a fight night.'
                    }
                </Text>
                
                {!isSignUp && (
                    // Full name in SignUp
                    <>
                        <TextInput
                            label='Full Name'
                            mode="outlined"
                            placeholder="ex: Mohamed Ibrahim"
                            style={styles.input}
                            onChangeText={setFullName}
                            theme={{
                                colors: {
                                    primary: mainTheme.primary,
                                    outline: mainTheme.secondary
                                }
                            }}
                            left={<TextInput.Icon icon={'account'} />}
                        />
                        {/* Phone Number in SignUp */}
                        <TextInput
                            label='Phone Number'
                            mode="outlined"
                            keyboardType="phone-pad"
                            onChangeText={setPhoneNumber}
                            style={styles.input}
                            theme={{
                                colors: {
                                    primary: mainTheme.primary,
                                    outline: mainTheme.secondary
                                }
                            }}
                            left={<TextInput.Icon icon={'phone'} />}
                        />
                    </>
                )}
                {/* Email */}
                <TextInput
                    autoCapitalize="none"
                    label='Email'
                    mode="outlined"
                    onChangeText={setEmail}
                    placeholder="example@gmail.com"
                    keyboardType="email-address"
                    style={styles.input}
                    theme={{
                        colors: {
                            primary: mainTheme.primary,
                            outline: mainTheme.secondary
                        }
                    }}
                    left={<TextInput.Icon icon={'email'} />}
                    />
                {/* Password */}
                <TextInput
                    autoCapitalize="none"
                    onChangeText={setPassword}
                    label='Password'
                    mode="outlined"
                    style={styles.input}
                    secureTextEntry={!passwordVisible}
                    theme={{
                        colors: {
                            primary: mainTheme.primary,
                            outline: mainTheme.secondary
                        }
                    }}
                    right={<TextInput.Icon
                        onPress={() => setPasswordVisible(prev => !prev)}
                        icon={passwordVisible ? 'eye' : 'eye-off'} />}
                    left={<TextInput.Icon icon={'lock'} />}
                />

                {/* if there is incomplete fields */}
                {error && <Text style={{color: theme.colors.error, fontWeight: 'bold'}}>{error}</Text>}

                <Button mode="contained"
                    style={styles.actionButton}
                    onPress={handleSubmit}
                    >
                    {isSignUp ? 'Log in' : 'Sign up'}
                </Button>
                {/* Toggle between LogIn and SignUp */}
                <Button mode="text"
                    onPress={() => setIsSignUp(prev => !prev)}
                    labelStyle={{ color: mainTheme.accent }}
                >
                    {isSignUp ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                </Button>
            </View>

        </KeyboardAvoidingView>
        </>
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 8,
    },
    innerContainer: {
        width: "100%",
        maxWidth: 400,
        alignItems: "center",
        gap: 12,
    },
    icon: {
        backgroundColor: mainTheme.background,
        borderRadius: 60,
        padding: 9
    },
    input: {
        width: '100%'
    },
    actionButton: {
        fontSize: 20,
        width: '100%',
        backgroundColor: mainTheme.secondary
    },
})