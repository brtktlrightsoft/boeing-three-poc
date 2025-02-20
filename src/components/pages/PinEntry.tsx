import { InputOtp } from "@heroui/input-otp";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ApiService } from "../../services/ApiService";
import logo from "../../assets/images/boeing_black.png"

interface PinEntryProps {
  onComplete?: (pin: string) => void;
}

export const PinEntry = ({ onComplete }: PinEntryProps) => {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handlePinChange = (e: React.FormEvent<HTMLDivElement>) => {
    const value = (e.target as HTMLInputElement).value;
    setPin(value);
    setError("");
  };

  const handleSubmit = async () => {
    if (pin.length !== 4) return;

    setIsLoading(true);
    setError("");

    try {
      const response = await ApiService.fetchActivationData(pin);

      if (response.error) {
        setError(t('pin.error.invalid'));
        return;
      }

      localStorage.setItem("pin", pin);
      onComplete?.(pin);
      navigate("/asset-downloader", { 
        state: response.data,
        replace: true 
      });
    } catch (err) {
      setError(t('pin.error.generic'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1000]">
      <Card>
        <CardBody>
          <div className="flex flex-col gap-4 items-center">
            <img src={logo} alt="logo" className="w-[25rem] h-auto" />
            <p className="text-black text-lg font-bold">
              {t('pin.title')}
            </p>
            <div className="flex gap-2">
              <InputOtp
                value={pin}
                onChange={handlePinChange}
                length={4}
                className=""
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}
            <Button
              variant="solid"
              color="primary"
              size="sm"
              disabled={pin.length !== 4 || isLoading}
              isLoading={isLoading}
              onPress={handleSubmit}
              className="w-64 mt-2"
            >
              {t('pin.submit')}
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}; 