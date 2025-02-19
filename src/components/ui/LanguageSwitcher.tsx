import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/button';

export const LanguageSwitcher = () => {
    const { i18n } = useTranslation();

    const toggleLanguage = () => {
        const newLang = i18n.language === 'en' ? 'jp' : 'en';
        i18n.changeLanguage(newLang);
    };

    return (
        <Button
            size="sm"
            variant="solid"
            color="primary"
            onPress={toggleLanguage}
            className=" text-white"
        >
            {i18n.language === 'en' ? '日本語' : 'English'}
        </Button>
    );
}; 