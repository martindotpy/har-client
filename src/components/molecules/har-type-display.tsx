import type { HarType } from "@/api";
import DecryptedText from "@/components/ui/decrypted-text";
import { cn } from "@/lib/tailwind-class";
import { useHarPredictionStore } from "@/store/har-prediction-store";

const types: Record<HarType, string> = {
  walking: "Caminando",
  running: "Corriendo",
  shuffling: "Deslizándose",
  stairs_up: "Subiendo escaleras",
  stairs_down: "Bajando escaleras",
  standing: "De pie",
  sitting: "Sentado",
  lying: "Acostado",
  cycling_sit: "Ciclismo (sentado)",
  cycling_stand: "Ciclismo (de pie)",
  cycling_sit_inactive: "Ciclismo (sentado, inactivo)",
};

export default function HarTypeDisplay() {
  // Prediction
  const harType = useHarPredictionStore((state) => state.prediction);

  // Styles
  const textClassname = cn("text-4xl font-bold", "md:text-7xl");

  return (
    <div className={cn("flex justify-center py-4", "md:py-12")}>
      <DecryptedText
        text={harType ? types[harType] : "Descúbrelo..."}
        className={textClassname}
        encryptedClassName={cn(textClassname, "text-primary")}
        animateOn="view"
      />
    </div>
  );
}
