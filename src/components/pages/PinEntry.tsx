import { InputOtp } from "@heroui/input-otp";
import { Card, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ApiService } from "../../services/ApiService";
import logo from "../../assets/images/boeing_black.png"
import backgroundSrc from "../../assets/images/background.webp"
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
      <div className="flex flex-col gap-4 items-center">
        <p className="text-white text-25 font-[400]">
          {t('pin.title')}
        </p>
        <InputOtp
          containerClassName="flex justify-center items-center bg-white rounded-full bg-opacity-40 w-[434px] h-[105px]"
          autoFocus
          value={pin}
          onChange={handlePinChange}
          onComplete={handleSubmit}
          length={4}
          errorMessage={
            (_) => {
              return <p className=""></p>
            }
          }
          classNames={{
            segmentWrapper: "text-white",
            caret: "bg-white",
            segment: "font-bold opacity-100 bg-transparent border-none shadow-none data-[active=true]:bg-transparent data-[focus-visible=true]:outline-transparent text-40i",
            input: "h-auto",
            errorMessage: "text-25"
          }}
        />
      </div>
      {error && (
        <p className="text-white text-25 text-center mt-[2.18rem]">{error}</p>
      )}
    </div>
  );
}; 