import { useEffect, useRef, useState } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useAuthStore } from "../../store/auth";
import { mainImg } from "../../constant/static";

export default function Otp() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [counter, setCounter] = useState(60);

  const inputRefs = useRef<TextInput[]>([]);
  const router = useRouter();
  const { phone } = useLocalSearchParams<{ phone: string }>();
  const login = useAuthStore((state) => state.login);

  const handleOtpVerify = () => {
    const code = otp.join("");
    if (code.length === 4) {
      login();
      router.replace("/(apps)/home");
    }
  };

  const handleChange = (text: string, index: number) => {
    if (!/^\d*$/.test(text)) return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && otp[index] === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  useEffect(() => {
    if (counter === 0) return;
    const timer = setInterval(() => setCounter((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  return (
    <View className="flex-1 bg-white">
      <View className="flex-[4.5] justify-end">
        <ImageBackground
          source={mainImg.topBg}
          resizeMode="contain"
          className={`absolute top-0 left-0 right-0 ${Platform.OS === "ios" ? "h-[397px]" : "h-[420px]"}`}
        />
        <View className="px-6 py-4">
          <Text className="font-nunitosans-bold text-[#C41131] text-[48px] leading-tight">
            Input 4 digit
          </Text>
          <Text className="text-black font-nunitosans-bold text-[48px] leading-tight">
            OTP
          </Text>
        </View>
      </View>

      <KeyboardAvoidingView
        className="flex-[5.5]"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <SafeAreaView className="flex-1">
          <View className="flex-1 items-center justify-start px-6 pt-7 bg-white">
            <Text
              className={`text-gray-500 font-nunitosans-medium w-full mb-1 ${Platform.OS === "ios" ? "text-[15px]" : "text-[19px]"}`}
            >
              Enter the{" "}
              <Text className="text-[#535353] font-nunitosans-bold">
                OTP Code
              </Text>{" "}
              sent to
            </Text>
            <Text className="text-[#C41131] text-xl font-nunitosans-bold w-full">
              +91 {phone}
            </Text>

            <View className="flex-row justify-start w-full mt-6 mb-6 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(ref) => {
                    if (ref) inputRefs.current[index] = ref;
                  }}
                  value={otp[index]}
                  onChangeText={(text) => handleChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  className="w-[54px] h-[54px] border border-gray-300 rounded-lg text-center text-xl font-nunitosans-semibold text-black"
                />
              ))}
            </View>

            {counter > 0 ? (
              <Text className="text-gray-500 text-[15px] font-nunitosans-semibold w-full text-left mb-2">
                Don&#39;t receive a code?{" "}
                <Text className="text-[#000000] font-nunitosans-bold">
                  00:{counter < 10 ? `0${counter}` : counter}
                </Text>
              </Text>
            ) : (
              <View className="w-full items-start mt-2">
                <TouchableOpacity
                  onPress={() => {
                    setCounter(60);
                  }}
                >
                  <Text className="text-[17px] text-[#C41131] font-nunitosans-bold">
                    Resend OTP
                  </Text>
                </TouchableOpacity>
              </View>
            )}

            <View className="absolute bottom-14 w-full px-[70px]">
              <TouchableOpacity
                onPress={handleOtpVerify}
                disabled={otp.some((digit) => digit === "")}
                className={`py-4 rounded-lg items-center ${
                  otp.every((digit) => digit !== "")
                    ? "bg-[#C41131]"
                    : "bg-gray-300"
                }`}
              >
                <Text className="text-white text-[20px] font-nunitosans-semibold">
                  Verify OTP
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </View>
  );
}
