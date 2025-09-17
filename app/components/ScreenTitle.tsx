import { StyleSheet, Text } from "react-native";

export default function ScreenTitle({text}: {text: string}) {
    return <Text style={styles.title}>
        {text}
    </Text>
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 26
    },
})