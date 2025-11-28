import React, { useRef, useState } from "react";
import { useRouter } from "expo-router";
import {
  View,
  ScrollView,
  Text,
  Dimensions,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
  ImageBackground,
  Image,
} from "react-native";
import { logo, slides } from "../constant/static";
import { useSplashStore } from "../store/splash";

const { width } = Dimensions.get("window");
const { height: screenHeight } = Dimensions.get("screen");

export default function Index() {
  const router = useRouter();
  const scrollRef = useRef<ScrollView>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const setHasSeenSplash = useSplashStore((state) => state.setHasSeenSplash);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentSlide(index);
  };

  const handleDotPress = (index: number) => {
    if (currentSlide === 2) return;
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
  };

  const handleGetStarted = () => {
    setHasSeenSplash(true);
    router.replace("/(auth)/login");
  };

  return (
    <View className="flex-1 bg-black">
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        className="flex-1"
        scrollEnabled={currentSlide !== 2}
        contentContainerStyle={{ height: screenHeight }}
      >
        {slides.map((slide) => (
          <ImageBackground
            key={slide.id}
            source={slide.image}
            resizeMode="cover"
            style={{ width, height: screenHeight }}
            className="flex-1 items-center justify-center"
          />
        ))}
      </ScrollView>
      <View className="absolute top-[160px] w-full flex-row justify-center space-x-2">
        <Image
          source={logo}
          style={{ width: 265, height: 71 }}
          resizeMode="contain"
        />
      </View>
      {currentSlide !== 2 && (
        <View className="absolute bottom-10 w-full flex-row justify-center space-x-2">
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleDotPress(index)}
              activeOpacity={0.6}
              disabled={currentSlide === 2}
            >
              <View
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentSlide === index ? "bg-white" : "bg-gray-400"
                }`}
              />
            </TouchableOpacity>
          ))}
        </View>
      )}
      {currentSlide === 2 && (
        <View className="absolute bottom-14 w-full px-[90px]">
          <TouchableOpacity
            onPress={handleGetStarted}
            className="bg-[#C41131] py-4 rounded-[10px] items-center"
          >
            <Text className="text-[#ffffff] text-[20px] font-nunitosans-semibold">
              Get Started
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
