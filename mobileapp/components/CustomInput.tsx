import React from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

interface CustomInputProps extends TextInputProps {
  label?: string;
  error?: string;
  secureTextEntry?: boolean;
}

export default function CustomInput({
  label,
  error,
  secureTextEntry = false,
  ...props
}: CustomInputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="mb-1 text-base font-avenirnext-demibold text-gray-700">
          {label}
        </Text>
      )}
      <TextInput
        className={`border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-lg px-5 py-3 text-base bg-white font-avenirnext-medium`}
        secureTextEntry={secureTextEntry}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && <Text className="text-red-500 mt-1 text-sm">{error}</Text>}
    </View>
  );
}
