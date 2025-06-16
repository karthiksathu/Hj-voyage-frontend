import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { useLanguage } from "../language/LanguageProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
  seniors: number;
}

interface PassengerSelectorProps {
  onChange: (counts: PassengerCounts) => void;
  value: PassengerCounts;
}

export default function PassengerSelector({ onChange, value }: PassengerSelectorProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<PassengerCounts>(value);
  const [activeTab, setActiveTab] = useState<"adults" | "children" | "infants" | "seniors">("adults");
  
  // Store passenger names
  const [passengerDetails, setPassengerDetails] = useState<Record<string, string[]>>({
    adults: Array(value.adults).fill(""),
    children: Array(value.children).fill(""),
    infants: Array(value.infants).fill(""),
    seniors: Array(value.seniors).fill(""),
  });

  const handleCountChange = (type: keyof PassengerCounts, increment: number) => {
    const newCounts = { ...counts };
    
    // Set minimum and maximum values
    if (type === "adults") {
      // At least 1 adult required
      newCounts[type] = Math.max(1, Math.min(9, newCounts[type] + increment));
    } else {
      newCounts[type] = Math.max(0, Math.min(9, newCounts[type] + increment));
    }
    
    // Update the names array length to match the new count
    const newNames = [...passengerDetails[type]];
    if (increment > 0) {
      while (newNames.length < newCounts[type]) {
        newNames.push("");
      }
    } else if (increment < 0) {
      while (newNames.length > newCounts[type]) {
        newNames.pop();
      }
    }
    
    setPassengerDetails({
      ...passengerDetails,
      [type]: newNames
    });
    
    setCounts(newCounts);
  };

  const handleNameChange = (type: string, index: number, name: string) => {
    const newNames = [...passengerDetails[type]];
    newNames[index] = name;
    
    setPassengerDetails({
      ...passengerDetails,
      [type]: newNames
    });
  };

  const handleApply = () => {
    onChange(counts);
    setOpen(false);
  };

  const totalPassengers = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  const passengerTypeLabels: Record<string, string> = {
    adults: 'Adults (18+)',
    children: 'Children (2-17)',
    infants: 'Infants (0-2)',
    seniors: 'Seniors (65+)'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full group">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#024b74] group-hover:text-[#0372aa] transition-colors duration-200" />
          <Input
            readOnly
            className="pl-10 cursor-pointer bg-[#ffffff] border-[#024b74] hover:border-[#0372aa] transition-colors duration-200"
            value={`${totalPassengers} ${totalPassengers === 1 ? 'Passenger' : 'Passengers'}`}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-[#ffffff] border border-[#024b74]">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium text-[#002444]">Passenger Information</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="adults" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-4 mb-4 border-b border-[#024b74]">
              <TabsTrigger
                value="adults"
                className="text-xs sm:text-sm transition-all duration-200 text-[#024b74] data-[state=active]:bg-[#0372aa] data-[state=active]:text-[#ffffff]"
              >
                Adults
              </TabsTrigger>
              <TabsTrigger
                value="children"
                className="text-xs sm:text-sm transition-all duration-200 text-[#024b74] data-[state=active]:bg-[#0372aa] data-[state=active]:text-[#ffffff]"
              >
                Children
              </TabsTrigger>
              <TabsTrigger
                value="infants"
                className="text-xs sm:text-sm transition-all duration-200 text-[#024b74] data-[state=active]:bg-[#0372aa] data-[state=active]:text-[#ffffff]"
              >
                Infants
              </TabsTrigger>
              <TabsTrigger
                value="seniors"
                className="text-xs sm:text-sm transition-all duration-200 text-[#024b74] data-[state=active]:bg-[#0372aa] data-[state=active]:text-[#ffffff]"
              >
                Seniors
              </TabsTrigger>
            </TabsList>
            
            {(Object.keys(counts) as Array<keyof PassengerCounts>).map((type) => (
              <TabsContent key={type} value={type} className="space-y-4 text-[#002444]">
                <div className="flex items-center justify-between">
                  <Label htmlFor={type} className="text-base font-medium text-[#002444]">
                    {passengerTypeLabels[type]}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 hover:bg-[#ffffff] transition-colors duration-200 border-[#024b74] text-[#024b74] hover:text-[#0372aa]"
                      onClick={() => handleCountChange(type, -1)}
                      disabled={(type === "adults" && counts[type] <= 1) || counts[type] <= 0}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center font-medium">{counts[type]}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 hover:bg-[#ffffff] transition-colors duration-200 border-[#024b74] text-[#024b74] hover:text-[#0372aa]"
                      onClick={() => handleCountChange(type, 1)}
                      disabled={counts[type] >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {counts[type] > 0 && <p className="text-sm text-[#024b74]">Enter passenger names</p>}
                  {Array.from({ length: counts[type] }).map((_, index) => (
                    <div key={`${type}-${index}`} className="space-y-1">
                      <Label htmlFor={`${type}-name-${index}`} className="text-sm text-[#002444]">
                        {type === "adults" ? "Adult" : type === "children" ? "Child" : type === "infants" ? "Infant" : "Senior"} {index + 1}
                      </Label>
                      <Input
                        id={`${type}-name-${index}`}
                        placeholder="Full Name"
                        value={passengerDetails[type][index] || ""}
                        onChange={(e) => handleNameChange(type, index, e.target.value)}
                        className="hover:border-[#0372aa] transition-colors duration-200 border-[#024b74] text-[#002444]"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            className="mt-2 sm:mt-0 hover:bg-[#ffffff] transition-colors duration-200 border-[#024b74] text-[#024b74] hover:text-[#0372aa]"
          >
            Cancel
          </Button>
          <Button
            onClick={handleApply}
            className="bg-[#0372aa] hover:bg-[#024b74] transition-colors duration-200 text-[#ffffff]"
          >
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
