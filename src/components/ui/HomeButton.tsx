import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { BoeingButton } from "./BoeingButton";

export const HomeButton = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <BoeingButton onClick={() => navigate("/attraction")}>
      {t("buttons.home")}
    </BoeingButton>
  );
}; 