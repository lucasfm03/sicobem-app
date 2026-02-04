import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  Alert,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";

export default function Home() {

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  const setores = [
    "Setor 01",
    "Setor 02",
    "Setor 03",
    "Setor 04",
    "Setor 05",
    "Setor 06",
    "Inservíveis",
  ];

  function handleDeleteSetor(nome: string) {
    Alert.alert(
      "Excluir setor",
      `Deseja realmente excluir ${nome}?`,
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Excluir", style: "destructive", onPress: () => {
            console.log("Excluir:", nome);
          }
        }
      ]
    );
  }

  return (
    <View style={styles.container}>

      {/* BOTÃO SAIR */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Ionicons name="log-out-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

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
          data={setores.filter(s =>
            s.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => router.push("/bens")}
            >

              <Text style={styles.itemText}>{item}</Text>

              <View style={styles.actions}>

                {/* EDITAR */}
                <TouchableOpacity
                  onPress={() =>
                    router.push("/setores/renomear")
                  }
                >
                  <Ionicons
                    name="pencil"
                    size={20}
                    color="#1E90FF"
                  />
                </TouchableOpacity>

                {/* EXCLUIR */}
                <TouchableOpacity
                  onPress={() => handleDeleteSetor(item)}
                >
                  <Ionicons
                    name="trash"
                    size={20}
                    color="red"
                  />
                </TouchableOpacity>

                {/* ENTRAR */}
                <Ionicons
                  name="chevron-forward"
                  size={22}
                  color="#555"
                />

              </View>

            </TouchableOpacity>
          )}
        />

      </View>

      {/* BOTÃO CADASTRAR */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setShowModal(true)}
      >
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      {/* ===== MODAL ===== */}
      {showModal && (

        <View style={styles.overlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              O que deseja cadastrar?
            </Text>

            {/* CADASTRAR SETOR */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                router.push("/cadastrar-setor");
              }}
            >
              <Text style={styles.modalButtonText}>
                CADASTRAR SETOR
              </Text>
            </TouchableOpacity>

            {/* CATEGORIA DE BEM */}
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                setShowModal(false);
                router.push("/cadastrar-categoria-bem");
              }}
            >
              <Text style={styles.modalButtonText}>
                CATEGORIA DE BEM
              </Text>
            </TouchableOpacity>

            {/* CANCELAR */}
            <TouchableOpacity
              onPress={() => setShowModal(false)}
            >
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>

        </View>

      )}

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

  /* LOGOUT */
  logoutContainer: {
    position: "absolute",
    top: 45,
    right: 20,
    zIndex: 10,
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

  /* ===== MODAL ===== */

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalCard: {
    width: "85%",
    backgroundColor: "#FFF",
    padding: 25,
    borderRadius: 12,
    alignItems: "center",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 25,
  },

  modalButton: {
    width: "100%",
    backgroundColor: "#2E6BE6",
    padding: 14,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: "center",
  },

  modalButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  cancelText: {
    marginTop: 10,
    color: "#999",
  },

});