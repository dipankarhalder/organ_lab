import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function Appointment() {
  return (
    <SafeAreaView className="flex-1 bg-white px-4 pt-4">
      <Header />
      <View className="rounded-lg justify-center items-center bg-gray-200 py-7">
        <Text className="text-[22px] font-nunitosans-bold mb-1">
          Under Development
        </Text>
        <Text className="text-[16px] font-nunitosans-medium text-center">
          This section is under developmenmt for you.
        </Text>
      </View>
    </SafeAreaView>
  );
}
