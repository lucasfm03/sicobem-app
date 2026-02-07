import { DarkTheme, DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/use-color-scheme";

export const unstable_settings = {
  anchor: "(tabs)",
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>

        {/* ÁREA COM NAVBAR */}
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        {/* TELAS INTERNAS (NÃO APARECEM NA NAVBAR) */}
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="login"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="register"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="forgot-password"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="bem-detalhes"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="bens"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cadastrar-bem"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cadastrar-setor"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="cadastrar-categoria-bem"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios/relatorioaquisicao"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios/relatoriobens"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios/relatorioorganizacao"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios/relatoriosetor"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="relatorios/relatoriosituacao"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="setores/renomear"
          options={{ headerShown: false }}
        />

        {/* MODAL GENÉRICO (SE UM DIA USAR) */}
        <Stack.Screen
          name="modal"
          options={{ presentation: "modal", title: "Modal" }}
        />

      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
