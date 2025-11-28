import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InsideHeader from "../../components/InsideHeader";
import { docSpeciality } from "../../constant/static";

export default function Category() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-col w-full">
        <InsideHeader
          backLink={"/(apps)/doctors"}
          pageName={"All Categories"}
        />
        <View className="w-full flex-col mb-[26px] px-4">
          <View className="flex-row flex-wrap w-full mb-6 gap-[2px]">
            {docSpeciality.map((item) => {
              const { Icon, name, id, color } = item;
              return (
                <View
                  className="w-[92px] flex-col items-center gap-2 mb-8"
                  key={id}
                >
                  <View
                    style={{ backgroundColor: "#ffdce2ff" }}
                    className={`flex-row w-[70px] h-[70px] rounded-full justify-center items-center text-[${color}]`}
                  >
                    <Icon color={"#B00007"} />
                  </View>
                  <Text className="text-[13px] text-[#111111] font-nunitosans-semibold">
                    {name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
