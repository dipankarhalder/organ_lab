import React from "react";
import {
  ActivityIndicator,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";

interface CustomButtonProps extends TouchableOpacityProps {
  title: string;
  loading?: boolean;
}

export default function CustomButton({
  title,
  loading = false,
  ...props
}: CustomButtonProps) {
  return (
    <TouchableOpacity
      className={`bg-[#FF0000] py-3 rounded-lg items-center flex-row justify-center ${
        loading ? "opacity-70" : ""
      }`}
      activeOpacity={0.8}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-[16px] font-avenirnext-demibold">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}
