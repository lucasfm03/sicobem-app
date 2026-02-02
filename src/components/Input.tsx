import { TextInput, StyleSheet } from "react-native";

export default function Input(props: any) {
  return (
    <TextInput
      style={styles.input}
      placeholder={props.placeholder}
      secureTextEntry={props.secure}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 42,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});