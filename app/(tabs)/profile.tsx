import { Text, View, StyleSheet, TouchableOpacity, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import {useSelector, useDispatch } from 'react-redux'
import { setEmail, setPhoneNumber, setPassword } from '../slices/userSlice'
import { useState } from 'react'
import AntDesign from '@expo/vector-icons/AntDesign';
import { mainTheme } from '../theme/themes';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScreenTitle from '../components/ScreenTitle';

export default function ProfileScreen() {
    const { email, phoneNumber, password, fullname, gender } = useSelector((state: any) => state.user)
    const dispatch = useDispatch()

    const [newEmail, setNewEmail] = useState('');
    const [newPhoneNumber, setNewPhoneNumber] = useState('')
    const [newPassword, setNewPassword] = useState('')

    const [showPassword, setShowPassword] = useState(false)

    const updateData = (setter: any, newValue: any) => {
        if(newValue !== '') {
            dispatch(setter(newValue))
        }
        return
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "#fff", marginTop: 10 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                // offset to stop the keyboard from blocking the last section on the screen (password section).
                keyboardVerticalOffset={100}
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, marginTop: 10, gap: 7 }} 
                    keyboardShouldPersistTaps="handled">

                    <ScreenTitle text='Personal Information' />

                    {/* FULLNAME */}
                    <View style={styles.section}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Full Name:</Text>
                            <Text style={styles.value}>{fullname}</Text>
                        </View>
                    </View>

                    {/* GENDER */}
                    <View style={[styles.section, {flexDirection: 'row', alignItems: 'center', gap: 5}]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Gender:</Text>
                            <Text style={styles.value}>{gender}</Text>
                        </View>
                        <Ionicons name={gender === 'Male' ? "male" : 'female'} size={24} color="black" />
                    </View>

                    {/* EMAIL Segment */}
                    <View style={styles.section}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Email:</Text>
                            <Text style={styles.value}>{email}</Text>
                        </View>

                        <View style={styles.updateSection}>
                            <TextInput
                                style={styles.input}
                                placeholder='Update Your Email'
                                value={newEmail}
                                onChangeText={(text) => setNewEmail(text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                            <TouchableOpacity onPress={() => updateData(setEmail, newEmail)}>
                                <Text style={styles.button}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* PHONE NUMBER */}
                    <View style={styles.section}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.label}>Phone Number:</Text>
                            <Text style={styles.value}>{phoneNumber}</Text>
                        </View>
                        <View style={styles.updateSection}>
                            <TextInput
                            style={styles.input}
                                placeholder='Update Your Phone Number'
                                value={newPhoneNumber}
                                onChangeText={(text) => setNewPhoneNumber(text)}
                            />
                            <TouchableOpacity onPress={() => updateData(setPhoneNumber, newPhoneNumber)}>
                                <Text style={styles.button}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    {/* PASSWORD */}
                    <View style={styles.section}>
                        <View style={styles.passwordSegment}>
                            <Text style={styles.label}>Password: {showPassword ? password : '*********'}</Text>
                            <TouchableOpacity onPress={() => setShowPassword(prev => !prev)}>
                                <AntDesign name={showPassword ? 'eye' : 'eye-invisible'} size={24} color={mainTheme.secondary} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.updateSection}>
                            <TextInput
                                placeholder='Enter Your New Password'
                                style={styles.input}
                                value={newPassword}
                                onChangeText={(text) => setNewPassword(text)}
                                secureTextEntry
                            />
                            <TouchableOpacity onPress={() => updateData(setPassword, newPassword)}>
                                <Text style={styles.button}>Update</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
  )}

const styles = StyleSheet.create({
    section: {
        backgroundColor: mainTheme.card,
        padding: 12,
        borderRadius: 10,
        shadowColor: '#000',
        shadowRadius: 4,
        marginVertical: 6,
    },
    updateSection: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15,
        marginTop: 8,
    },
    label: {
        fontSize: 15,
        fontWeight: '600',
        color: '#666',
        marginBottom: 3,
    },
    value: {
        fontSize: 16,
        color: '#000',
    },
    infoContainer: {
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 16,
        color: '#000',
    },
    button: {
        backgroundColor: mainTheme.primary,
        color: mainTheme.buttons,
        fontSize: 16,
        fontWeight: 'bold',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 10,
    },
    passwordSegment: {
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }
})