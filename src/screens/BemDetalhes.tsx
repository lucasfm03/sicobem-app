import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Popup from "../components/Popup";
import { api } from "../services/api";

interface Bem {
  id_bem: number;
  tombo: string;
  descricao: string;
  id_categoria: number;
  id_setor_atual: number;
  valor_aquisicao: number;
  id_usuario_responsavel: number;
  situacao?: string;
}

interface Categoria {
  id_categoria: number;
  nome: string;
  descricao?: string;
}

export default function BemDetalhes() {
  const params = useLocalSearchParams();
  const [bem, setBem] = useState<Bem | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  
  const [situacao, setSituacao] = useState("Ativo");
  const [observacoes, setObservacoes] = useState("");
  const [modalCategoriaVisible, setModalCategoriaVisible] = useState(false);
  const [categoriaNome, setCategoriaNome] = useState("");
  
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isTokenError, setIsTokenError] = useState(false);

  useEffect(() => {
    carregarDados();
  }, [params.id_bem]);

  async function carregarDados() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage("Ocorreu um erro ao acessar esta página.\nCódigo: ERR-NOTTOK");
        setIsTokenError(true);
        setShowError(true);
        return;
      }

      const idBem = Array.isArray(params.id_bem) ? params.id_bem[0] : params.id_bem;
      
      // Buscar dados do bem
      const resBem = await api.get(`/bens/${idBem}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBem(resBem.data);
      setSituacao(resBem.data.situacao || "Ativo");

      // Buscar categorias
      const resCategorias = await api.get("/categorias", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategorias(resCategorias.data);
      
      // Encontrar nome da categoria
      const categoriaSelecionada = resCategorias.data.find(
        (cat: Categoria) => cat.id_categoria === resBem.data.id_categoria
      );
      if (categoriaSelecionada) {
        setCategoriaNome(categoriaSelecionada.nome);
      }
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || "Erro ao carregar dados do bem" + err.message
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  async function handleSalvar() {
    if (!bem) return;

    try {
      setSalvando(true);
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage("Ocorreu um erro ao acessar esta página.\nCódigo: ERR-NOTTOK");
        setIsTokenError(true);
        setShowError(true);
        return;
      }

      await api.put(`/bens/${bem.id_bem}`, {
        situacao,
        id_setor_atual: bem.id_setor_atual,
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShowSuccess(true);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || "Erro ao atualizar bem"
      );
      setShowError(true);
    } finally {
      setSalvando(false);
    }
  }

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color="#1E90FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>

        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        <View style={{ width: 26 }} />
      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>DETALHES DO BEM</Text>

      {/* CARD */}
      <View style={styles.card}>

      {/* TOMBO */}
        <Text style={styles.label}>Tombo</Text>
        <TextInput
          style={styles.input}
          value={bem?.tombo || ""}
          editable={false}
        />

        {/* DESCRIÇÃO */}
        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={styles.input}
          value={bem?.descricao || ""}
          editable={false}
        />

        {/* CATEGORIA */}
        <Text style={styles.label}>Categoria</Text>
        <TouchableOpacity
          style={styles.categoriaButton}
          onPress={() => setModalCategoriaVisible(true)}
        >
          <Text style={styles.categoriaBtnText}>
            {categoriaNome || "Selecionar categoria..."}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#333" />
        </TouchableOpacity>

        {/* VALOR DE AQUISIÇÃO */}
        <Text style={styles.label}>Valor de Aquisição</Text>
        <TextInput
          style={styles.input}
          value={bem?.valor_aquisicao?.toString() || ""}
          editable={false}
          keyboardType="decimal-pad"
        />

        {/* SETOR ATUAL */}
        <Text style={styles.label}>Setor Atual</Text>
        <TextInput
          style={styles.input}
          value={String(bem?.id_setor_atual || "")}
          editable={false}
          keyboardType="numeric"
        />

        {/* USUÁRIO RESPONSÁVEL */}
        <Text style={styles.label}>Usuário Responsável</Text>
        <TextInput
          style={styles.input}
          value={String(bem?.id_usuario_responsavel || "")}
          editable={false}
          keyboardType="numeric"
        />

        {/* SITUAÇÃO DO BEM */}
        <Text style={styles.label}>Situação do Bem</Text>

        <View style={styles.statusContainer}>
          {/* ATIVO */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusGreen,
              situacao === "Ativo" && styles.statusSelected,
            ]}
            onPress={() => setSituacao("Ativo")}
          >
            <Ionicons name="checkmark" size={18} color="#FFF" />
            <Text style={styles.statusText}>Ativo</Text>
          </TouchableOpacity>

          {/* NÃO ENCONTRADO */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusRed,
              situacao === "Não encontrado" && styles.statusSelected,
            ]}
            onPress={() => setSituacao("Não encontrado")}
          >
            <Ionicons name="close" size={18} color="#FFF" />
            <Text style={styles.statusText}>Não encontrado</Text>
          </TouchableOpacity>

          {/* INSERVÍVEL */}
          <TouchableOpacity
            style={[
              styles.statusButton,
              styles.statusRed,
              situacao === "Inservível" && styles.statusSelected,
            ]}
            onPress={() => setSituacao("Inservível")}
          >
            <Ionicons name="close" size={18} color="#FFF" />
            <Text style={styles.statusText}>Inservível</Text>
          </TouchableOpacity>
        </View>

        {/* OBSERVAÇÕES */}
        <Text style={styles.label}>Observações</Text>
        <TextInput
          style={[styles.input, styles.observacaoInput]}
          placeholder="Adicionar observações"
          placeholderTextColor="#CCC"
          multiline
          value={observacoes}
          onChangeText={setObservacoes}
        />

        {/* BOTÃO SALVAR */}
        <TouchableOpacity
          style={[styles.button, salvando && styles.buttonDisabled]}
          onPress={handleSalvar}
          disabled={salvando}
        >
          <Text style={styles.buttonText}>{salvando ? "SALVANDO..." : "SALVAR"}</Text>
        </TouchableOpacity>

      </View>

      {/* MODAL CATEGORIA */}
      <Modal
        transparent
        visible={modalCategoriaVisible}
        onRequestClose={() => setModalCategoriaVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Selecione a Categoria</Text>
              <TouchableOpacity onPress={() => setModalCategoriaVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalContent}>
              {categorias.map((cat) => (
                <TouchableOpacity
                  key={cat.id_categoria}
                  style={styles.modalOption}
                  onPress={() => {
                    setCategoriaNome(cat.nome);
                    setModalCategoriaVisible(false);
                  }}
                >
                  <View style={styles.optionCheck}>
                    {categoriaNome === cat.nome && (
                      <Ionicons name="checkmark" size={18} color="#62CB18" />
                    )}
                  </View>
                  <Text style={styles.optionText}>{cat.nome}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
        visible={showSuccess}
        title="Sucesso"
        description="Bem atualizado com sucesso!"
        buttonText="OK"
        color="green"
        onClose={() => {
          setShowSuccess(false);
          router.back();
        }}
      />

    </ScrollView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
    padding: 20,
  },

  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  logo: {
    width: 220,
    height: 130,
    resizeMode: "contain",
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    marginTop: 12,
    color: "#333",
  },

  input: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
    color: "#333",
    fontSize: 13,
  },

  categoriaButton: {
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#CCC",
    padding: 12,
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  categoriaBtnText: {
    color: "#333",
    fontSize: 13,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: "70%",
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },

  modalTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },

  modalContent: {
    paddingVertical: 10,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  optionCheck: {
    width: 24,
    height: 24,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  optionText: {
    fontSize: 14,
    color: "#333",
  },

  statusContainer: {
    flexDirection: "column",
    gap: 10,
    marginTop: 10,
  },

  statusButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 8,
    gap: 8,
  },

  statusGreen: {
    backgroundColor: "#90EE90",
  },

  statusRed: {
    backgroundColor: "#FFB6C6",
  },

  statusSelected: {
    borderWidth: 2,
    borderColor: "#333",
  },

  statusText: {
    color: "#333",
    fontWeight: "600",
    fontSize: 13,
  },

  observacaoInput: {
    height: 100,
    textAlignVertical: "top",
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 48,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
  },

  buttonDisabled: {
    backgroundColor: "#CCCCCC",
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 14,
  },

});