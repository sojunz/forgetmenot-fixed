import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NotificationStore {
  morningTime: string;
  leaveTime: string;
  permission: NotificationPermission | null;
  setMorningTime: (time: string) => void;
  setLeaveTime: (time: string) => void;
  requestPermission: () => Promise<void>;
  scheduleNotifications: () => void;
}

const playSound = () => {
  const ctx = new AudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.frequency.value = 880;
  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
  oscillator.type = "triangle"; // 좀 더 따뜻한 소리
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.5);
};

export const useNotificationStore = create<NotificationStore>()(
  persist(
    (set, get) => ({
      morningTime: "08:00",
      leaveTime: "09:00",
      permission: null,

      setMorningTime: (time) => set({ morningTime: time }),
      setLeaveTime: (time) => set({ leaveTime: time }),

      requestPermission: async () => {
        const permission = await Notification.requestPermission();
        set({ permission });
      },

      scheduleNotifications: () => {
        const { morningTime, leaveTime, permission } = get();
        if (permission !== "granted") return;

        const now = new Date();

        // 아침 알림
        const [mHour, mMin] = morningTime.split(":").map(Number);
        const morningDate = new Date();
        morningDate.setHours(mHour, mMin, 0, 0);
        const morningDiff = morningDate.getTime() - now.getTime();
        if (morningDiff > 0) {
          setTimeout(() => {
            playSound();
            new Notification("Good morning! 🌱", {
              body: "Check your tasks and memos for today!",
              icon: "/favicon.svg",
            });
          }, morningDiff);
        }

        // Leave 알림
        const [lHour, lMin] = leaveTime.split(":").map(Number);
        const leaveDate = new Date();
        leaveDate.setHours(lHour, lMin, 0, 0);
        const leaveDiff = leaveDate.getTime() - now.getTime();
        if (leaveDiff > 0) {
          setTimeout(() => {
            playSound();
            new Notification("Before I Leave 🚪", {
              body: "Don't forget to check your leave checklist!",
              icon: "/favicon.svg",
            });
          }, leaveDiff);
        }
      },
    }),
    { name: "notification-storage" }
  )
);