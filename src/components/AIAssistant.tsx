import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/enhanced-button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Bot, 
  Send, 
  Leaf, 
  Bug, 
  CloudRain, 
  TrendingUp,
  Lightbulb,
  MessageSquare
} from "lucide-react";

interface AIAssistantProps {
  language: "en" | "ml";
}

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const AIAssistant = ({ language }: AIAssistantProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const texts = {
    en: {
      title: "AI Farming Assistant",
      subtitle: "Get expert advice for your farming needs",
      placeholder: "Ask me anything about farming...",
      send: "Send",
      typing: "AI is typing...",
      quickQuestions: "Quick Questions",
      quickQuestionList: [
        "Best time to plant rice in Kerala?",
        "How to control pest in coconut trees?",
        "Weather suitable for spraying?",
        "Market price trends for spices?",
        "Organic fertilizer recommendations?"
      ],
      welcomeMessage: "Hello! I'm your AI farming assistant. I can help you with crop management, pest control, weather advice, and market insights for Kerala agriculture. What would you like to know?"
    },
    ml: {
      title: "AI കൃഷി സഹായി",
      subtitle: "നിങ്ങളുടെ കൃഷി ആവശ്യങ്ങൾക്ക് വിദഗ്ധ ഉപദേശം നേടുക",
      placeholder: "കൃഷിയെക്കുറിച്ച് എന്തും ചോദിക്കുക...",
      send: "അയയ്ക്കുക",
      typing: "AI ടൈപ്പ് ചെയ്യുന്നു...",
      quickQuestions: "പെട്ടെന്നുള്ള ചോദ്യങ്ങൾ",
      quickQuestionList: [
        "കേരളത്തിൽ നെല്ല് നടാനുള്ള മികച്ച സമയം?",
        "തെങ്ങിനത്തൈകളിൽ കീടനിയന്ത്രണം എങ്ങനെ?",
        "സ്പ്രേയിംഗിന് അനുയോജ്യമായ കാലാവസ്ഥ?",
        "സുഗന്ധവ്യഞ്ജനങ്ങളുടെ വിപണി വില ട്രെൻഡുകൾ?",
        "ജൈവ വളം ശുപാർശകൾ?"
      ],
      welcomeMessage: "നമസ്കാരം! ഞാൻ നിങ്ങളുടെ AI കൃഷി സഹായിയാണ്. കേരള കൃഷിക്കായി വിള പരിപാലനം, കീട നിയന്ത്രണം, കാലാവസ്ഥാ ഉപദേശം, വിപണി സൂചനകൾ എന്നിവയിൽ ഞാൻ സഹായിക്കാം. നിങ്ങൾക്ക് എന്താണ് അറിയേണ്ടത്?"
    }
  };

  const t = texts[language];

  // Initialize with welcome message
  useState(() => {
    if (messages.length === 0) {
      setMessages([{
        id: "welcome",
        type: "assistant",
        content: t.welcomeMessage,
        timestamp: new Date()
      }]);
    }
  });

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, language);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (question: string, lang: "en" | "ml"): string => {
    const responses = {
      en: {
        rice: "For rice cultivation in Kerala: Best planting time is May-June for Kharif season. Use high-yielding varieties like Jyothi, Asha. Ensure proper water management and apply organic matter. Monitor for pests like brown planthopper.",
        pest: "For pest control: Use integrated pest management (IPM). Regular monitoring, beneficial insects, neem-based pesticides, and proper field sanitation. Avoid excessive chemical use.",
        weather: "Current weather is suitable for most farming activities. Check humidity levels before spraying - ideal is below 70%. Avoid spraying during windy conditions or expected rainfall.",
        market: "Spice prices show upward trend. Black pepper: ₹650-700/kg, Cardamom: ₹1200-1400/kg. Consider value addition and direct marketing for better prices.",
        fertilizer: "Organic recommendations: Compost, vermicompost, green manure crops like cowpea. Bio-fertilizers like Rhizobium for legumes, PSB for phosphorus availability.",
        default: "Thank you for your question. For specific farming issues in Kerala, I recommend: 1) Regular soil testing, 2) Following integrated farming systems, 3) Using climate-resilient varieties, 4) Implementing water conservation methods. Could you provide more details about your specific crop or issue?"
      },
      ml: {
        rice: "കേരളത്തിലെ നെൽകൃഷിക്ക്: ഖരീഫ് സീസണിൽ മെയ്-ജൂൺ മാസങ്ങളാണ് മികച്ച നടീൽ സമയം. ജ്യോതി, ആശ പോലുള്ള ഉയർന്ന വിളവുള്ള ഇനങ്ങൾ ഉപയോഗിക്കുക. ശരിയായ ജല പരിപാലനവും ജൈവവസ്തുക്കളുടെ പ്രയോഗവും ഉറപ്പാക്കുക.",
        pest: "കീടനിയന്ത്രണത്തിന്: സമഗ്ര കീടനിയന്ത്രണം (IPM) ഉപയോഗിക്കുക. പതിവ് നിരീക്ഷണം, ഉപകാര പ്രാണികൾ, വേപ്പ് അടിസ്ഥാനമാക്കിയുള്ള കീടനാശിനികൾ, ശരിയായ വയൽ ശുചിത്വം.",
        weather: "നിലവിലെ കാലാവസ്ഥ മിക്ക കൃഷി പ്രവർത്തനങ്ങൾക്കും അനുയോജ്യമാണ്. സ്പ്രേയിംഗിന് മുമ്പ് ആർദ്രത പരിശോധിക്കുക - 70% ൽ താഴെയായിരിക്കണം.",
        market: "സുഗന്ധവ്യഞ്ജന വിലകൾ വർധന പ്രവണത കാണിക്കുന്നു. കുരുമുളക്: ₹650-700/കി.ഗ്രാം, ഏലം: ₹1200-1400/കി.ഗ്രാം. മികച്ച വിലയ്ക്ക് മൂല്യവർധനവും നേരിട്ടുള്ള വിപണനവും പരിഗണിക്കുക.",
        fertilizer: "ജൈവ ശുപാർശകൾ: കമ്പോസ്റ്റ്, വേം കമ്പോസ്റ്റ്, പച്ചളവ് വിളകൾ. ബയോ-വളങ്ങൾ ഉപയോഗിക്കുക.",
        default: "നിങ്ങളുടെ ചോദ്യത്തിന് നന്ദി. കേരളത്തിലെ പ്രത്യേക കൃഷി പ്രശ്നങ്ങൾക്ക് ഞാൻ ശുപാർശ ചെയ്യുന്നു: 1) പതിവ് മണ്ണ് പരിശോധന, 2) സമഗ്ര കൃഷി സമ്പ്രദായങ്ങൾ, 3) കാലാവസ്ഥ പ്രതിരോധശേഷിയുള്ള ഇനങ്ങൾ. കൂടുതൽ വിശദാംശങ്ങൾ നൽകാമോ?"
      }
    };

    const q = question.toLowerCase();
    
    if (q.includes('rice') || q.includes('നെല്')) return responses[lang].rice;
    if (q.includes('pest') || q.includes('കീട')) return responses[lang].pest;
    if (q.includes('weather') || q.includes('കാലാവസ്ഥ')) return responses[lang].weather;
    if (q.includes('market') || q.includes('price') || q.includes('വിപണി') || q.includes('വില')) return responses[lang].market;
    if (q.includes('fertilizer') || q.includes('organic') || q.includes('വളം') || q.includes('ജൈവ')) return responses[lang].fertilizer;
    
    return responses[lang].default;
  };

  const handleQuickQuestion = (question: string) => {
    setInputMessage(question);
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Questions */}
        <Card className="shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-warning" />
              {t.quickQuestions}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {t.quickQuestionList.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="w-full text-left justify-start text-xs h-auto p-3"
                onClick={() => handleQuickQuestion(question)}
              >
                <MessageSquare className="h-3 w-3 mr-2 flex-shrink-0" />
                <span className="truncate">{question}</span>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-2 shadow-farm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary" />
              AI Chat
            </CardTitle>
            <CardDescription>
              {language === "en" ? "Chat with our AI farming expert" : "ഞങ്ങളുടെ AI കൃഷി വിദഗ്ധനുമായി ചാറ്റ് ചെയ്യുക"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Messages */}
            <ScrollArea className="h-96 border rounded-lg p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.type === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-lg p-3">
                      <div className="flex items-center gap-2">
                        <div className="animate-pulse">
                          <Bot className="h-4 w-4 text-primary" />
                        </div>
                        <span className="text-sm text-muted-foreground">{t.typing}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder={t.placeholder}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!inputMessage.trim() || isTyping}>
                <Send className="h-4 w-4" />
                {t.send}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AIAssistant;