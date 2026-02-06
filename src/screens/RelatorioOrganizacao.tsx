import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

export default function RelatorioOrganizacao() {
  const [selecionadas, setSelecionadas] = useState<string[]>([]);
  const [formato, setFormato] = useState<"pdf" | "excel" | null>(null);

  const organizacoes = [
    { id: "1", nome: "Fundação Piauí Previdência - PiauiPrev" },
    { id: "2", nome: "Secretária de Administração - SEAD" },
    { id: "3", nome: "Secretária de Fazenda - SEFAZ" },
    { id: "4", nome: "IAPEP" },
    { id: "5", nome: "Tribunal de Contas da União - TCU" },
    { id: "6", nome: "SEADPREV" },
  ];

  const toggleOrganizacao = (id: string) => {
    setSelecionadas((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleLimpar = () => {
    setSelecionadas([]);
  };

  const handleGerar = () => {
    alert(`Relatório gerado para ${selecionadas.length} organização(ções)`);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView scrollEnabled={true}>
      {/* SETA VOLTAR */}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={26} color="#333" />
      </TouchableOpacity>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TÍTULO */}
      <Text style={styles.title}>ORGANIZAÇÃO</Text>

      {/* CARD FORMATO */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>SELECIONE A OPÇÃO</Text>

        <View style={styles.radioGroup}>
          {/* PDF */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("pdf")}
          >
            <Ionicons name="document-text" size={22} color="#2E6BE6" />
            <Text style={styles.radioText}>PDF</Text>
            <View
              style={[
                styles.radioCircle,
                formato === "pdf" && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>

          {/* EXCEL */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("excel")}
          >
            <Ionicons name="grid" size={22} color="#2E6BE6" />
            <Text style={styles.radioText}>EXCEL</Text>
            <View
              style={[
                styles.radioCircle,
                formato === "excel" && styles.radioSelected,
              ]}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* CARD FILTROS */}
      <View style={[styles.card, styles.filterCard]}>
        <View style={styles.organizacaoContainer}>
          <Ionicons name="business" size={20} color="#62CB18" />
          <Text style={styles.filterTitle}>Organização</Text>
          <Ionicons name="chevron-back" size={20} color="#999" />
        </View>

        <ScrollView style={styles.optionsScroll}>
          {organizacoes.map((org) => (
            <View key={org.id} style={styles.checkboxItem}>
              <TouchableOpacity
                style={styles.checkboxWrapper}
                onPress={() => toggleOrganizacao(org.id)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selecionadas.includes(org.id) && styles.checkboxChecked,
                  ]}
                >
                  {selecionadas.includes(org.id) && (
                    <Ionicons name="checkmark" size={16} color="#FFF" />
                  )}
                </View>
                <Text style={styles.checkboxText}>{org.nome}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </View>

      {/* BOTÕES */}
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.clearBtn}
          onPress={handleLimpar}
        >
          <Text style={styles.clearText}>LIMPAR FILTROS</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.generateBtn}
          onPress={handleGerar}
        >
          <Text style={styles.generateText}>GERAR RELATÓRIO</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },

  backButton: {
    marginBottom: 15,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  filterCard: {
    maxHeight: "45%",
  },

  optionsScroll: {
    maxHeight: 250,
    overflow: "hidden",
  },

  cardTitle: {
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    fontSize: 14,
  },

  radioGroup: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 40,
  },

  radioItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    borderColor: "#2E6BE6",
  },

  radioSelected: {
    backgroundColor: "#2E6BE6",
  },

  radioText: {
    fontSize: 14,
    fontWeight: "500",
  },

  organizacaoContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginBottom: 10,
  },

  filterTitle: {
    flex: 1,
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 10,
  },

  checkboxItem: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#CCC",
    justifyContent: "center",
    alignItems: "center",
  },

  checkboxChecked: {
    backgroundColor: "#62CB18",
    borderColor: "#62CB18",
  },

  checkboxText: {
    fontSize: 14,
    color: "#333",
  },

  actions: {
    marginTop: "auto",
  },

  clearBtn: {
    backgroundColor: "#DDD",
    padding: 14,
    borderRadius: 8,
    marginBottom: 10,
  },

  clearText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#333",
  },

  generateBtn: {
    backgroundColor: "#2E6BE6",
    padding: 14,
    borderRadius: 8,
  },

  generateText: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#FFF",
  },
});