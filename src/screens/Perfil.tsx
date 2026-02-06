import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Popup from "../components/Popup";
import { api } from "../services/api";

interface Usuario {
  id_usuario: number;
  nome: string;
  email: string;
  cpf?: string;
}

export default function Perfil() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      const token = await AsyncStorage.getItem("token");
      const usuarioString = await AsyncStorage.getItem("usuario");

      if (!token) {
        setErrorMessage("Erro ao carregar perfil. Faça login novamente.");
        setShowError(true);
        return;
      }

      // Ler o userId salvo diretamente (apenas token e userId são armazenados)
      const userIdString = await AsyncStorage.getItem("userId");
      if (!userIdString) {
        setErrorMessage("Erro ao carregar perfil. Faça login novamente.");
        setShowError(true);
        return;
      }

      const userId = Number(userIdString);
      if (!userId || isNaN(userId)) {
        await AsyncStorage.removeItem("userId");
        setErrorMessage("Erro ao carregar perfil. Faça login novamente.");
        setShowError(true);
        return;
      }

      const response = await api.get(`/usuarios/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const usuario: Usuario = response.data;
      setUsuarioId(usuario.id_usuario);
      setNome(usuario.nome || "");
      setEmail(usuario.email || "");
      setCpf(usuario.cpf || "");
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || "Erro ao carregar perfil"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleAtualizar() {
    if (!nome.trim() || !email.trim()) {
      setErrorMessage("Nome e email são obrigatórios.");
      setShowError(true);
      return;
    }

    try {
      setAtualizando(true);
      const token = await AsyncStorage.getItem("token");

      if (!token || !usuarioId) {
        setErrorMessage("Erro ao acessar perfil.");
        setShowError(true);
        return;
      }

      await api.put(`/usuarios/${usuarioId}`, {
        nome: nome.trim(),
        email: email.trim(),
        cpf: cpf.trim() || null,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShowSuccess(true);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || "Erro ao atualizar perfil"
      );
      setShowError(true);
    } finally {
      setAtualizando(false);
    }
  }

  async function handleLogout() {
    try {
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("userId");
      router.replace("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      router.replace("/login");
    }
  }

  return (
    <View style={styles.container}>

      {/* BOTÃO SAIR */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TÍTULO */}
      <Text style={styles.title}>Perfil</Text>

      {/* ÍCONE CENTRAL */}
      <View style={styles.avatar}>
        <Ionicons name="people" size={70} color="#999" />
      </View>

      {/* FORMULÁRIO */}
      <View style={styles.form}>

        <Text style={styles.label}>Nome completo</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={18} color="#777" />
          <TextInput
            placeholder="Nome completo"
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            editable={!atualizando}
          />
        </View>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={18} color="#777" />
          <TextInput
            placeholder="Email"
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            editable={!atualizando}
          />
        </View>

        <Text style={styles.label}>CPF</Text>

        <View style={[styles.inputContainer, styles.cpfDisplayContainer]}>
          <Ionicons name="card" size={18} color="#777" />
          <Text style={styles.cpfText}>{cpf || "-"}</Text>
        </View>

        <TouchableOpacity
          style={[styles.button, atualizando && styles.buttonDisabled]}
          onPress={handleAtualizar}
          disabled={atualizando}
        >
          <Text style={styles.buttonText}>
            {atualizando ? "Atualizando..." : "Atualizar"}
          </Text>
        </TouchableOpacity>

      </View>

      <Popup
        visible={showError}
        title="Erro"
        description={errorMessage}
        buttonText="OK"
        color="red"
        onClose={() => setShowError(false)}
      />

      <Popup
        visible={showSuccess}
        title="Sucesso"
        description="Perfil atualizado com sucesso!"
        buttonText="OK"
        color="green"
        onClose={() => setShowSuccess(false)}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
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

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    marginBottom: 10,
  },

  title: {
    fontSize: 18,
    marginBottom: 20,
  },

  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: "#E6E6E6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
  },

  form: {
    width: "85%",
  },

  label: {
    fontSize: 14,
    marginBottom: 5,
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    height: 45,
    paddingHorizontal: 10,
    marginBottom: 15,
  },

  input: {
    flex: 1,
    marginLeft: 8,
  },

  cpfDisplayContainer: {
    backgroundColor: "#E0E0E0",
    borderColor: "#D0D0D0",
  },

  cpfText: {
    flex: 1,
    marginLeft: 8,
    color: "#333",
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 45,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

});