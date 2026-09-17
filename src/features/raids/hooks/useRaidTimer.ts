import { useEffect, useState } from "react";
import {
  getRaidCompletion,
  saveRaidCompletion,
} from "../services/raidStorage";

const COOLDOWN_MS = 90 * 24 * 60 * 60 * 1000;

interface RaidTimerState {
  isLoading: boolean;
  isAvailable: boolean;
  remainingMs: number;
}

export function useRaidTimer(raidId: string): RaidTimerState & {
  completeRaid: () => Promise<void>;
} {
  const [state, setState] = useState<RaidTimerState>({
    isLoading: true,
    isAvailable: true,
    remainingMs: 0,
  });

  useEffect(() => {
    loadRaidStatus();

    const interval = setInterval(() => {
      updateTimer();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [raidId]);

  async function loadRaidStatus() {
    const completedAt = await getRaidCompletion(raidId);

    if (!completedAt) {
      setState({
        isLoading: false,
        isAvailable: true,
        remainingMs: 0,
      });

      return;
    }

    updateTimer(completedAt);
  }

  function updateTimer(completedAt?: number) {
    if (!completedAt) {
      getRaidCompletion(raidId).then((storedCompletedAt) => {
        if (!storedCompletedAt) {
          setState({
            isLoading: false,
            isAvailable: true,
            remainingMs: 0,
          });

          return;
        }

        calculateRemainingTime(storedCompletedAt);
      });

      return;
    }

    calculateRemainingTime(completedAt);
  }

  function calculateRemainingTime(completedAt: number) {
    const availableAt = completedAt + COOLDOWN_MS;
    const remainingMs = Math.max(0, availableAt - Date.now());

    if (remainingMs <= 0) {
      setState({
        isLoading: false,
        isAvailable: true,
        remainingMs: 0,
      });

      return;
    }

    setState({
      isLoading: false,
      isAvailable: false,
      remainingMs,
    });
  }

  async function completeRaid() {
    const completedAt = Date.now();

    await saveRaidCompletion(raidId, completedAt);

    calculateRemainingTime(completedAt);
  }

  return {
    ...state,
    completeRaid,
  };
}