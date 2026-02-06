import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";

type Props = {
  visible: boolean;
  title: string;
  description?: string;
  buttonText: string;
  color: string;
  onClose: () => void;

  // 🔹 NOVO (opcional)
  secondaryButtonText?: string;
  onSecondaryPress?: () => void;
};

export default function Popup({
  visible,
  title,
  description,
  buttonText,
  color,
  onClose,
  secondaryButtonText,
  onSecondaryPress,
}: Props) {
  return (
    <Modal transparent animationType="fade" visible={visible}>
      <View style={styles.overlay}>
        <View style={styles.box}>

          <Text style={[styles.icon, { color }]}>
            {color === "red" ? "✖" : "✔"}
          </Text>

          <Text style={styles.title}>{title}</Text>

          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          <View style={styles.buttonsContainer}>

            {/* BOTÃO SECUNDÁRIO (VOLTA/CANCELA) */}
            {secondaryButtonText && onSecondaryPress && (
              <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={onSecondaryPress}
              >
                <Text style={styles.secondaryButtonText}>
                  {secondaryButtonText}
                </Text>
              </TouchableOpacity>
            )}

            {/* BOTÃO PRINCIPAL */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: color }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>

          </View>
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
    marginBottom: 10,
  },

  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 20,
  },

  buttonsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },

  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },

  secondaryButton: {
    backgroundColor: "#DDD",
  },

  secondaryButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});