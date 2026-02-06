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

import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useState } from "react";

export default function RelatorioBens() {

  const [formato, setFormato] = useState<"pdf" | "excel" | null>(null);

  const [quantidade, setQuantidade] = useState(false);
  const [categoria, setCategoria] = useState(false);

  const [categoriasSelecionadas, setCategoriasSelecionadas] = useState<string[]>([]);

  const categorias = [
    "Cadeira",
    "Desktop",
    "Estabilizador",
    "Armário",
    "Notebook",
    "Gaveteiro"
  ];

  function toggleCategoria(nome: string) {
    if (categoriasSelecionadas.includes(nome)) {
      setCategoriasSelecionadas(
        categoriasSelecionadas.filter(item => item !== nome)
      );
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, nome]);
    }
  }

  function limparFiltros() {
    setFormato(null);
    setQuantidade(false);
    setCategoria(false);
    setCategoriasSelecionadas([]);
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.container}>

    {/* LOGO */}
    <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
    />
        

      {/* TOPO */}
      <View style={styles.header}>

        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        <Text style={styles.title}>BENS</Text>

      </View>

      {/* FORMATO PDF / EXCEL */}
      <View style={styles.card}>

        <Text style={styles.sectionTitle}>SELECIONE A OPÇÃO</Text>

        <View style={styles.radioGroup}>

          {/* PDF */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("pdf")}
          >

            <Ionicons
              name="document-text"
              size={22}
              color="#2E6BE6"
            />

            <Text style={styles.radioText}>PDF</Text>

            <View
              style={[
                styles.radioCircle,
                formato === "pdf" && styles.radioSelected
              ]}
            />

          </TouchableOpacity>

          {/* EXCEL */}
          <TouchableOpacity
            style={styles.radioItem}
            onPress={() => setFormato("excel")}
          >

            <Ionicons
              name="grid"
              size={22}
              color="#2E6BE6"
            />

            <Text style={styles.radioText}>EXCEL</Text>

            <View
              style={[
                styles.radioCircle,
                formato === "excel" && styles.radioSelected
              ]}
            />

          </TouchableOpacity>

        </View>

      </View>

      {/* FILTROS */}
      <View style={styles.card}>

        <ScrollView scrollEnabled={true}>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setQuantidade(!quantidade)}
          >

            <Ionicons
              name={quantidade ? "checkbox" : "square-outline"}
              size={22}
              color="#2E6BE6"
            />

            <Text style={styles.checkText}>Quantidade</Text>

          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkbox}
            onPress={() => setCategoria(!categoria)}
          >

            <Ionicons
              name={categoria ? "checkbox" : "square-outline"}
              size={22}
              color="#2E6BE6"
            />

            <Text style={styles.checkText}>Categoria</Text>

          </TouchableOpacity>

          <Text style={styles.subTitle}>Categoria:</Text>

          <View style={styles.grid}>

            {categorias.map(cat => (

              <TouchableOpacity
                key={cat}
                style={styles.checkbox}
                onPress={() => toggleCategoria(cat)}
              >

                <Ionicons
                  name={
                    categoriasSelecionadas.includes(cat)
                      ? "checkbox"
                      : "square-outline"
                  }
                  size={22}
                  color="#2E6BE6"
                />

                <Text style={styles.checkText}>{cat}</Text>

              </TouchableOpacity>

            ))}

          </View>

        </ScrollView>

      </View>

      {/* BOTÕES */}
      <View style={styles.actions}>

        <TouchableOpacity
          style={styles.clearBtn}
          onPress={limparFiltros}
        >
          <Text style={styles.clearText}>LIMPAR FILTROS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>GERAR RELATÓRIO</Text>
        </TouchableOpacity>

      </View>

    </View>

    </KeyboardAvoidingView>
  );
}

/* ===================== */
/* ESTILOS */
/* ===================== */

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
  },

  logo: {
    width: 380,
    height: 220,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 10,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 10,
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },

  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* RADIO */

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
    fontSize: 15,
    fontWeight: "500",
  },

  /* CHECKBOX */

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
    width: "48%",
  },

  checkText: {
    fontSize: 15,
  },

  subTitle: {
    marginTop: 10,
    marginBottom: 6,
    fontWeight: "bold",
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
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



