import { useState } from "react";
import { useRouter } from "expo-router";
import {
  Text,
  View,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { mainImg } from "../../constant/static";
import { Phone } from "../../constant/icon";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleNextPress = () => {
    const trimmedPhone = phone.trim();
    if (trimmedPhone.length < 10) {
      setError("Please enter a valid phone number.");
      return;
    }

    setError("");
    router.replace({
      pathname: "/otp",
      params: { phone: trimmedPhone },
    });
  };

  const isPhoneValid = phone.trim().length >= 10;

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[4.5] justify-end">
        <ImageBackground
          source={mainImg.topBg}
          resizeMode="cover"
          className={`absolute top-0 left-0 right-0 ${Platform.OS === "ios" ? "h-[397px]" : "h-[450px]"}`}
        />
        <View className="px-6 py-4">
          <Text className="font-nunitosans-bold text-[#C41131] text-[48px] leading-tight">
            Welcome
          </Text>
          <Text className="text-black font-nunitosans-bold text-[48px] leading-tight">
            back!
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-[5.5]"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-start px-6 bg-white pt-7">
            <Text
              className={`text-gray-500 font-nunitosans-medium ${Platform.OS === "ios" ? "text-[15px]" : "text-[19px]"}`}
            >
              You can login or make an account if you&#39;re new to{" "}
              <Text className="text-[#C41131] font-nunitosans-semibold">
                Organ Diagnostics.
              </Text>
            </Text>

            <View
              className={`flex-row items-center border border-gray-300 rounded-[10px] gap-3 px-4 mb-4 mt-4 ${Platform.OS === "ios" ? "h-[50px]" : "h-[54px]"}`}
            >
              <Phone />
              <TextInput
                placeholder="Phone number"
                keyboardType="phone-pad"
                maxLength={10}
                value={phone}
                onChangeText={(text) => {
                  const cleaned = text.replace(/[^0-9]/g, "");
                  setPhone(cleaned);
                }}
                className={`flex-1 text-black font-nunitosans-semibold ${Platform.OS === "ios" ? "text-[16px]" : "text-[18px]"}`}
                placeholderTextColor="#999"
              />
            </View>
            {error !== "" && (
              <Text className="text-[#C41131] text-sm font-nunitosans-medium mt-1 mb-2">
                {error}
              </Text>
            )}

            <View className="absolute bottom-14 w-full px-[70px]">
              <TouchableOpacity
                onPress={handleNextPress}
                disabled={!isPhoneValid}
                className={`py-4 rounded-lg items-center ${
                  isPhoneValid ? "bg-[#C41131]" : "bg-gray-300"
                }`}
              >
                <Text className="text-white text-[20px] font-nunitosans-semibold">
                  Continue
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
