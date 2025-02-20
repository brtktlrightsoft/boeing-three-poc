import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@heroui/button';
import { Card, CardBody } from '@heroui/card';
import { activationStorage } from '../../config/storage';
import { ActivationData } from '../../types/activation-data';
import logo from "../../assets/images/boeing_black.png";

export const SelectLanguagePage = () => {
  const [languages, setLanguages] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadLanguages = async () => {
      const pin = localStorage.getItem('pin');
      if (!pin) {
        navigate('/', { replace: true });
        return;
      }

      try {
        const data = await activationStorage.getItem<ActivationData>(pin);
        if (data?.languages) {
          setLanguages(data.languages);
        } else {
          navigate('/', { replace: true });
        }
      } catch (error) {
        console.error('Error loading languages:', error);
        navigate('/', { replace: true });
      } finally {
        setIsLoading(false);
      }
    };

    loadLanguages();
  }, [navigate]);

  const handleLanguageSelect = (langCode: string) => {
    i18n.changeLanguage(langCode);
    navigate('/view-product');
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
      <Card>
        <CardBody>
          <div className="flex flex-col items-center gap-8">
            <img src={logo} alt="logo" className="w-[25rem] h-auto" />
            <div className="text-2xl font-bold text-center text-black">
              {t('selectLanguage.title')}
            </div>
            <div className="flex flex-col gap-4 w-full max-w-xs">
              {Object.entries(languages).map(([code, name]) => (
                <Button
                  key={code}
                  variant="solid"
                  color="primary"
                  size="lg"
                  onPress={() => handleLanguageSelect(code)}
                  className="w-full text-lg"
                >
                  {name}
                </Button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}; 