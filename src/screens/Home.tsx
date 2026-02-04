import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { api } from "../services/api";

export default function Home() {
  const [search, setSearch] = useState("");

  const setores = [
    "Setor 01",
    "Setor 02",
    "Setor 03",
    "Setor 04",
    "Setor 05",
    "Setor 06",
    "Inservíveis",
  ];

  return (
    <View style={styles.container}>

      {/* LOGO */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logoImage}
        />
      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>Tela Inicial</Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* BUSCA */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Digite o nome do setor"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={22} color="#777" />
        </View>

        {/* LISTA */}
        <FlatList
          data={setores}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <View style={styles.item}>

              <Text style={styles.itemText}>{item}</Text>

              <View style={styles.actions}>
                <Ionicons name="pencil" size={20} color="#1E90FF" />
                <Ionicons name="trash" size={20} color="red" />
                <Ionicons name="chevron-forward" size={22} color="#555" />
              </View>

            </View>
          )}
        />

      </View>

      {/* BOTÃO CADASTRAR */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    paddingTop: 40,
  },

  logoContainer: {
    marginBottom: 10,
  },

  logoImage: {
    width: 380,
    height: 220,
    resizeMode: "contain",
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  card: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    flex: 1,
  },

  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
  },

  searchInput: {
    flex: 1,
    height: 40,
  },

  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  itemText: {
    fontSize: 16,
  },

  actions: {
    flexDirection: "row",
    gap: 12,
  },

  button: {
    width: "90%",
    height: 45,
    backgroundColor: "#1E90FF",
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});