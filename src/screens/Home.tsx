import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SICOBEM</Text>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/inventory")}
      >
        <MaterialIcons name="inventory" size={28} color="#1E90FF" />
        <Text style={styles.cardText}>Inventário</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/users")}
      >
        <MaterialIcons name="people" size={28} color="#1E90FF" />
        <Text style={styles.cardText}>Usuários</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.card}
        onPress={() => router.push("/reports")}
      >
        <MaterialIcons name="bar-chart" size={28} color="#1E90FF" />
        <Text style={styles.cardText}>Relatórios</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F8F9FA",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 24,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    marginLeft: 16,
    fontWeight: "500",
  },
});