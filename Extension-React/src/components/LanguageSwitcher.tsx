import { Button } from "@/components/ui/button";
import { getLanguage, languageNames, languages, switchLanguage } from "@/i18n";
import { useEffect, useState } from "react";

export function LanguageSwitcher() {
    // defaults to english, will be updated on mount
    const [language, setLanguage] = useState('en');
    const [languagePath, setLanguagePath] = useState(`/icons/${language}.svg`);

    const updateLanguage = (lang: string): void => {
        console.log("[Syrup] Updated language", lang);
        setLanguage(lang);
        setLanguagePath(`/icons/${lang}.svg`);
    }

    const getLanguagePath = (lang?: string): string => {
        lang = lang || language;
        return `/icons/${lang}.svg`;
    };

    useEffect(() => {
        getLanguage.then((lang) => {
            console.log("useeffect", lang);
            setLanguage(lang);
            updateLanguage(lang);
        });
    })

    return (
        <div className="relative group">
            <div className="flex">
                <Button variant="ghost" size="icon">
                    <img
                        src={languagePath}
                        alt={language}
                        className="h-[1.2rem] aspect-auto"
                    />
                </Button>
                <div className="hidden group-hover:block absolute top-full right-0 z-10 pt-2">
                    <div className="border border-white/70 bg-accent rounded-lg max-h-[50vh] overflow-y-auto">
                        {languages.map((lang) => (
                            <div
                                key={lang}
                                className="flex flex-row items-center hover:bg-white/10 transition-colors px-3 py-2"
                                onClick={() => {
                                    switchLanguage(lang);
                                    updateLanguage(lang);
                                }}
                            >
                                <Button variant="ghost" size="icon">
                                    <img
                                        src={getLanguagePath(lang)}
                                        alt={lang}
                                        className="h-[1.2rem] w-[1.2rem] aspect-auto"
                                    />
                                </Button>
                                <p className="text-sm ml-2 cursor-pointer whitespace-nowrap">
                                    {languageNames[lang]}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LanguageSwitcher;
