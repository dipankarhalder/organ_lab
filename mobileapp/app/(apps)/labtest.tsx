import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { mainImg, allPackagesCheckup } from "../../constant/static";
import { Medical } from "../../constant/icon";

export default function LabTest() {
  const bookConsultations = () => {
    console.log("herllo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView className="px-4" showsVerticalScrollIndicator={false}>
        <View className="rounded-[10px] relative flex w-full h-[199px] mb-[26px] bg-blue-600 overflow-hidden">
          <ImageBackground
            source={mainImg.doctorBanner}
            resizeMode="cover"
            className="absolute w-full top-0 left-0 right-0 h-[199px]"
          ></ImageBackground>
        </View>
        <View className="w-full flex-col mb-[26px]">
          <Text className="font-nunitosans-bold text-[16px] mb-3">
            All the packages listed here
          </Text>
          <View className="flex-col gap-3">
            {allPackagesCheckup.map((item) => (
              <View
                key={item.id}
                className="flex-row gap-4 border bg-white border-gray-300 items-start rounded-[10px] p-[9px]"
              >
                <View className="w-[50px] h-[50px] bg-gray-100 flex items-center justify-center rounded-lg">
                  <Medical />
                </View>
                <View className="flex">
                  <View className="flex-col mb-1">
                    <Text className="text-[16px] text-[#C41131] font-nunitosans-bold">
                      {item.title}
                    </Text>
                  </View>
                  <View className="flex-row items-center">
                    <Text className="text-gray-500 text-[13px] mr-6 line-through font-nunitosans-medium">
                      Rs. {item.price}/-
                    </Text>
                    <View className="w-[1px] bg-gray-400 h-[12px]" />
                    <Text className="text-black text-[13px] font-nunitosans-bold ml-6">
                      {item.testCount}
                    </Text>
                  </View>
                  <View className="flex-row items-center mb-4">
                    <Text className="text-black text-[14px] mr-3 font-nunitosans-bold">
                      Rs. {item.offerPrice}/-
                    </Text>
                    <Text className="text-green-600 text-[13px] font-nunitosans-bold  mr-8">
                      ({item.offerPer})
                    </Text>
                  </View>
                  <View className="flex-row mb-1">
                    <Text className="text-gray-500 text-[13px] font-nunitosans-semibold">
                      Reports {item.report}
                    </Text>
                  </View>
                  <View className="w-full flex-row gap-2">
                    <TouchableOpacity
                      onPress={bookConsultations}
                      className={`py-[6px] px-4 rounded-md items-center bg-white border border-[#C41131]`}
                    >
                      <Text className="text-[#C41131] text-[13px] font-nunitosans-bold">
                        Add to Cart
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={bookConsultations}
                      className={`py-2 pl-3 pr-4 rounded-md items-center bg-white flex-row items-center gap-2`}
                    >
                      <Text className="text-blue-700 underline text-[13px] font-nunitosans-bold">
                        Details
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
