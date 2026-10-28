import { Stack } from "expo-router";

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerTintColor: "#14532D",
        headerBackTitle: "Volver",
        contentStyle: {
          backgroundColor: "#FAFAF9",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />

      <Stack.Screen name="suppliers/index" options={{ title: "Proveedores" }} />

      <Stack.Screen
        name="suppliers/new"
        options={{ title: "Nuevo proveedor" }}
      />

      <Stack.Screen
        name="suppliers/[supplierId]/index"
        options={{ title: "Detalle del proveedor" }}
      />

      <Stack.Screen
        name="suppliers/[supplierId]/edit"
        options={{ title: "Editar proveedor" }}
      />
    </Stack>
  );
}
