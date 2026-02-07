import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Popup from "../components/Popup";
import { api } from "../services/api";

/* =======================
   TYPE
======================= */
type Setor = {
  id_setor: number;
  nome: string;
};

export default function Home() {

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [setores, setSetores] = useState<Setor[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTokenError, setIsTokenError] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [setorToDelete, setSetorToDelete] = useState<Setor | null>(null);

  async function carregarSetores() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setIsTokenError(true);
        router.replace("/login");
        return;
      }

      const response = await api.get("/setores", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSetores(response.data);

    } catch (err: any) {
      Alert.alert(
        "Erro",
        err?.response?.data?.erro ||
        err?.message ||
        "Não foi possível carregar os setores"
      );
    } finally {
      setLoading(false);
    }
  }

  async function confirmarExclusao() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token || !setorToDelete) {
        setIsTokenError(true);
        router.replace("/login");
        return;
      }

      await api.delete(`/setores/${setorToDelete.id_setor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowConfirmDelete(false);
      setSetorToDelete(null);

      setLoading(true);
      carregarSetores();

    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro ||
        err?.message ||
        "Erro ao excluir o setor"
      );
      setShowError(true);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      router.replace("/login");
    } catch {
      router.replace("/login");
    }
  }

  useEffect(() => {
    carregarSetores();
  }, []);

  return (
    <View style={styles.container}>

      {/* BOTÃO SAIR */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
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
            s.nome?.toLowerCase().includes(search.toLowerCase())
          )}
          keyExtractor={(item) => String(item.id_setor)}
          refreshing={loading}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                router.push({
                  pathname: "/bens",
                  params: { idSetor: item.id_setor }
                })
              }
            >

              {/* NOME DO SETOR */}
              <Text style={styles.itemText}>{item.nome}</Text>

              {/* AÇÕES */}
              <View style={styles.actions}>

                {/* EDITAR */}
                <TouchableOpacity
                  style={styles.actionButton}
                  onPress={() =>
                    router.push({
                      pathname: "/setores/renomear",
                      params: { idSetor: item.id_setor }
                    })
                  }
                >
                  <Ionicons name="pencil" size={22} color="#1E90FF" />
                </TouchableOpacity>

                {/* EXCLUIR */}
                <TouchableOpacity
                  style={[styles.actionButton, styles.deleteButton]}
                  onPress={() => {
                    setSetorToDelete(item);
                    setShowConfirmDelete(true);
                  }}
                >
                  <Ionicons name="trash" size={22} color="#FFF" />
                </TouchableOpacity>

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

      {/* MODAL */}
      {showModal && (

        <View style={styles.overlay}>

          <View style={styles.modalCard}>

            <Text style={styles.modalTitle}>
              O que deseja cadastrar?
            </Text>

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

            <TouchableOpacity onPress={() => setShowModal(false)}>
              <Text style={styles.cancelText}>Cancelar</Text>
            </TouchableOpacity>

          </View>

        </View>

      )}

      <Popup
        visible={showError}
        title="Erro"
        description={errorMessage}
        buttonText="OK"
        color="red"
        onClose={() => {
          setShowError(false);
          if (isTokenError) {
            setIsTokenError(false);
            router.replace("/login");
          }
        }}
      />

      <Popup
        visible={showConfirmDelete}
        title="Excluir setor"
        description={`Deseja realmente excluir o setor "${setorToDelete?.nome}"?`}
        buttonText="Excluir"
        color="red"
        onClose={confirmarExclusao}
        secondaryButtonText="Voltar"
        onSecondaryPress={() => {
          setShowConfirmDelete(false);
          setSetorToDelete(null);
        }}
      />

    </View>
  );
}

/* =======================
   STYLES
======================= */
const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EAEAEA",
    alignItems: "center",
    paddingTop: 40,
  },

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
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  itemText: {
    fontSize: 16,
    flex: 1,
  },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  actionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: "#E53935",
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

