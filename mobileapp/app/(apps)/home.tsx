import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthStore } from "../../store/auth";
import Header from "../../components/Header";
import {
  mainImg,
  docSpeciality,
  tabListItem,
  recomDoctor,
  allPackagesCheckup,
} from "../../constant/static";
import { Heart1, Heart2, Star, Phone, Medical } from "../../constant/icon";

export default function Home() {
  const [activeTab, setActiveTab] = useState("doctors");
  const setAuthenticated = useAuthStore((state) => state.setAuthenticated);
  const router = useRouter();

  const handleLogout = () => {
    setAuthenticated(false);
    router.replace("/(auth)/login");
  };

  const bookConsultations = () => {
    console.log("herllo");
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="flex-col px-4">
          <View className="rounded-[10px] relative flex w-full h-[199px] mb-[26px] bg-blue-600 overflow-hidden">
            <ImageBackground
              source={mainImg.homeBanner}
              resizeMode="cover"
              className="absolute w-full top-0 left-0 right-0 h-[199px]"
            ></ImageBackground>
          </View>
          <View className="w-full flex-col mb-[30px]">
            <Text className="font-nunitosans-bold text-[18px] mb-2">
              Our Services
            </Text>
            <View className="flex-row w-full gap-4 justify-between">
              <View className="flex-row py-3 px-4 w-[48%] items-center rounded-lg gap-4 bg-[#FFCBCB]">
                <Heart1 />
                <View className="flex-col">
                  <Text className="font-nunitosans-bold text-[15px]">
                    Lab Test
                  </Text>
                  <Text className="font-nunitosans-bold text-[15px]">
                    Appointment
                  </Text>
                </View>
              </View>
              <View className="flex-row py-3 px-4 w-[48%] items-center rounded-lg gap-4 bg-[#B0EEE2]">
                <Heart2 />
                <View className="flex-col">
                  <Text className="font-nunitosans-bold text-[15px]">
                    Doctor
                  </Text>
                  <Text className="font-nunitosans-bold text-[15px]">
                    Appointment
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View className="w-full flex-col mb-[50px]">
            <Text className="font-nunitosans-bold text-[18px] mb-2">
              Doctor Speciality
            </Text>
            <View className="bg-white flex">
              <FlatList
                horizontal
                data={docSpeciality}
                scrollEventThrottle={16}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  const { Icon, name, id, color, bgColor } = item;
                  return (
                    <View
                      className="w-[76px] mr-3 flex-col items-center gap-2"
                      key={id}
                    >
                      <View
                        style={{ backgroundColor: bgColor }}
                        className={`flex-row w-[50px] h-[50px] rounded-full justify-center items-center text-[${color}]`}
                      >
                        <Icon color={color} />
                      </View>
                      <Text className="text-[12px] text-[#111111] font-nunitosans-semibold">
                        {name}
                      </Text>
                    </View>
                  );
                }}
              />
            </View>
          </View>
          <View className="flex-row justify-between px-4 z-[1]">
            {tabListItem.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                className={`pt-3 pb-2 px-4 w-[50%] rounded-t-lg 
                  ${
                    activeTab === tab.key
                      ? "border-t border-l border-r border-gray-300 bg-white"
                      : "border-t border-l border-r border-white"
                  }`}
              >
                <Text
                  className={`text-[14px] text-center font-nunitosans-bold ${
                    activeTab === tab.key ? "text-black" : "text-gray-500"
                  }`}
                >
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <View className="flex-col border-t border-gray-300 px-4 mt-[-2px]">
          {activeTab === "doctors" && (
            <View className="w-full flex-col pt-[16px] pb-8">
              <Text className="font-nunitosans-bold text-[16px] mb-3">
                Recommendated Doctor
              </Text>
              <View className="flex-col gap-4">
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
          )}
          {activeTab === "tests" && (
            <View className="w-full flex-col pt-[16px] pb-8">
              <Text className="font-nunitosans-bold text-[16px] mb-3">
                All Available Packages
              </Text>
              <View className="flex-col gap-4">
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
          )}
        </View>
        <TouchableOpacity onPress={handleLogout} style={{ display: "none" }}>
          <Text className="text-center mt-10">Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
