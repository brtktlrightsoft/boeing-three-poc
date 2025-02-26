import { useNavigate } from "react-router-dom";
import { BoeingButton } from "../ui/BoeingButton";
import { BoeingLogo } from "../ui/BoeingLogo";
import { activationStorage } from "../../config/storage";

export const MenuPage = ({ onClose }: { onClose: () => void }) => {
    const navigate = useNavigate();

    const handleResetActivation = () => {
        navigate('/attraction', { replace: true });
    };

    const handleClearCache = () => {
        activationStorage.clear();
        localStorage.removeItem("pin");
        navigate("/pin-entry", { replace: true });
    };

    const handleBack = () => {
        onClose();
    };

    return (
        <div className="fixed top-0 right-0 z-[1000] w-screen h-screen" style={{ background: 'url("/images/background.webp")' }}>
            <div className="min-h-screen w-screen relative flex flex-col items-center justify-center">
                <BoeingLogo />
                <div className="flex flex-col items-center gap-4">
                    <div className="text-left w-full text-white text-18">
                        VERSION 1.0
                    </div>
                    <BoeingButton onClick={handleResetActivation}>
                        RESET ACTIVATION
                    </BoeingButton>

                    <BoeingButton onClick={handleClearCache}>
                        CLEAR CACHE
                    </BoeingButton>

                    <div className="mt-16">
                        <BoeingButton
                            onClick={handleBack}
                            className="bg-white text-[#001D6E] hover:bg-white/90 active:bg-white/80 border-white"
                        >
                            BACK
                        </BoeingButton>
                    </div>
                </div>
            </div>
        </div>

    );
}; 