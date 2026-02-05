import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

export default function RelatorioBens() {

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
        categoriasSelecionadas.filter(c => c !== nome)
      );
    } else {
      setCategoriasSelecionadas([...categoriasSelecionadas, nome]);
    }
  }

  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.header}>
        <Ionicons name="cube-outline" size={22} color="#2E6BE6" />
        <Text style={styles.headerText}>Bens</Text>
      </View>

      <ScrollView style={styles.card}>

        {/* OPÇÕES */}
        <Text style={styles.subtitle}>Quantidade</Text>
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

        <Text style={styles.subtitle}>Categoria</Text>
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

        {/* CATEGORIAS */}
        <Text style={styles.subtitle}>Categoria:</Text>

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

      </ScrollView>

      {/* BOTÕES */}
      <View style={styles.footer}>

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

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#EEE",
    padding: 20
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10
  },

  headerText: {
    fontSize: 18,
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 15
  },

  subtitle: {
    fontWeight: "bold",
    marginTop: 15
  },

  checkbox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 8
  },

  checkText: {
    fontSize: 14
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15
  },

  clearBtn: {
    backgroundColor: "#DDD",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center"
  },

  clearText: {
    color: "#555",
    fontWeight: "bold"
  },

  generateBtn: {
    backgroundColor: "#2E6BE6",
    padding: 12,
    borderRadius: 8,
    width: "48%",
    alignItems: "center"
  },

  generateText: {
    color: "#FFF",
    fontWeight: "bold"
  }

});
