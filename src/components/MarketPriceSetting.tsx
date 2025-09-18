import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  Target,
  TrendingUp
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MarketPriceSettingProps {
  language: "en" | "ml";
}

interface FarmerPrice {
  id: string;
  crop: string;
  targetPrice: number;
  currentPrice: number;
  quality: string;
  quantity: number;
  alertEnabled: boolean;
}

const MarketPriceSetting = ({ language }: MarketPriceSettingProps) => {
  const { toast } = useToast();
  const [farmerPrices, setFarmerPrices] = useState<FarmerPrice[]>([
    {
      id: "1",
      crop: "Rice (Ponni)",
      targetPrice: 50,
      currentPrice: 45,
      quality: "Premium",
      quantity: 100,
      alertEnabled: true
    },
    {
      id: "2", 
      crop: "Black Pepper",
      targetPrice: 900,
      currentPrice: 850,
      quality: "Export",
      quantity: 50,
      alertEnabled: true
    }
  ]);

  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState({
    crop: "",
    targetPrice: "",
    quality: "",
    quantity: ""
  });

  const texts = {
    en: {
      title: "Market Price Settings",
      subtitle: "Set target prices for your crops and get alerts",
      addNewPrice: "Add New Price Target",
      crop: "Crop",
      targetPrice: "Target Price (₹/kg)",
      currentPrice: "Current Market Price",
      quality: "Quality",
      quantity: "Quantity (kg)",
      alertStatus: "Price Alerts",
      save: "Save",
      edit: "Edit",
      delete: "Delete",
      add: "Add",
      cancel: "Cancel",
      enabled: "Enabled",
      disabled: "Disabled",
      aboveTarget: "Above Target",
      belowTarget: "Below Target",
      selectCrop: "Select Crop",
      selectQuality: "Select Quality"
    },
    ml: {
      title: "മാർക്കറ്റ് വില ക്രമീകരണങ്ങൾ",
      subtitle: "നിങ്ങളുടെ വിളകൾക്കായി ലക്ഷ്യ വിലകൾ സെറ്റ് ചെയ്ത് അലേർട്ടുകൾ നേടുക",
      addNewPrice: "പുതിയ വില ലക്ഷ്യം ചേർക്കുക",
      crop: "വിള",
      targetPrice: "ലക്ഷ്യ വില (₹/കി.ഗ്രാം)",
      currentPrice: "നിലവിലെ മാർക്കറ്റ് വില",
      quality: "ഗുണനിലവാരം",
      quantity: "അളവ് (കി.ഗ്രാം)",
      alertStatus: "വില അലേർട്ടുകൾ",
      save: "സേവ് ചെയ്യുക",
      edit: "എഡിറ്റ് ചെയ്യുക",
      delete: "ഡിലീറ്റ് ചെയ്യുക",
      add: "ചേർക്കുക",
      cancel: "റദ്ദാക്കുക",
      enabled: "പ്രാപ്തമാക്കി",
      disabled: "പ്രാപ്തമാക്കിയില്ല",
      aboveTarget: "ലക്ഷ്യത്തിന് മുകളിൽ",
      belowTarget: "ലക്ഷ്യത്തിന് താഴെ",
      selectCrop: "വിള തിരഞ്ഞെടുക്കുക",
      selectQuality: "ഗുണനിലവാരം തിരഞ്ഞെടുക്കുക"
    }
  };

  const t = texts[language];

  const crops = [
    "Rice (Ponni)", "Black Pepper", "Cardamom", "Coconut", 
    "Ginger", "Turmeric", "Rubber", "Banana"
  ];

  const qualities = ["Premium", "Grade A", "Standard", "Export Quality", "Organic"];

  const handleEdit = (id: string) => {
    setIsEditing(id);
  };

  const handleSave = (id: string) => {
    setIsEditing(null);
    toast({
      title: language === "en" ? "Price Updated" : "വില അപ്ഡേറ്റ് ചെയ്തു",
      description: language === "en" ? "Target price has been updated successfully" : "ലക്ഷ്യ വില വിജയകരമായി അപ്ഡേറ്റ് ചെയ്തു"
    });
  };

  const handleDelete = (id: string) => {
    setFarmerPrices(prev => prev.filter(price => price.id !== id));
    toast({
      title: language === "en" ? "Price Deleted" : "വില ഡിലീറ്റ് ചെയ്തു",
      description: language === "en" ? "Price target has been removed" : "വില ലക്ഷ്യം നീക്കം ചെയ്തു"
    });
  };

  const handleAddNew = () => {
    if (!newPrice.crop || !newPrice.targetPrice) {
      toast({
        title: language === "en" ? "Missing Information" : "വിവരങ്ങൾ നഷ്ടമായി",
        description: language === "en" ? "Please fill in all required fields" : "ദയവായി എല്ലാ ആവശ്യമായ ഫീൽഡുകളും പൂരിപ്പിക്കുക",
        variant: "destructive"
      });
      return;
    }

    const newPriceEntry: FarmerPrice = {
      id: Date.now().toString(),
      crop: newPrice.crop,
      targetPrice: parseFloat(newPrice.targetPrice),
      currentPrice: Math.floor(parseFloat(newPrice.targetPrice) * 0.9), // Mock current price
      quality: newPrice.quality || "Standard",
      quantity: parseFloat(newPrice.quantity) || 0,
      alertEnabled: true
    };

    setFarmerPrices(prev => [...prev, newPriceEntry]);
    setNewPrice({ crop: "", targetPrice: "", quality: "", quantity: "" });
    
    toast({
      title: language === "en" ? "Price Added" : "വില ചേർത്തു",
      description: language === "en" ? "New price target has been set" : "പുതിയ വില ലക്ഷ്യം സജ്ജമാക്കി"
    });
  };

  const updatePrice = (id: string, field: keyof FarmerPrice, value: any) => {
    setFarmerPrices(prev => prev.map(price => 
      price.id === id ? { ...price, [field]: value } : price
    ));
  };

  const getPriceStatus = (current: number, target: number) => {
    if (current >= target) {
      return {
        status: t.aboveTarget,
        color: "bg-success/10 text-success border-success/30",
        icon: TrendingUp
      };
    } else {
      return {
        status: t.belowTarget,
        color: "bg-warning/10 text-warning border-warning/30", 
        icon: Target
      };
    }
  };

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

      {/* Add New Price */}
      <Card className="shadow-farm border-l-4 border-l-primary">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-primary" />
            {t.addNewPrice}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>{t.crop}</Label>
              <Select value={newPrice.crop} onValueChange={(value) => setNewPrice(prev => ({ ...prev, crop: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectCrop} />
                </SelectTrigger>
                <SelectContent>
                  {crops.map((crop) => (
                    <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.targetPrice}</Label>
              <Input
                type="number"
                placeholder="0"
                value={newPrice.targetPrice}
                onChange={(e) => setNewPrice(prev => ({ ...prev, targetPrice: e.target.value }))}
              />
            </div>
            <div className="space-y-2">
              <Label>{t.quality}</Label>
              <Select value={newPrice.quality} onValueChange={(value) => setNewPrice(prev => ({ ...prev, quality: value }))}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectQuality} />
                </SelectTrigger>
                <SelectContent>
                  {qualities.map((quality) => (
                    <SelectItem key={quality} value={quality}>{quality}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2 flex flex-col justify-end">
              <Button onClick={handleAddNew} className="w-full">
                <Plus className="h-4 w-4 mr-1" />
                {t.add}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Current Price Settings */}
      <div className="space-y-4">
        {farmerPrices.map((priceEntry) => {
          const { status, color, icon: StatusIcon } = getPriceStatus(priceEntry.currentPrice, priceEntry.targetPrice);
          
          return (
            <Card key={priceEntry.id} className="shadow-farm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">{priceEntry.crop}</h3>
                    <p className="text-sm text-muted-foreground">{priceEntry.quality}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status}
                    </Badge>
                    <div className="flex gap-1">
                      <Button variant="outline" size="sm" onClick={() => handleEdit(priceEntry.id)}>
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDelete(priceEntry.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <Label className="text-xs">{t.targetPrice}</Label>
                    {isEditing === priceEntry.id ? (
                      <Input
                        type="number"
                        value={priceEntry.targetPrice}
                        onChange={(e) => updatePrice(priceEntry.id, 'targetPrice', parseFloat(e.target.value))}
                        className="h-8"
                      />
                    ) : (
                      <p className="font-bold text-lg">₹{priceEntry.targetPrice}</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">{t.currentPrice}</Label>
                    <p className="font-semibold">₹{priceEntry.currentPrice}</p>
                  </div>
                  <div>
                    <Label className="text-xs">{t.quantity}</Label>
                    {isEditing === priceEntry.id ? (
                      <Input
                        type="number"
                        value={priceEntry.quantity}
                        onChange={(e) => updatePrice(priceEntry.id, 'quantity', parseFloat(e.target.value))}
                        className="h-8"
                      />
                    ) : (
                      <p className="font-semibold">{priceEntry.quantity} kg</p>
                    )}
                  </div>
                  <div>
                    <Label className="text-xs">{t.alertStatus}</Label>
                    <Badge variant={priceEntry.alertEnabled ? "default" : "secondary"}>
                      {priceEntry.alertEnabled ? t.enabled : t.disabled}
                    </Badge>
                  </div>
                </div>

                {isEditing === priceEntry.id && (
                  <div className="mt-4 flex gap-2">
                    <Button size="sm" onClick={() => handleSave(priceEntry.id)}>
                      <Save className="h-3 w-3 mr-1" />
                      {t.save}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(null)}>
                      {t.cancel}
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default MarketPriceSetting;