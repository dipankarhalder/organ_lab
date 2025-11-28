import { useEffect } from "react";
import { Text } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { useAuthStore } from "../../store/auth";
import { tabsInformation } from "../../constant/static";

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/(auth)/login");
    }
  }, [isAuthenticated, router]);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#C41131",
        tabBarInactiveTintColor: "#8e8e93",
        tabBarStyle: [
          {
            height: 90,
            paddingTop: 6,
          },
        ],
      }}
    >
      {tabsInformation.map(({ name, title, Icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: title,
            tabBarLabel: ({ color }) => (
              <Text
                className={`text-[${color}] font-avenirnext-demibold text-[11px] mt-1`}
              >
                {title}
              </Text>
            ),
            tabBarIcon: ({ color }) => (
              <Icon width={24} height={24} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
