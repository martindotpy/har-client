import { harApi, schemas, type HarRequest } from "@/api";
import HarTypeDisplay from "@/components/molecules/har-type-display";
import { sectionClasses as sectionClassname } from "@/components/organisms/styles/section-styles";
import { Button } from "@/components/ui/button";
import ButtonLoader from "@/components/ui/button-loader";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { NumberInput } from "@/components/ui/input-number";
import { cn } from "@/lib/tailwind-class";
import { useHarPredictionStore } from "@/store/har-prediction-store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type UseFormReturn } from "react-hook-form";

interface HarNumberFormFieldProps {
  form: UseFormReturn<HarRequest>;
  name: keyof HarRequest;
  label: string;
  description: string;
}

function HarNumberFormField({
  form,
  name,
  label,
  description,
}: HarNumberFormFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <NumberInput
              placeholder={form.formState.defaultValues?.[name]?.toString()}
              min={schemas.HarRequest.shape[name].minValue!}
              max={schemas.HarRequest.shape[name].maxValue!}
              defaultValue={form.formState.defaultValues?.[name]}
              value={field.value}
              onValueChange={(value) => field.onChange(value)}
            />
          </FormControl>
          {!fieldState.error && (
            <FormDescription>{description}</FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default function NotebookFormSectionContent() {
  // Har prediction
  const setPrediction = useHarPredictionStore((state) => state.setPrediction);

  // Form
  const form = useForm<HarRequest>({
    resolver: zodResolver(schemas.HarRequest),
    defaultValues: {
      back_x: 0,
      back_y: 0,
      back_z: 0,
      thigh_x: 0,
      thigh_y: 0,
      thigh_z: 0,
    },
  });

  // Form submit handler
  async function onSubmit(data: HarRequest) {
    try {
      const response = await harApi.postPredictHar(data);

      setPrediction(response.type);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  }

  return (
    <section className={cn(sectionClassname, "pt-4", "md:pt-8")}>
      <h1 className="text-center text-3xl font-bold">
        ¡Reconoce tu actividad humana!
      </h1>

      <HarTypeDisplay />

      <Form {...form}>
        <form
          className={cn(
            "mt-4 grid gap-2 select-none",
            "md:mt-6 md:grid-cols-2 md:gap-3",
            "lg:mt-8 lg:grid-cols-3 lg:gap-4",
          )}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <HarNumberFormField
            form={form}
            name="back_x"
            label="Back X"
            description="Introduce el valor de la aceleración en el eje X de la espalda."
          />
          <HarNumberFormField
            form={form}
            name="back_y"
            label="Back Y"
            description="Introduce el valor de la aceleración en el eje Y de la espalda."
          />
          <HarNumberFormField
            form={form}
            name="back_z"
            label="Back Z"
            description="Introduce el valor de la aceleración en el eje Z de la espalda."
          />
          <HarNumberFormField
            form={form}
            name="thigh_x"
            label="Thigh X"
            description="Introduce el valor de la aceleración en el eje X del muslo."
          />
          <HarNumberFormField
            form={form}
            name="thigh_y"
            label="Thigh Y"
            description="Introduce el valor de la aceleración en el eje Y del muslo."
          />
          <HarNumberFormField
            form={form}
            name="thigh_z"
            label="Thigh Z"
            description="Introduce el valor de la aceleración en el eje Z del muslo."
          />

          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className={cn(
              "group/button mt-4",
              "md:col-span-2",
              "lg:col-span-3",
            )}
          >
            <ButtonLoader />
            Predecir actividad humana
          </Button>
        </form>
      </Form>
    </section>
  );
}
