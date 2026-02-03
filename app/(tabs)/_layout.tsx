import { Tabs } from "expo-router";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,

        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          height: 65,
          borderTopWidth: 0,
        },

        tabBarActiveTintColor: "#62CB18",
        tabBarInactiveTintColor: "#777",

        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },

        tabBarItemStyle: {
          borderRadius: 30,
          margin: 6,
        },

        tabBarActiveBackgroundColor: "rgba(98,203,24,0.15)",
      }}
    >

      {/* SETORES */}
      <Tabs.Screen
        name="home"
        options={{
          title: "Setores",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" color={color} size={22} />
          ),
        }}
      />

      {/* BENS */}
      <Tabs.Screen
        name="bens"
        options={{
          title: "Bens",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cube" color={color} size={22} />
          ),
        }}
      />

      {/* RELATÓRIOS */}
      <Tabs.Screen
        name="relatorios"
        options={{
          title: "Relatórios",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={22} />
          ),
        }}
      />

    </Tabs>
  );
}
