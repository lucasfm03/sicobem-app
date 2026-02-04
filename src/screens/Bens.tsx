import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { router } from "expo-router";
import { api } from "../services/api";

export default function Bens() {

  const [search, setSearch] = useState("");

  const bens = [
    { nome: "Notebook Dell", tombo: "12345", status: "Ativo" },
    { nome: "Impressora HP", tombo: "22334", status: "Ativo" },
    { nome: "Mesa Escritório", tombo: "99887", status: "Ativo" },
    { nome: "Monitor LG", tombo: "55443", status: "Inservível" },
  ];

  return (
    <View style={styles.container}>

      {/* TOPO */}
      <View style={styles.topBar}>

        {/* SETA VOLTAR */}
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={26} color="#333" />
        </TouchableOpacity>

        {/* LOGO */}
        <Image
          source={require("../../assets/images/logo.png")}
          style={styles.logo}
        />

        {/* Espaço fantasma */}
        <View style={{ width: 26 }} />

      </View>

      {/* TÍTULO */}
      <Text style={styles.title}>BENS</Text>

      {/* CARD */}
      <View style={styles.card}>

        {/* BUSCA */}
        <View style={styles.searchContainer}>
          <TextInput
            placeholder="Digite o tombo ou número de série"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          <Ionicons name="search" size={22} color="#777" />
        </View>

        {/* FILTROS */}
        <View style={styles.filters}>

          <TouchableOpacity style={styles.categoryButton}>
            <Text style={styles.categoryText}>CATEGORIA / TIPO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="menu" size={20} color="#333" />
            <Text style={styles.filterText}>Filtro</Text>
          </TouchableOpacity>

        </View>

        {/* CABEÇALHO */}
        <View style={styles.tableHeader}>
          <Text style={[styles.headerText, styles.left]}>Nome</Text>
          <Text style={[styles.headerText, styles.center]}>Tombo</Text>
          <Text style={[styles.headerText, styles.right]}>Status</Text>
        </View>

        {/* LISTA */}
        <FlatList
          data={bens}
          keyExtractor={(item) => item.tombo}
          renderItem={({ item }) => (
            <View style={styles.row}>

              <Text style={[styles.cell, styles.left]}>
                {item.nome}
              </Text>

              <Text style={[styles.cell, styles.center]}>
                {item.tombo}
              </Text>

              <Text
                style={[
                  styles.cell,
                  styles.right,
                  item.status === "Ativo"
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                {item.status}
              </Text>

            </View>
          )}
        />

        {/* MOSTRAR MAIS */}
        <TouchableOpacity style={styles.moreButton}>
          <Text style={styles.moreText}>MOSTRAR MAIS</Text>
        </TouchableOpacity>

      </View>

      {/* RESUMO */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryGreen}>3</Text>
        <Text style={styles.summaryRed}>1</Text>
      </View>

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

  /* TOPO */

  topBar: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  logo: {
    width: 180,
    height: 60,
    resizeMode: "contain",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* CARD */

  card: {
    width: "90%",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    flex: 1,
  },

  /* BUSCA */

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

  /* FILTROS */

  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  categoryButton: {
    backgroundColor: "#1E90FF",
    flex: 1,
    padding: 10,
    borderRadius: 8,
    marginRight: 8,
    alignItems: "center",
  },

  categoryText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EEE",
    paddingHorizontal: 12,
    borderRadius: 8,
  },

  filterText: {
    marginLeft: 5,
  },

  /* TABELA */

  tableHeader: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingBottom: 6,
  },

  headerText: {
    fontWeight: "bold",
    flex: 1,
  },

  row: {
    flexDirection: "row",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },

  cell: {
    flex: 1,
  },

  left: { textAlign: "left" },
  center: { textAlign: "center" },
  right: { textAlign: "right" },

  active: { color: "green" },
  inactive: { color: "red" },

  /* BOTÃO */

  moreButton: {
    backgroundColor: "#1E90FF",
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  moreText: {
    color: "#FFF",
    fontWeight: "bold",
  },

  /* RESUMO */

  summaryCard: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "90%",
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 12,
    marginVertical: 10,
  },

  summaryGreen: {
    color: "green",
    fontSize: 22,
    fontWeight: "bold",
  },

  summaryRed: {
    color: "red",
    fontSize: 22,
    fontWeight: "bold",
  },

});