import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
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

type Bem = {
  id_bem: number;
  tombo: string;
  descricao: string;
  situacao?: string;
  id_categoria?: number;
  id_setor_atual?: number;
};

export default function Bens() {

  const { idSetor } = useLocalSearchParams();
  const [search, setSearch] = useState("");
  const [bens, setBens] = useState<Bem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isTokenError, setIsTokenError] = useState(false);

  useEffect(() => {
    carregarBens();
  }, [idSetor]);

  async function carregarBens() {
    try {
      const token = await AsyncStorage.getItem("token");

      if (!token) {
        setErrorMessage("Ocorreu um erro ao acessar esta página.\nCódigo: ERR-NOTTOK");
        setIsTokenError(true);
        setShowError(true);
        return;
      }

      if (!idSetor) {
        setErrorMessage("Setor não identificado.");
        setShowError(true);
        return;
      }

      const response = await api.get(`/bens/setor/${idSetor}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setBens(response.data || []);
    } catch (err: any) {
      setErrorMessage(
        err?.response?.data?.erro || "Erro ao carregar bens"
      );
      setShowError(true);
    } finally {
      setLoading(false);
    }
  }

  const bensFiltrados = bens.filter(b =>
    b.tombo?.toLowerCase().includes(search.toLowerCase()) ||
    b.descricao?.toLowerCase().includes(search.toLowerCase())
  );

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
          data={bensFiltrados}
          keyExtractor={(item) => String(item.id_bem)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.row}
              onPress={() =>
                router.push({
                  pathname: "/bem-detalhes",
                  params: {
                    id_bem: item.id_bem,
                    tombo: item.tombo,
                    descricao: item.descricao,
                    situacao: item.situacao || "Sem informação",
                  },
                })
              }
            >

              <Text style={[styles.cell, styles.left]}>
                {item.descricao}
              </Text>

              <Text style={[styles.cell, styles.center]}>
                {item.tombo}
              </Text>

              <Text
                style={[
                  styles.cell,
                  styles.right,
                  item.situacao === "Ativo"
                    ? styles.active
                    : styles.inactive,
                ]}
              >
                {item.situacao || "N/A"}
              </Text>

            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Ionicons name="document" size={50} color="#CCC" />
              <Text style={styles.emptyText}>Nenhum bem foi encontrado nesse setor</Text>
            </View>
          }
        />

        {/* BOTÕES */}
        <View style={styles.buttonsRow}>

          <TouchableOpacity style={styles.moreButton}>
            <Text style={styles.moreText}>MOSTRAR MAIS</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => router.push("/cadastrar-bem")}
          >
            <Text style={styles.moreText}>CADASTRAR BEM</Text>
          </TouchableOpacity>

        </View>

      </View>

      {/* RESUMO */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryGreen}>{bens.filter(b => b.situacao === "Ativo").length}</Text>
        <Text style={styles.summaryRed}>{bens.filter(b => b.situacao !== "Ativo").length}</Text>
      </View>

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
    width: 380,
    height: 220,
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

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  emptyText: {
    marginTop: 10,
    color: "#999",
    fontSize: 16,
    textAlign: "center",
  },

  /* BOTÕES */

  buttonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },

  moreButton: {
    backgroundColor: "#1E90FF",
    height: 40,
    flex: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  moreText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 13,
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