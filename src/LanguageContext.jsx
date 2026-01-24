import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
    const [lang, setLang] = useState('en');

    // Load saved language on mount
    useEffect(() => {
        const saved = localStorage.getItem('appLang');
        if (saved) {
            setLang(saved);
        }
    }, []);

    const toggleLanguage = () => {
        const newLang = lang === 'en' ? 'te' : 'en';
        setLang(newLang);
        localStorage.setItem('appLang', newLang);
    };

    const t = (path) => {
        const keys = path.split('.');
        let current = translations[lang];
        for (let key of keys) {
            if (current[key] === undefined) {
                console.warn(`Translation missing for key: ${path} in language: ${lang}`);
                return path;
            }
            current = current[key];
        }
        return current;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
};
