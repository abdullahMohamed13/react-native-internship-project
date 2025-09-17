import { KeyboardAvoidingView, Text, View, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { useEffect, useState } from "react";
// Vector icons
import Feather from '@expo/vector-icons/Feather';
import Ionicons from "@expo/vector-icons/Ionicons";
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from "@expo/vector-icons/AntDesign";
// Redux
import { setEmail, setPhoneNumber, setPassword, setFullname, setGender } from '../slices/userSlice'
import { useDispatch, useSelector } from "react-redux";
// Custom Stuff
import AppInput from "../components/AppInput";
import { mainTheme } from "@/app/theme/themes";
import ScreenTitle from "../components/ScreenTitle";

export default function AuthScreen() {
    const router = useRouter()
    const dispatch = useDispatch();

    // states
    const [isSignUp, setIsSignUp] = useState<boolean>(true);
    const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);

    const { email, phoneNumber, password, fullname, gender } = useSelector((state: any) => state.user)

    // Show error msg just for 4 sec
    useEffect(() => {
        if(error) {
            const timer = setTimeout(() => setError(null), 4000)
            return () => clearTimeout(timer)
        }
    }, [error])

    const handleSubmit = () => {
        // Check if all fields are not empty
        if (!email || !password || (isSignUp && (!fullname || !phoneNumber || !gender))) {
            setError("All fields are required");
            return;
        }

        // for now go straight to home page
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
                <ScreenTitle text={isSignUp ? 'Log in to UFC Events' : 'Create your account'} />

                {/* Description */}
                <Text style={styles.description}>
                    {isSignUp ?
                        'Access fight cards, track upcoming events, and stay updated.' :
                        'Join UFC Events to follow fighters, view match cards, and never miss a fight night.'
                    }
                </Text>
                
                {!isSignUp && (
                    <>
                        {/* Full name in SignUp */}
                        <AppInput
                            label="Full Name"
                            placeholder="ex: Mohamed Ibrahim"
                            value={fullname}
                            onChangeText={(text) => dispatch(setFullname(text))}
                            icons={{
                                leftIcon: <Feather name="user" size={24} color="black" />,
                            }}
                        />
                        {/* Phone Number in SignUp */}
                        <AppInput
                            label="Phone Number"
                            placeholder="example@gmail.com"
                            keyboardType="phone-pad"
                            value={phoneNumber}
                            onChangeText={(text) => dispatch(setPhoneNumber(text))}
                            icons={{
                                leftIcon: <Feather name="phone" size={24} color="black" />,
                            }}
                        />
                    </>
                )}

                {/* Email */}
                <AppInput
                    label="Email"
                    placeholder="example@gmail.com"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={(text) => dispatch(setEmail(text))}
                    icons={{
                        leftIcon: <Fontisto name="email" size={24} color="black" />,
                    }}
                />

                {/* Password */}
                <AppInput
                    label="Password"
                    placeholder="Enter password"
                    value={password}
                    secureTextEntry={!passwordVisible}
                    onChangeText={(text) => dispatch(setPassword(text))}
                    icons={{
                        leftIcon: <Ionicons name="lock-closed-outline" size={20} color="gray" />,
                        rightIcon: () => (
                        <AntDesign
                            name={passwordVisible ? "eye" : "eye-invisible"}
                            size={20}
                            color={mainTheme.secondary}
                            onPress={() => setPasswordVisible((prev) => !prev)}
                        />
                        ),
                    }}
                />

                {/* Gender - Show only on signup*/}
                {!isSignUp && 
                    <View style={styles.genderContainer}>
                        <TouchableOpacity
                            style={[styles.genderOption, gender === "Male" && styles.selectedGender]}
                            onPress={() => dispatch(setGender("Male"))}
                        >
                            <Text style={[styles.genderText, gender === "Male" && styles.selectedGenderText]}>
                            Male
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.genderOption, gender === "Female" && styles.selectedGender]}
                            onPress={() => dispatch(setGender("Female"))}
                        >
                            <Text style={[styles.genderText, gender === "Female" && styles.selectedGenderText]}>
                            Female
                            </Text>
                        </TouchableOpacity>
                    </View>
                }

                {/* if there is incomplete fields */}
                {error && <Text style={{color: '#e20000', fontWeight: 'bold'}}>{error}</Text>}

                <TouchableOpacity
                    onPress={handleSubmit}
                >
                    <Text style={styles.actionButton}>{isSignUp ? 'Log in' : 'Sign up'}</Text>
                </TouchableOpacity>

                {/* Toggle between LogIn and SignUp */}
                <TouchableOpacity onPress={() => setIsSignUp(prev => !prev)}>
                    <Text style={styles.toggleButton}>
                        {isSignUp ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
                    </Text>
                </TouchableOpacity>
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
    description: {
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    icon: {
        backgroundColor: mainTheme.background,
        borderRadius: 60,
        padding: 9
    },
    actionButton: {
        fontSize: 18,
        fontWeight: 'bold',
        color: mainTheme.buttons,
        paddingHorizontal: 22,
        paddingVertical: 8,
        borderRadius: 10,
        backgroundColor: mainTheme.secondary
    },
    toggleButton: {
        color: mainTheme.accent
    },
    genderContainer: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        marginVertical: 8,
    },
    genderOption: {
        flex: 1,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        alignItems: "center",
    },
    selectedGender: {
        backgroundColor: mainTheme.primary,
        borderColor: mainTheme.primary,
    },
    genderText: {
        fontSize: 16,
        color: "#333",
    },
    selectedGenderText: {
        color: "#fff",
        fontWeight: "bold",
    },

})