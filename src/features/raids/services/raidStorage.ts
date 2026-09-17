import AsyncStorage from "@react-native-async-storage/async-storage";
 
const RAID_STORAGE_KEY = "@raid_timer";

export async function saveRaidCompletion(
    raidId: string,
    completedAt: number
) {
    const storedData = await AsyncStorage.getItem(RAID_STORAGE_KEY);

    const raids = storedData ? JSON.parse(storedData) : {};

    raids[raidId] = completedAt;

    await AsyncStorage.setItem(
        RAID_STORAGE_KEY,
        JSON.stringify(raids)
    );
}

export async function getRaidCompletion(
    raidId: string
) : Promise<number | null > {
    const storedData = await AsyncStorage.getItem(RAID_STORAGE_KEY);

    if (!storedData) {
        return null;
    }

    const raids = JSON.parse(storedData);
    return raids[raidId] ?? null;
}