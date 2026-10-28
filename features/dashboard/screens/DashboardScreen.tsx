import { useAuth } from "@/core/auth/AuthContext";
import { useRouter } from "expo-router";
import {
    Archive,
    ArrowLeftRight,
    Bell,
    Boxes,
    LogOut,
    Package,
    Truck,
    Users,
} from "lucide-react-native";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

const modules = [
  {
    id: "products",
    title: "Productos e insumos",
    description: "Catálogo y unidades",
    icon: Package,
    enabled: false,
  },
  {
    id: "movements",
    title: "Movimientos",
    description: "Entradas, salidas y ajustes",
    icon: ArrowLeftRight,
    enabled: false,
  },
  {
    id: "suppliers",
    title: "Proveedores",
    description: "Datos y abastecimiento",
    icon: Truck,
    enabled: true,
  },
  {
    id: "lots",
    title: "Lotes",
    description: "Ingresos y vencimientos",
    icon: Archive,
    enabled: false,
  },
  {
    id: "stock",
    title: "Stock y disponibilidad",
    description: "Consulta de existencias",
    icon: Boxes,
    enabled: false,
  },
  {
    id: "alerts",
    title: "Niveles mínimos",
    description: "Alertas de reposición",
    icon: Bell,
    enabled: false,
  },
  {
    id: "users",
    title: "Usuarios y seguridad",
    description: "Acceso y permisos",
    icon: Users,
    enabled: false,
  },
] as const;

export default function DashboardScreen() {
  const router = useRouter();
  const { session, signOut } = useAuth();

  function openModule(id: string, enabled: boolean) {
    if (enabled && id === "suppliers") {
      router.push("/suppliers");
      return;
    }

    Alert.alert(
      "Módulo en desarrollo",
      "Esta funcionalidad estará disponible cuando se integre su componente.",
    );
  }

  async function handleSignOut() {
    await signOut();
  }

  return (
    <ScrollView
      className="flex-1 bg-stone-50"
      contentContainerStyle={{ padding: 20, paddingBottom: 36 }}
    >
      <View className="mb-7 flex-row items-center justify-between">
        <View className="flex-1 pr-3">
          <Text className="text-sm text-slate-500">Ki Matcha Coffee</Text>

          <Text className="mt-1 text-2xl font-bold text-slate-900">
            Panel de inventario
          </Text>

          <Text className="mt-2 text-sm text-slate-600">
            Hola, {session?.user.name}. ¿Qué necesitas gestionar hoy?
          </Text>
        </View>

        <Pressable
          onPress={handleSignOut}
          accessibilityLabel="Cerrar sesión"
          className="h-11 w-11 items-center justify-center rounded-xl border border-stone-200 bg-white"
        >
          <LogOut size={20} color="#475569" />
        </Pressable>
      </View>

      <View className="mb-5 rounded-2xl bg-emerald-900 p-5">
        <Text className="text-lg font-semibold text-white">
          Gestión de inventario
        </Text>

        <Text className="mt-2 leading-5 text-emerald-100">
          Accede a los módulos para organizar el abastecimiento y consultar las
          existencias de la cafetería.
        </Text>
      </View>

      <Text className="mb-3 text-lg font-semibold text-slate-900">Módulos</Text>

      <View className="flex-row flex-wrap justify-between">
        {modules.map((item) => {
          const Icon = item.icon;

          return (
            <Pressable
              key={item.id}
              onPress={() => openModule(item.id, item.enabled)}
              className="mb-3 w-[48%] rounded-2xl border border-stone-200 bg-white p-4"
            >
              <View className="mb-4 h-11 w-11 items-center justify-center rounded-xl bg-emerald-50">
                <Icon size={22} color="#166534" />
              </View>

              <Text className="font-semibold text-slate-900">{item.title}</Text>

              <Text className="mt-1 text-xs leading-4 text-slate-500">
                {item.description}
              </Text>

              <View className="mt-4">
                <Text
                  className={
                    item.enabled
                      ? "text-sm font-semibold text-emerald-800"
                      : "text-xs text-slate-400"
                  }
                >
                  {item.enabled ? "Abrir módulo →" : "Próximamente"}
                </Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}
