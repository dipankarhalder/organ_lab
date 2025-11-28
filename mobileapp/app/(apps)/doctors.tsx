import { useRouter } from "expo-router";
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import { mainImg, recomDoctor, docSpeciality } from "../../constant/static";
import { Star, Phone } from "../../constant/icon";

export default function Doctors() {
  const router = useRouter();

  const bookConsultations = () => {
    console.log("herllo");
  };

  const handleAllCategory = () => {
    router.replace("/(extra)/category");
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
          <Text className="font-nunitosans-bold text-[16px] mb-4">
            Find doctors by speciality
          </Text>
          <View className="flex-row flex-wrap w-full mb-6 gap-[1px]">
            {docSpeciality.map((item) => {
              const { Icon, name, id, color } = item;
              return (
                <View
                  className="w-[74px] flex-col items-center gap-2 mb-5"
                  key={id}
                >
                  <View
                    style={{ backgroundColor: "#ffdce2ff" }}
                    className={`flex-row w-[50px] h-[50px] rounded-full justify-center items-center text-[${color}]`}
                  >
                    <Icon color={"#B00007"} />
                  </View>
                  <Text className="text-[11px] text-[#111111] font-nunitosans-semibold">
                    {name}
                  </Text>
                </View>
              );
            })}
            <View className="flex-row justify-center px-[100px] mb-6">
              <TouchableOpacity
                onPress={handleAllCategory}
                className="w-full flex-row justify-center"
              >
                <Text className="text-[#C41131] text-center underline text-[13px] font-nunitosans-semibold">
                  and more option...
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <Text className="font-nunitosans-bold text-[16px] mb-3">
            Find best doctor for you
          </Text>
          <View className="bg-white flex gap-3">
            {recomDoctor.map((item) => (
              <View
                key={item.id}
                className="flex-col gap-4 border bg-white border-gray-300 items-start rounded-[10px] p-[9px]"
              >
                <View className="flex-row gap-4">
                  <View className="rounded-md overflow-hidden w-[90px] h-[90px]">
                    <Image
                      source={item.image}
                      style={{ width: 90, height: 90 }}
                      resizeMode="cover"
                    />
                  </View>
                  <View className="flex-col">
                    <Text className="text-[16px] text-[#C41131] font-nunitosans-bold mt-[-2px] mb-1">
                      {item.name}
                    </Text>
                    <View className="flex-row gap-4 items-center">
                      <Text className="text-black text-[14px] font-nunitosans-semibold">
                        {item.special}
                      </Text>
                      <View className="w-[1px] bg-gray-400 h-[12px]" />
                      <Text className="text-gray-500 text-[13px] font-nunitosans-semibold">
                        {item.exp} years experience
                      </Text>
                    </View>
                    <View className="mb-2">
                      <Text className="text-gray-500 text-[13px] font-nunitosans-semibold">
                        {item.address}
                      </Text>
                    </View>
                    <View className="flex-row gap-3 items-center">
                      <Star />
                      <Text className="textblack text-[13px] font-nunitosans-semibold">
                        {item.rating} ({item.review} reviews)
                      </Text>
                    </View>
                  </View>
                </View>
                <View className="w-full flex-row gap-2">
                  <View className="flex-col items-start mr-[39px]">
                    <View className="flex-row gap-[6px]">
                      <Star />
                      <Text className="text-green-600 text-[11px] font-nunitosans-bold">
                        {item.recom}%
                      </Text>
                    </View>
                    <Text className="text-gray-500 text-[11px] font-nunitosans-semibold">
                      recommend
                    </Text>
                  </View>
                  <TouchableOpacity
                    onPress={bookConsultations}
                    className={`py-[6px] px-4 rounded-md items-center bg-white border border-[#C41131]`}
                  >
                    <Text className="text-[#C41131] text-[13px] font-nunitosans-semibold">
                      Appointment
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={bookConsultations}
                    className={`py-2 pl-3 pr-4 rounded-md items-center bg-gray-200 flex-row items-center gap-2`}
                  >
                    <Phone height={14} width={14} color={"#666666"} />
                    <Text className="text-black text-[13px] font-nunitosans-semibold">
                      Contact Clinic
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
