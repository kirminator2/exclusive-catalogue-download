import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, Shield, Award, Clock } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string()
    .min(2, { message: "Имя должно содержать минимум 2 символа" })
    .max(100, { message: "Имя слишком длинное" }),
  phone: z.string()
    .min(10, { message: "Введите корректный номер телефона" })
    .max(20, { message: "Номер телефона слишком длинный" })
    .regex(/^[\d\s\+\-\(\)]+$/, { message: "Некорректный формат телефона" }),
  email: z.string()
    .email({ message: "Введите корректный email" })
    .max(255, { message: "Email слишком длинный" }),
});

type FormData = z.infer<typeof formSchema>;

interface LeadFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LeadForm({ open, onOpenChange }: LeadFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    console.log("Lead data:", data);
    
    toast.success("Каталог успешно отправлен!", {
      description: "Проверьте вашу электронную почту",
    });
    
    setIsSubmitting(false);
    reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Получить каталог переуступок
          </DialogTitle>
          <DialogDescription className="text-center">
            Заполните форму и получите эксклюзивный каталог переуступок на вашу почту
          </DialogDescription>
        </DialogHeader>

        {/* Trust elements */}
        <div className="grid grid-cols-3 gap-2 py-4 border-y border-border">
          <div className="flex flex-col items-center gap-1 text-center">
            <Shield className="h-5 w-5 text-accent" />
            <span className="text-xs text-muted-foreground">Конфиденциально</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Award className="h-5 w-5 text-accent" />
            <span className="text-xs text-muted-foreground">Проверенные объекты</span>
          </div>
          <div className="flex flex-col items-center gap-1 text-center">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-xs text-muted-foreground">Мгновенная отправка</span>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Имя</Label>
            <Input
              id="name"
              placeholder="Ваше имя"
              {...register("name")}
              aria-invalid={errors.name ? "true" : "false"}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Телефон</Label>
            <Input
              id="phone"
              placeholder="+7 (999) 123-45-67"
              {...register("phone")}
              aria-invalid={errors.phone ? "true" : "false"}
            />
            {errors.phone && (
              <p className="text-sm text-destructive">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register("email")}
              aria-invalid={errors.email ? "true" : "false"}
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            variant="premium"
            size="lg"
            className="w-full"
            disabled={isSubmitting}
          >
            <Download className="mr-2 h-5 w-5" />
            {isSubmitting ? "Отправка..." : "Скачать каталог"}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Мы гарантируем конфиденциальность ваших данных и не передаем их третьим лицам
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
