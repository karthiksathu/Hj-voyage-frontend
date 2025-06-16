
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Language, useLanguage, getLanguageName } from "./LanguageProvider";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  const languages: Language[] = ["en", "hi", "ur", "te"];
  
  // Display name for current language
  const getCurrentLanguageShort = () => {
    switch(language) {
      case 'en': return 'EN';
      case 'hi': return 'HI';
      case 'ur': return 'UR';
      case 'te': return 'TE';
      default: return 'EN';
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative gap-1 rounded-full px-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200">
              <Globe className="h-4 w-4" />
              <span>{getCurrentLanguageShort()}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            {languages.map((lang) => (
              <DropdownMenuItem
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`${language === lang ? "bg-accent/10 font-medium" : ""} hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200`}
              >
                {getLanguageName(lang)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </TooltipTrigger>
      <TooltipContent>
        <p>Change language</p>
      </TooltipContent>
    </Tooltip>
  );
}
