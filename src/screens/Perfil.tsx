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
import * as ImagePicker from "expo-image-picker";
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

  const [fotoPerfil, setFotoPerfil] = useState<string | null>(null);
  const [showEditIcon, setShowEditIcon] = useState(false);

  const [atualizando, setAtualizando] = useState(false);

  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    carregarPerfil();
    carregarFotoSalva();
  }, []);

  async function carregarFotoSalva() {
    const foto = await AsyncStorage.getItem("fotoPerfil");
    if (foto) setFotoPerfil(foto);
  }

  async function salvarFoto(uri: string) {
    await AsyncStorage.setItem("fotoPerfil", uri);
  }

  async function carregarPerfil() {
    try {
      const token = await AsyncStorage.getItem("token");
      const userIdString = await AsyncStorage.getItem("userId");

      if (!token || !userIdString) {
        setErrorMessage("Erro ao carregar perfil.");
        setShowError(true);
        return;
      }

      const userId = Number(userIdString);

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
    }
  }

  async function escolherImagem() {

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      setErrorMessage("Permissão para acessar galeria negada.");
      setShowError(true);
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setFotoPerfil(uri);
      salvarFoto(uri);
    }
  }

  async function handleAtualizar() {

    if (!nome || !email) {
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

      await api.put(
        `/usuarios/${usuarioId}`,
        {
          nome,
          email,
          cpf: cpf || null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    await AsyncStorage.multiRemove(["token", "userId"]);
    router.replace("/login");
  }

  return (
    <View style={styles.container}>

      {/* LOGOUT */}
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

      <Text style={styles.title}>Perfil</Text>

      {/* AVATAR */}
      <TouchableOpacity
        style={styles.avatar}
        onPress={() => setShowEditIcon(!showEditIcon)}
        activeOpacity={0.8}
      >

        {fotoPerfil ? (
          <Image
            source={{ uri: fotoPerfil }}
            style={styles.avatarImage}
          />
        ) : (
          <Ionicons name="person" size={70} color="#999" />
        )}

        {showEditIcon && (
          <TouchableOpacity
            style={styles.editIcon}
            onPress={escolherImagem}
          >
            <Ionicons name="pencil" size={18} color="#FFF" />
          </TouchableOpacity>
        )}

      </TouchableOpacity>

      {/* FORM */}
      <View style={styles.form}>

        <Text style={styles.label}>Nome completo</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="person" size={18} color="#777" />
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
          />
        </View>

        <Text style={styles.label}>Email</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail" size={18} color="#777" />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
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

/* =======================
   STYLES
======================= */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    alignItems: "center",
    paddingTop: 40,
  },

  logoutContainer: {
    position: "absolute",
    top: 45,
    right: 20,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
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
    position: "relative",
  },

  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: 70,
  },

  editIcon: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "#0A67B3",
    width: 34,
    height: 34,
    borderRadius: 17,
    justifyContent: "center",
    alignItems: "center",
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
    backgroundColor: "#CCC",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
  },

});
