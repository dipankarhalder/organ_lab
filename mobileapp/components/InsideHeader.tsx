import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity } from "react-native";
import { Back } from "../constant/icon";

interface Props {
  backLink: string;
  pageName: string;
}

export default function InsideHeader({ backLink, pageName }: Props) {
  const router = useRouter();

  return (
    <View className="w-full flex-row mb-6 mt-3 px-4 items-center gap-4">
      <TouchableOpacity
        onPress={() => router.replace(backLink as any)}
        className="w-[24px] h-[24px]"
      >
        <Back />
      </TouchableOpacity>
      <Text className="text-black text-center text-[15px] font-nunitosans-semibold">
        {pageName}
      </Text>
    </View>
  );
}
