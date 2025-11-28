import React from "react";
import { View, Text } from "react-native";
import { User, Wallet, Shop } from "../constant/icon";

export default function Header() {
  return (
    <View className="w-full flex-row justify-between mb-6 pt-3 px-4">
      <View className="flex-row gap-3">
        <User />
        <View className="flex-col mt-[-2px]">
          <Text className="text-[20px] font-nunitosans-extrabold">
            Hi, Dipankar
          </Text>
          <Text className="text-[14px] text-[#C41131] font-nunitosans-bold underline">
            Durgapur - 776549
          </Text>
        </View>
      </View>
      <View className="flex-row gap-10">
        <Wallet />
        <Shop />
      </View>
    </View>
  );
}
