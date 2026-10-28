import { useAuth } from "@/core/auth/AuthContext";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  async function handleLogin() {
    setError("");
    setSubmitting(true);

    try {
      await signIn(username, password);
      router.replace("/(app)");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "No fue posible iniciar sesión.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-stone-50"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <View className="flex-1 justify-center px-6">
        <View className="mb-8 items-center">
          <View className="mb-4 h-20 w-20 items-center justify-center rounded-3xl bg-emerald-900">
            <Text className="text-3xl font-bold text-white">KM</Text>
          </View>

          <Text className="text-3xl font-bold text-slate-900">
            Ki Matcha Coffee
          </Text>

          <Text className="mt-2 text-center text-base text-slate-500">
            Gestión de inventario
          </Text>
        </View>

        <View className="rounded-3xl border border-stone-200 bg-white p-6">
          <Text className="text-xl font-semibold text-slate-900">
            Iniciar sesión
          </Text>

          <Text className="mb-6 mt-1 text-sm text-slate-500">
            Ingresa tus credenciales para continuar.
          </Text>

          <Text className="mb-2 text-sm font-medium text-slate-700">
            Usuario
          </Text>

          <TextInput
            value={username}
            onChangeText={setUsername}
            placeholder="Ingresa tu usuario"
            autoCapitalize="none"
            autoCorrect={false}
            className="mb-5 h-12 rounded-xl border border-stone-300 px-4 text-slate-900"
            accessibilityLabel="Usuario"
          />

          <Text className="mb-2 text-sm font-medium text-slate-700">
            Contraseña
          </Text>

          <TextInput
            value={password}
            onChangeText={setPassword}
            placeholder="Ingresa tu contraseña"
            secureTextEntry
            className="h-12 rounded-xl border border-stone-300 px-4 text-slate-900"
            accessibilityLabel="Contraseña"
          />

          {error ? (
            <Text
              accessibilityRole="alert"
              className="mt-3 text-sm text-red-600"
            >
              {error}
            </Text>
          ) : null}

          <Pressable
            disabled={submitting}
            onPress={handleLogin}
            className="mt-6 h-12 items-center justify-center rounded-xl bg-emerald-900"
          >
            {submitting ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text className="font-semibold text-white">Entrar</Text>
            )}
          </Pressable>
        </View>

        <Text className="mt-6 text-center text-xs text-slate-400">
          Inventario · Abastecimiento · Existencias
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
}
