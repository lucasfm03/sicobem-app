import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Popup from "../components/Popup";
import { api } from "../services/api";

type Setor = {
  id_setor: number;
  nome: string;
};

type Categoria = {
  id_categoria: number;
  nome: string;
};

export default function CadastrarBem() {

  const [tombo, setTombo] = useState("");
  const [origem, setOrigem] = useState("");
  const [categoria, setCategoria] = useState("");
  const [setor, setSetor] = useState("");
  const [valor, setValor] = useState("");
  const [usuario, setUsuario] = useState("");
  const [descricao, setDescricao] = useState("");
  const [situacao, setSituacao] = useState("Ativo");

  const [modalCategoriaVisible, setModalCategoriaVisible] = useState(false);
  const [modalSetorVisible, setModalSetorVisible] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupColor, setPopupColor] = useState<"red" | "green">("green");

  const [setores, setSetores] = useState<Setor[]>([]);
  const [selectedSetorId, setSelectedSetorId] = useState<number | null>(null);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar setores e categorias da API
  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setPopupMessage("Erro ao acessar dados");
        setPopupColor("red");
        setShowPopup(true);
        return;
      }

      const [setoresResponse, categoriasResponse] = await Promise.all([
        api.get("/setores", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
        api.get("/categorias", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      setSetores(setoresResponse.data);
      setCategorias(categoriasResponse.data);
    } catch (err: any) {
      setPopupMessage("Erro ao carregar dados");
      setPopupColor("red");
      setShowPopup(true);
    } finally {
      setLoading(false);
    }
  }

  // Função para formatar valor com R$ e separador decimal
  const handleValorChange = (text: string) => {
    // Remove tudo exceto números
    let numeros = text.replace(/\D/g, "");
    
    if (numeros.length === 0) {
      setValor("");
      return;
    }

    // Transforma em centavos
    if (numeros.length === 1) {
      setValor("0,0" + numeros);
    } else if (numeros.length === 2) {
      setValor("0," + numeros);
    } else {
      // Coloca a vírgula nos últimos 2 dígitos
      const inteiros = numeros.slice(0, -2);
      const centavos = numeros.slice(-2);
      
      // Formata os inteiros com pontos a cada 3 dígitos
      const inteirosFormatados = inteiros.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      
      setValor(inteirosFormatados + "," + centavos);
    }
  };

  function handleCadastrar() {
    if (!tombo || !origem || !categoria || !setor || !valor) {
      setPopupMessage("Preencha todos os campos obrigatórios.");
      setPopupColor("red");
      setShowPopup(true);
      return;
    }

    // Aqui você pode adicionar a lógica de salvar em AsyncStorage, API, etc.
    const bemData = {
      tombo,
      origem,
      categoria,
      setor,
      valor,
      usuario,
      descricao,
      situacao,
      dataCadastro: new Date().toLocaleDateString("pt-BR"),
    };

    console.log("Bem cadastrado:", bemData);
    setPopupMessage("Bem cadastrado com sucesso!");
    setPopupColor("green");
    setShowPopup(true);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView scrollEnabled={true}>

      {/* TOPO */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>CADASTRO DE BENS</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* TOMBO */}
      <Text style={styles.label}>Tombo *</Text>
      <TextInput
        placeholder="Ex: 01-000000"
        style={styles.input}
        value={tombo}
        onChangeText={setTombo}
        placeholderTextColor="#CCC"
      />

      {/* ORIGEM */}
      <Text style={styles.label}>Origem do tombo *</Text>
      <TextInput
        placeholder="Ex: SEAD, SEFAZ..."
        style={styles.input}
        value={origem}
        onChangeText={setOrigem}
        placeholderTextColor="#CCC"
      />

      {/* CATEGORIA */}
      <Text style={styles.label}>Categoria *</Text>
      <TouchableOpacity 
        style={[styles.select, categoria && styles.selectActive]}
        onPress={() => setModalCategoriaVisible(true)}
      >
        <Text style={[styles.selectText, categoria && styles.selectTextActive]}>
          {categoria || "Selecione uma categoria"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={categoria ? "#0A67B3" : "#999"} />
      </TouchableOpacity>

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
                    setCategoria(cat.nome);
                    setModalCategoriaVisible(false);
                  }}
                >
                  <View style={styles.optionCheck}>
                    {categoria === cat.nome && (
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

      {/* SETOR */}
      <Text style={styles.label}>Setor atual</Text>
      <View style={[styles.input, { justifyContent: "center" }]}>
        <Text style={{ color: "#333", fontSize: 13 }}>{setor || "Nenhum setor selecionado"}</Text>
      </View>

      {/* SITUAÇÃO */}
      <Text style={styles.label}>Situação</Text>
      <View style={styles.radioGroup}>
        <TouchableOpacity 
          style={[styles.radioItem, situacao === "Ativo" && styles.radioItemActive]}
          onPress={() => setSituacao(situacao === "Ativo" ? "" : "Ativo")}
        >
          <Ionicons 
            name={situacao === "Ativo" ? "radio-button-on" : "radio-button-off"} 
            size={20}
            color={situacao === "Ativo" ? "#0A67B3" : "#CCC"}
          />
          <Text style={[styles.radioText, situacao === "Ativo" && styles.radioTextActive]}> Ativo</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.radioItem, situacao === "Não encontrado" && styles.radioItemActive]}
          onPress={() => setSituacao(situacao === "Não encontrado" ? "" : "Não encontrado")}
        >
          <Ionicons 
            name={situacao === "Não encontrado" ? "radio-button-on" : "radio-button-off"} 
            size={20}
            color={situacao === "Não encontrado" ? "#0A67B3" : "#CCC"}
          />
          <Text style={[styles.radioText, situacao === "Não encontrado" && styles.radioTextActive]}> Não encontrado</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.radioItem, situacao === "Inservível" && styles.radioItemActive]}
          onPress={() => setSituacao(situacao === "Inservível" ? "" : "Inservível")}
        >
          <Ionicons 
            name={situacao === "Inservível" ? "radio-button-on" : "radio-button-off"} 
            size={20}
            color={situacao === "Inservível" ? "#0A67B3" : "#CCC"}
          />
          <Text style={[styles.radioText, situacao === "Inservível" && styles.radioTextActive]}> Inservível</Text>
        </TouchableOpacity>
      </View>

      {/* VALOR */}
      <Text style={styles.label}>Valor *</Text>
      <View style={styles.inputWithPrefix}>
        <Text style={styles.prefix}>R$</Text>
        <TextInput
          placeholder="0,00"
          style={styles.inputWithPrefixField}
          value={valor}
          onChangeText={handleValorChange}
          keyboardType="numeric"
          placeholderTextColor="#CCC"
        />
      </View>

      {/* USUÁRIO */}
      <Text style={styles.label}>Usuário atual</Text>
      <TextInput
        placeholder="Nome do usuário"
        style={styles.input}
        value={usuario}
        onChangeText={setUsuario}
        placeholderTextColor="#CCC"
      />

      {/* DESCRIÇÃO */}
      <Text style={styles.label}>Descrição</Text>
      <TextInput
        placeholder="Observações sobre o bem..."
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
        value={descricao}
        onChangeText={setDescricao}
        placeholderTextColor="#CCC"
      />

      {/* BOTÃO */}
      <TouchableOpacity
        style={[styles.button, (!tombo || !origem || !categoria || !setor || !valor) && styles.buttonDisabled]}
        onPress={handleCadastrar}
        disabled={!tombo || !origem || !categoria || !setor || !valor}
      >
        <Text style={styles.buttonText}>CADASTRAR</Text>
      </TouchableOpacity>

      <Popup
        visible={showPopup}
        title={popupMessage}
        buttonText={popupColor === "green" ? "CONTINUAR" : "VOLTAR"}
        color={popupColor}
        onClose={() => {
          setShowPopup(false);
          if (popupColor === "green") {
            // preferir id do setor quando disponível
            if (selectedSetorId) {
              router.push({ pathname: "/bens", params: { idSetor: String(selectedSetorId) } });
            } else {
              router.push({ pathname: "/bens", params: { setor } });
            }
          }
        }}
      />

      </ScrollView>
    </KeyboardAvoidingView>
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

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    marginTop: 16,
    color: "#333",
  },

  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 14,
    fontSize: 14,
    color: "#333",
  },

  select: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    padding: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  selectActive: {
    borderColor: "#0A67B3",
    borderWidth: 2,
  },

  selectText: {
    color: "#999",
    fontSize: 14,
  },

  selectTextActive: {
    color: "#333",
    fontWeight: "500",
  },

  inputWithPrefix: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDD",
    paddingHorizontal: 12,
  },

  prefix: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#0A67B3",
    marginRight: 8,
  },

  inputWithPrefixField: {
    flex: 1,
    padding: 14,
    fontSize: 14,
    color: "#333",
  },

  radioGroup: {
    marginTop: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: "#DDD",
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },

  radioItemActive: {
    backgroundColor: "#F0F7FF",
    borderRadius: 6,
  },

  radioText: {
    fontSize: 14,
    color: "#666",
    marginLeft: 8,
    fontWeight: "500",
  },

  radioTextActive: {
    color: "#0A67B3",
    fontWeight: "600",
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
    maxHeight: "80%",
    paddingBottom: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },

  modalContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },

  modalOption: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },

  optionCheck: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#DDD",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  optionText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "500",
    flex: 1,
  },

  button: {
    backgroundColor: "#0A67B3",
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  buttonDisabled: {
    backgroundColor: "#CCC",
    opacity: 0.6,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 16,
  },
});