// components/AppInput.tsx
import { useState } from "react";
import { TextInput, StyleSheet, View, Text, TouchableOpacity, TextStyle, ViewStyle } from "react-native";
import { mainTheme } from "../theme/themes";

interface InputProps {
    label?: string;
    placeholder?: string;
    value?: string;
    setValue?: (text: string) => void;
    onChangeText?: (text: string) => void;
    icons?: {
        leftIcon?: React.ReactNode;
        rightIcon?: React.ReactNode | (() => React.ReactNode); // allow function for toggling
    };
    keyboardType?: "email-address" | "number-pad" | "default" | "phone-pad";
    secureTextEntry?: boolean;
    containerStyle?: ViewStyle;
    inputStyle?: TextStyle;
}

export default function AppInput({ label, placeholder, value, setValue, onChangeText, icons, keyboardType = "default",
    secureTextEntry = false, containerStyle, inputStyle}: InputProps){

    const [focused, setFocused] = useState(false);

    const handleChangeText = (text: string) => {
        if (setValue) setValue(text);
        if (onChangeText) onChangeText(text);
    };

    return <View style={[styles.container, containerStyle]}>
        {label && <Text style={styles.label}>{label}</Text>}

        <View style={[styles.inputContainer, focused && { borderColor: mainTheme.primary }]}>
        {icons?.leftIcon && <View style={styles.icon}>{icons.leftIcon}</View>}

        <TextInput
            style={[styles.input, inputStyle]}
            value={value}
            onChangeText={handleChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            autoCapitalize="none"
            secureTextEntry={secureTextEntry}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
        />

        {typeof icons?.rightIcon === "function" ? (
            <TouchableOpacity>{icons.rightIcon()}</TouchableOpacity>
        ) : (
            icons?.rightIcon && <View style={styles.icon}>{icons.rightIcon}</View>
        )}
        </View>

    </View>
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },
    label: {
        fontSize: 15,
        marginBottom: 5,
        fontWeight: "600",
        color: "#333",
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderColor: mainTheme.secondary,
        borderRadius: 8,
        backgroundColor: "#fff",
        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: "#000",
        paddingVertical: 10,
    },
    icon: {
        marginHorizontal: 5,
    },
});
