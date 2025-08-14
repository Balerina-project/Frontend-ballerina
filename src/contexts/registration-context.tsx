"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import { useAuth } from "./auth-context";

interface Registration {
  id: string;
  eventId: string;
  userId: string;
  registeredAt: string;
  status: "confirmed" | "waitlist" | "cancelled";
}

interface RegistrationContextType {
  registrations: Registration[];
  registerForEvent: (eventId: string) => Promise<boolean>;
  unregisterFromEvent: (eventId: string) => Promise<boolean>;
  isRegisteredForEvent: (eventId: string) => boolean;
  getUserRegistrations: () => Registration[];
  isLoading: boolean;
}

const RegistrationContext = createContext<RegistrationContextType | undefined>(
  undefined
);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    // Load user's registrations from localStorage
    if (user) {
      const storedRegistrations = localStorage.getItem(
        `registrations_${user.id}`
      );
      if (storedRegistrations) {
        setRegistrations(JSON.parse(storedRegistrations));
      }
    } else {
      setRegistrations([]);
    }
  }, [user]);

  const saveRegistrations = (newRegistrations: Registration[]) => {
    if (user) {
      localStorage.setItem(
        `registrations_${user.id}`,
        JSON.stringify(newRegistrations)
      );
      setRegistrations(newRegistrations);
    }
  };

  const registerForEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const newRegistration: Registration = {
        id: Date.now().toString(),
        eventId,
        userId: user.id,
        registeredAt: new Date().toISOString(),
        status: "confirmed",
      };

      const updatedRegistrations = [...registrations, newRegistration];
      saveRegistrations(updatedRegistrations);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const unregisterFromEvent = async (eventId: string): Promise<boolean> => {
    if (!user) return false;

    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      const updatedRegistrations = registrations.filter(
        (reg) => !(reg.eventId === eventId && reg.userId === user.id)
      );
      saveRegistrations(updatedRegistrations);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const isRegisteredForEvent = (eventId: string): boolean => {
    if (!user) return false;
    return registrations.some(
      (reg) =>
        reg.eventId === eventId &&
        reg.userId === user.id &&
        reg.status === "confirmed"
    );
  };

  const getUserRegistrations = (): Registration[] => {
    if (!user) return [];
    return registrations.filter((reg) => reg.userId === user.id);
  };

  return (
    <RegistrationContext.Provider
      value={{
        registrations,
        registerForEvent,
        unregisterFromEvent,
        isRegisteredForEvent,
        getUserRegistrations,
        isLoading,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const context = useContext(RegistrationContext);
  if (context === undefined) {
    throw new Error(
      "useRegistration must be used within a RegistrationProvider"
    );
  }
  return context;
}
