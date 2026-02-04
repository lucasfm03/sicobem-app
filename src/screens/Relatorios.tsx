import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";

import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function RelatoriosScreen() {

  const [formato, setFormato] = useState<"pdf" | "excel" | null>(null);

  return (
    <View style={styles.container}>

      {/* BOTÃO SAIR */}
      <View style={styles.logoutContainer}>
        <TouchableOpacity onPress={() => router.replace("/login")}>
          <Ionicons name="log-out-outline" size={26} color="#333" />
        </TouchableOpacity>
      </View>

      {/* LOGO */}
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.logo}
      />

      {/* TÍTULO */}
      <Text style={styles.title}>RELATÓRIOS</Text>

      {/* CARD FORMATO */}
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

        {renderItem("Bens", "cube")}
        {renderItem("Setor", "location")}
        {renderItem("Organização", "business")}
        {renderItem("Situação", "settings")}
        {renderItem("Aquisição", "cash")}

      </View>

      {/* BOTÕES */}
      <View style={styles.actions}>

        <TouchableOpacity style={styles.clearBtn}>
          <Text style={styles.clearText}>LIMPAR FILTROS</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateBtn}>
          <Text style={styles.generateText}>GERAR RELATÓRIO</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
}

/* ITEM PADRÃO */
function renderItem(label: string, icon: any) {
  return (
    <TouchableOpacity style={styles.listItem}>

      <View style={styles.left}>

        <Ionicons
          name={icon}
          size={22}
          color="#62CB18"
        />

        <Text style={styles.itemText}>{label}</Text>

      </View>

      <Ionicons
        name="chevron-forward"
        size={22}
        color="#999"
      />

    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#F4F4F4",
    padding: 20,
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

  /* LISTA */

  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  itemText: {
    fontSize: 15,
  },

  /* AÇÕES */

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