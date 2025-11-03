import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

export function WorkingHours() {
  const [timeUntilOpen, setTimeUntilOpen] = useState<string>("");
  const [isWorkingHours, setIsWorkingHours] = useState(true);

  useEffect(() => {
    const checkWorkingHours = () => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      
      // Working hours: 9:00 - 21:00
      const workStart = 9;
      const workEnd = 21;
      
      const isWorking = hours >= workStart && hours < workEnd;
      setIsWorkingHours(isWorking);

      if (!isWorking) {
        // Calculate time until 9:00 tomorrow or today
        const tomorrow = new Date(now);
        if (hours >= workEnd) {
          tomorrow.setDate(tomorrow.getDate() + 1);
        }
        tomorrow.setHours(workStart, 0, 0, 0);
        
        const diff = tomorrow.getTime() - now.getTime();
        const hoursLeft = Math.floor(diff / (1000 * 60 * 60));
        const minutesLeft = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        setTimeUntilOpen(`${hoursLeft}ч ${minutesLeft}мин`);
      }
    };

    checkWorkingHours();
    const interval = setInterval(checkWorkingHours, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 border border-primary-foreground/20 backdrop-blur-sm">
      <Clock className="h-4 w-4 text-primary-foreground" />
      {isWorkingHours ? (
        <span className="text-sm font-medium text-primary-foreground">
          Время работы: 9:00 - 21:00
        </span>
      ) : (
        <span className="text-sm font-medium text-primary-foreground">
          Ответим через {timeUntilOpen}
        </span>
      )}
    </div>
  );
}
