import * as SecureStore from "expo-secure-store";

/**
 * Stores a value under a key securely
 */
export const encryptKey = async (key: string, value: string): Promise<void> => {
  await SecureStore.setItemAsync(key, value);
};

/**
 * Retrieves a stored value by key
 */
export const decryptKey = async (key: string): Promise<string | null> => {
  return await SecureStore.getItemAsync(key);
};

/**
 * Deletes a stored value by key
 */
export const deleteKey = async (key: string): Promise<void> => {
  await SecureStore.deleteItemAsync(key);
};
