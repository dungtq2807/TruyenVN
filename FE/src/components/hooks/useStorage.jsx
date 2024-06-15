import { useCallback, useState, useEffect } from 'react';

export function useLocalStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.localStorage);
}

export function useSessionStorage(key, defaultValue) {
    return useStorage(key, defaultValue, window.sessionStorage);
}

function useStorage(key, defaultValue, storageObject) {
    const [value, setValue] = useState(() => {
        const jsonValue = storageObject.getItem(key);
        if (jsonValue != null) return JSON.parse(jsonValue);

        if (typeof defaultValue === 'function') {
            return defaultValue();
        } else {
            return defaultValue;
        }
    });

    useEffect(() => {
        if (value === undefined || value === null) {
            storageObject.removeItem(key);
        } else {
            storageObject.setItem(key, JSON.stringify(value));
        }
    }, [key, value, storageObject]);

    const remove = useCallback(() => {
        setValue(null); // Set value to null to trigger removal in useEffect
    }, []);

    return [value, setValue, remove];
}
