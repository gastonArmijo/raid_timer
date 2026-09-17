import { useLocalSearchParams } from "expo-router";
import { Image, Text, View } from "react-native";

import { raids } from "@/features/raids/data/raids";

export default function RaidDetailScreen() {
  const { id } = useLocalSearchParams();

  const raid = raids.find((raid) => raid.id === id);

  if (!raid) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-100">
        <Text className="text-xl font-bold text-gray-900">
          Raid no encontrada
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-gray-100 px-4 pt-8">

      <Text className="text-3xl font-bold text-gray-900">
        {raid.name}
      </Text>

      <Text className="mt-2 text-base text-gray-500">
        📍 {raid.location}
      </Text>

      <View className="mt-6 items-center">
        <Image
          source={raid.image}
          className="h-48 w-48 rounded-2xl"
          resizeMode="contain"
        />
      </View>

    </View>
  );
}

