import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { 
  Bug, 
  CloudRain, 
  Calendar, 
  AlertTriangle,
  Leaf,
  Shield,
  ArrowRight,
  ThermometerSun
} from "lucide-react";
import { TabType } from "@/components/TabNavigation";

interface IPMPestCareProps {
  language: "en" | "ml";
  onTabChange?: (tab: TabType) => void;
}

const IPMPestCare = ({ language, onTabChange }: IPMPestCareProps) => {
  const [selectedPest, setSelectedPest] = useState<string | null>(null);

  const texts = {
    en: {
      title: "IPM Pest Care System",
      subtitle: "Integrated Pest Management with Weather Intelligence",
      weatherForecast: "7-Day Weather Forecast",
      pestControl: "Go to Pest Control",
      pestPrediction: "Weather-Based Pest Prediction",
      weeklySchedule: "Weekly Spray Schedule",
      activePests: "Active Pest Alerts",
      viewDetails: "View Treatment Details",
    },
    ml: {
      title: "IPM കീട പരിചരണ സംവിധാനം", 
      subtitle: "കാലാവസ്ഥാ ബുദ്ധിയുള്ള സമഗ്ര കീട നിയന്ത്രണം",
      weatherForecast: "7 ദിവസത്തെ കാലാവസ്ഥ പ്രവചനം",
      pestControl: "കീട നിയന്ത്രണത്തിലേക്ക് പോകുക",
      pestPrediction: "കാലാവസ്ഥാ അടിസ്ഥാനമാക്കിയുള്ള കീട പ്രവചനം",
      weeklySchedule: "പ്രതിവാര സ്പ്രേ ഷെഡ്യൂൾ",
      activePests: "സജീവ കീട അലേർട്ടുകൾ",
      viewDetails: "ചികിത്സ വിശദാംശങ്ങൾ കാണുക",
    }
  };

  const t = texts[language];

  // Generate random pest data based on weather
  const generateWeatherBasedPests = () => {
    const pests = [
      "Brown Plant Hopper", "Stem Borer", "Leaf Folder", "Rice Bug", 
      "White Fly", "Thrips", "Aphids", "Bollworm"
    ];
    const conditions = ["High Humidity", "Warm Temperature", "Post Rain", "Dry Conditions"];
    
    return Array.from({ length: 3 }, (_, i) => ({
      id: i,
      name: pests[Math.floor(Math.random() * pests.length)],
      severity: ["high", "medium", "low"][Math.floor(Math.random() * 3)] as "high" | "medium" | "low",
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      crops: ["Rice", "Coconut", "Pepper"][Math.floor(Math.random() * 3)],
      probability: Math.floor(Math.random() * 40) + 60 // 60-100%
    }));
  };

  const weeklyWeather = [
    { day: "Mon", temp: "32°C", condition: "Sunny", rain: 10 },
    { day: "Tue", temp: "30°C", condition: "Cloudy", rain: 40 },
    { day: "Wed", temp: "28°C", condition: "Rainy", rain: 80 },
    { day: "Thu", temp: "29°C", condition: "Cloudy", rain: 60 },
    { day: "Fri", temp: "31°C", condition: "Sunny", rain: 20 },
    { day: "Sat", temp: "32°C", condition: "Sunny", rain: 15 },
    { day: "Sun", temp: "33°C", condition: "Hot", rain: 5 },
  ];

  const spraySchedule = [
    { day: "Monday", activity: "Neem spray for prevention", suitable: true },
    { day: "Tuesday", activity: "Avoid spraying - cloudy conditions", suitable: false },
    { day: "Wednesday", activity: "No spray - rainy day", suitable: false },
    { day: "Thursday", activity: "Post-rain inspection", suitable: false },
    { day: "Friday", activity: "Bio-pesticide application", suitable: true },
    { day: "Saturday", activity: "Organic spray ideal", suitable: true },
    { day: "Sunday", activity: "Rest day - monitor only", suitable: false },
  ];

  const activePests = generateWeatherBasedPests();

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
          {t.title}
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
      </div>

      {/* Weather Forecast Integration */}
      <Card className="shadow-farm border-l-4 border-l-monsoon">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CloudRain className="h-5 w-5 text-monsoon" />
              {t.weatherForecast}
            </CardTitle>
            <Button variant="weather" onClick={() => onTabChange?.("weather")}>
              View Full Forecast <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-2">
            {weeklyWeather.map((day, index) => (
              <div key={index} className="text-center p-2 rounded-lg bg-muted/30">
                <p className="font-medium text-xs">{day.day}</p>
                <ThermometerSun className="h-4 w-4 mx-auto my-1 text-warning" />
                <p className="text-xs font-bold">{day.temp}</p>
                <p className="text-xs text-muted-foreground">{day.rain}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather-Based Pest Prediction */}
        <Card className="shadow-farm border-l-4 border-l-warning">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bug className="h-5 w-5 text-warning" />
              {t.pestPrediction}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {activePests.map((pest) => (
              <div 
                key={pest.id} 
                className="p-3 border rounded-lg cursor-pointer hover:bg-muted/50 transition-smooth"
                onClick={() => setSelectedPest(pest.name)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">{pest.name}</h4>
                  <Badge 
                    variant="outline" 
                    className={
                      pest.severity === 'high' 
                        ? 'bg-destructive/10 text-destructive border-destructive/30'
                        : pest.severity === 'medium'
                        ? 'bg-warning/10 text-warning border-warning/30'
                        : 'bg-success/10 text-success border-success/30'
                    }
                  >
                    {pest.probability}%
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  Condition: {pest.condition} • Affects: {pest.crops}
                </p>
              </div>
            ))}
            <Button variant="destructive" className="w-full" onClick={() => onTabChange?.("alerts")}>
              {t.pestControl} <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </CardContent>
        </Card>

        {/* Weekly Spray Schedule */}
        <Card className="shadow-farm border-l-4 border-l-success">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-success" />
              {t.weeklySchedule}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {spraySchedule.map((schedule, index) => (
              <div 
                key={index} 
                className={`flex items-center gap-3 p-2 rounded-lg ${
                  schedule.suitable ? 'bg-success/10 border border-success/20' : 'bg-muted/30'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${
                  schedule.suitable ? 'bg-success' : 'bg-muted-foreground'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium">{schedule.day}</p>
                  <p className="text-xs text-muted-foreground">{schedule.activity}</p>
                </div>
                {schedule.suitable ? (
                  <Shield className="h-4 w-4 text-success" />
                ) : (
                  <AlertTriangle className="h-4 w-4 text-warning" />
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default IPMPestCare;