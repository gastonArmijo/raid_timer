import { Pressable, Text, View } from "react-native";
import { useRaidTimer } from "../hooks/useRaidTimer";
import { Raid } from "../types/raid.types";

type RaidCardProps = {
    raid: Raid;
   
};

function formatTime(milliseconds: number): string {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2, "0")}`;
}


export default function RaidCard({raid}: RaidCardProps) {

    const {
        isLoading,
        isAvailable,
        remainingMs,
        completeRaid,
    } = useRaidTimer(raid.id);

    if (isLoading) {
        return (
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="text-xl font-bold text-gray-900">
                {raid.name}
            </Text>

            <Text className="mt-2 text-gray-500">
                Cargando...
            </Text>

            
        </View>
    );
    }
    return (
        
        <View className="mb-4 rounded-2xl bg-white p-4 shadow-sm">
            <Text className="text-xl font-bold text-gray-900">
                {raid.name}
            </Text>

            <Text className="mt-1 text-sm text-gray-500">
                📍 {raid.location}
            </Text>

            {isAvailable ? (
                <>
                <View className="mt-4 rounded-xl bg-green-100 p-3">
                <Text className="font-semibold text-green-700">
                    Diponible
                </Text>
            </View>

            <Pressable 
            className="mt-4 rounded-xl bg-blue-600 p-4"
            onPress={completeRaid}
            >
                <Text className="text-center font-bold text-white">
                    Complete la raid.
                </Text>
            </Pressable>
            </>
            ):(
            <View className="mt-4 rounded-xl bg-gray-100 p-4">
                <Text className="text-center text-sm text-gray 500">
                    Proxima disponibilidad
                </Text>

                <Text className="mt-1 text-center text-3xl font-bold text-gray-900">
                    {formatTime(remainingMs)}
                </Text>
            </View>

            )}

            </View>

            
    );
    
    
}