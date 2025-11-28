import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";

export default function Locations() {
  return (
    <SafeAreaView className="flex-1 bg-white pt-4">
      <Header />
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <Text className="text-[14px] text-black font-nunitosans-bold mt-2 mb-3">
          You are currently located near us
        </Text>
        <View className="border bg-gray-100 border-gray-300 rounded-xl px-4 py-3 mb-4">
          <Text className="text-[17px] text-[#C41131] font-nunitosans-bold">
            Organ Diagnostic Center (Durgapur)
          </Text>
          <View className="text-[14px] flex-row gap-4 mt-3 mb-[4px]">
            <Text className="text-gray-500 font-nunitosans-semibold w-[60px]">
              Code:
            </Text>
            <Text className="text-black font-nunitosans-bold">DCB</Text>
          </View>
          <View className="text-[14px] flex-row gap-4 mb-[4px]">
            <Text className="text-gray-500 font-nunitosans-semibold w-[60px]">
              Address:
            </Text>
            <Text className="text-black font-nunitosans-bold w-[270px]">
              33/1 A, K. N. Road, Address for Test, P.O - Beharampore, Test
            </Text>
          </View>
          <View className="text-[14px] flex-row gap-4">
            <Text className="text-gray-500 font-nunitosans-semibold w-[60px]">
              Pincode:
            </Text>
            <Text className="text-black font-nunitosans-bold">776549</Text>
          </View>
        </View>
        <Text className="text-[14px] text-gray-500 font-nunitosans-bold mt-8 mb-3">
          ...we also available at
        </Text>
        <View className="flex-col gap-4">
          {[1, 2, 3].map((item) => (
            <View
              className="border bg-white border-gray-300 rounded-xl px-4 py-3"
              key={item}
            >
              <Text className="text-[15px] text-[#C41131] font-nunitosans-bold">
                Organ Diagnostic Center (Barasat)
              </Text>
              <View className="flex-row gap-4 mt-3 mb-[4px]">
                <Text className="text-[13px] text-gray-500 font-nunitosans-semibold w-[60px]">
                  Code:
                </Text>
                <Text className="text-[13px] text-black font-nunitosans-bold">
                  DCB
                </Text>
              </View>
              <View className="flex-row gap-4 mb-[4px]">
                <Text className="text-[13px] text-gray-500 font-nunitosans-semibold w-[60px]">
                  Address:
                </Text>
                <Text className="text-[13px] text-black font-nunitosans-bold w-[270px]">
                  33/1 A, K. N. Road, Address for Test, P.O - Beharampore, Test
                </Text>
              </View>
              <View className="flex-row gap-4">
                <Text className="text-[13px] text-gray-500 font-nunitosans-semibold w-[60px]">
                  Pincode:
                </Text>
                <Text className="text-[13px] text-black font-nunitosans-bold">
                  743369
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
