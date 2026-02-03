import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  buttonText: string;
  color: string;
  onClose: () => void;
};

export default function Popup({
  visible,
  title,
  buttonText,
  color,
  onClose,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>

        <View style={styles.box}>

          <Text style={[styles.icon, { color }]}>{color === "red" ? "✖" : "✔"}</Text>

          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity
            style={[styles.button, { backgroundColor: color }]}
            onPress={onClose}
          >
            <Text style={styles.buttonText}>{buttonText}</Text>
          </TouchableOpacity>

        </View>

      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  box: {
    backgroundColor: "#fff",
    width: "80%",
    padding: 24,
    borderRadius: 20,
    alignItems: "center",
  },

  icon: {
    fontSize: 48,
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 20,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});