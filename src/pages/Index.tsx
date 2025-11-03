import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Sparkles } from "lucide-react";
import { LeadForm } from "@/components/LeadForm";
import { StatsSection } from "@/components/StatsSection";
import { WorkingHours } from "@/components/WorkingHours";
import heroImage from "@/assets/hero-property.jpg";

const Index = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background with overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center gap-8 px-4 text-center max-w-5xl mx-auto">
        {/* Working Hours */}
        <WorkingHours />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 border border-accent/30 backdrop-blur-sm">
          <Sparkles className="h-4 w-4 text-accent" />
          <span className="text-sm font-medium text-accent">Эксклюзивное предложение</span>
        </div>

        {/* Main heading */}
        <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight">
          Каталог переуступок
          <br />
          <span className="text-accent">в жилом комплексе</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl">
          Эксклюзивный каталог с 500+ объектами переуступок. 
          Получите полный доступ прямо сейчас – совершенно бесплатно.
        </p>

        {/* CTA Button */}
        <Button
          variant="premium"
          size="xl"
          onClick={() => setIsFormOpen(true)}
          className="group"
        >
          <Download className="mr-2 h-5 w-5 group-hover:animate-pulse" />
          Скачать каталог бесплатно
        </Button>

        {/* Stats */}
        <StatsSection />

        {/* Trust message */}
        <p className="text-sm text-primary-foreground/70 max-w-md">
          Присоединяйтесь к 2000+ клиентам, которые уже нашли свой идеальный дом
        </p>
      </div>

      {/* Lead Form Dialog */}
      <LeadForm open={isFormOpen} onOpenChange={setIsFormOpen} />
    </div>
  );
};

export default Index;
