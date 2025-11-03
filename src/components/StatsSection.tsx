import { Building2, Users, Award } from "lucide-react";

export function StatsSection() {
  const stats = [
    {
      icon: Building2,
      value: "500+",
      label: "Объектов премиум-класса",
    },
    {
      icon: Users,
      value: "2000+",
      label: "Довольных клиентов",
    },
    {
      icon: Award,
      value: "15 лет",
      label: "Опыта на рынке",
    },
  ];

  return (
    <div className="grid grid-cols-3 gap-4 w-full max-w-3xl">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50 transition-all hover:scale-105 hover:shadow-[var(--shadow-glow)]"
          >
            <Icon className="h-8 w-8 text-accent" />
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <div className="text-xs text-center text-muted-foreground">{stat.label}</div>
          </div>
        );
      })}
    </div>
  );
}
