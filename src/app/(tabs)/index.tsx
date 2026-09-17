import RaidCard from '@/features/raids/components/RaidCard';
import { raids } from '@/features/raids/data/raids';
import { ScrollView, Text, View } from "react-native";


export default function HomeScreen() {
  return (
    <View className='flex-1 bg-gray-100 px-4 pt-16'>
      <Text className='mb-6 text-3xl font-bold text-gray-900'>
        Raid Timer
      </Text>

      <ScrollView>
        {raids.map((raid) => (
          <RaidCard key={raid.id} raid={raid}/>
        ))}
      </ScrollView>
    </View>
    
  );

};
