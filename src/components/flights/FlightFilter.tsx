import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FilterProps {
  onApplyFilters: (filters: any) => void;
  className?: string;
}

const FlightFilter = ({ onApplyFilters, className = "" }: FilterProps) => {
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedStops, setSelectedStops] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const airlines = [
    { id: "delta", name: "Delta Airlines" },
    { id: "united", name: "United Airlines" },
    { id: "american", name: "American Airlines" },
    { id: "lufthansa", name: "Lufthansa" },
    { id: "emirates", name: "Emirates" },
  ];

  const stopOptions = [
    { id: "nonstop", name: "Non-stop" },
    { id: "1stop", name: "1 Stop" },
    { id: "2stops", name: "2+ Stops" },
  ];

  const timeOptions = [
    { id: "morning", name: "Morning (6AM-12PM)" },
    { id: "afternoon", name: "Afternoon (12PM-6PM)" },
    { id: "evening", name: "Evening (6PM-12AM)" },
    { id: "night", name: "Night (12AM-6AM)" },
  ];

  const handleAirlineChange = (airlineId: string) => {
    setSelectedAirlines(
      selectedAirlines.includes(airlineId)
        ? selectedAirlines.filter((id) => id !== airlineId)
        : [...selectedAirlines, airlineId]
    );
  };

  const handleStopChange = (stopId: string) => {
    setSelectedStops(
      selectedStops.includes(stopId)
        ? selectedStops.filter((id) => id !== stopId)
        : [...selectedStops, stopId]
    );
  };

  const handleTimeChange = (timeId: string) => {
    setSelectedTimes(
      selectedTimes.includes(timeId)
        ? selectedTimes.filter((id) => id !== timeId)
        : [...selectedTimes, timeId]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      priceRange,
      airlines: selectedAirlines,
      stops: selectedStops,
      times: selectedTimes,
    });
  };

  const handleClearFilters = () => {
    setPriceRange([0, 2000]);
    setSelectedAirlines([]);
    setSelectedStops([]);
    setSelectedTimes([]);
    onApplyFilters({
      priceRange: [0, 2000],
      airlines: [],
      stops: [],
      times: [],
    });
  };

  // Mobile filter toggle button
  const FilterToggle = () => (
    <Button
      variant="outline"
      className="w-full flex justify-between items-center md:hidden mb-4 button-outline"
      onClick={() => setShowMobileFilters(!showMobileFilters)}
    >
      <span className="text-blue-meridian font-semibold">Filters</span>
      {showMobileFilters ? (
        <ChevronUp size={16} className="text-blue-meridian" />
      ) : (
        <ChevronDown size={16} className="text-blue-meridian" />
      )}
    </Button>
  );

  const FilterContent = () => (
    <>
      <div className="space-y-6">
        {/* Price Range */}
        <div>
          <h4 className="font-medium mb-4 text-rhapsody-in-blue">Price Range</h4>
          <div className="px-2">
            <Slider
              value={priceRange}
              min={0}
              max={2000}
              step={50}
              onValueChange={(value) => setPriceRange(value as [number, number])}
            />
            <div className="flex justify-between mt-2 text-sm text-blue-meridian">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>
        </div>

        <Separator className="border-blue-meridian" />

        {/* Airlines */}
        <div>
          <h4 className="font-medium mb-4 text-rhapsody-in-blue">Airlines</h4>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <div key={airline.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`airline-${airline.id}`}
                  checked={selectedAirlines.includes(airline.id)}
                  onCheckedChange={() => handleAirlineChange(airline.id)}
                />
                <Label
                  htmlFor={`airline-${airline.id}`}
                  className="text-sm text-blue-meridian"
                >
                  {airline.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="border-blue-meridian" />

        {/* Stops */}
        <div>
          <h4 className="font-medium mb-4 text-rhapsody-in-blue">Stops</h4>
          <div className="space-y-2">
            {stopOptions.map((stop) => (
              <div key={stop.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`stop-${stop.id}`}
                  checked={selectedStops.includes(stop.id)}
                  onCheckedChange={() => handleStopChange(stop.id)}
                />
                <Label
                  htmlFor={`stop-${stop.id}`}
                  className="text-sm text-blue-meridian"
                >
                  {stop.name}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Separator className="border-blue-meridian" />

        {/* Departure Times */}
        <div>
          <h4 className="font-medium mb-4 text-rhapsody-in-blue">Departure Times</h4>
          <div className="space-y-2">
            {timeOptions.map((time) => (
              <div key={time.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`time-${time.id}`}
                  checked={selectedTimes.includes(time.id)}
                  onCheckedChange={() => handleTimeChange(time.id)}
                />
                <Label
                  htmlFor={`time-${time.id}`}
                  className="text-sm text-blue-meridian"
                >
                  {time.name}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-2">
        <Button className="w-full button-primary" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
        <Button
          variant="outline"
          className="w-full button-outline"
          onClick={handleClearFilters}
        >
          Clear Filters
        </Button>
      </div>
    </>
  );

  return (
    <>
      <FilterToggle />

      <Card
        className={`${className} ${showMobileFilters ? "block" : "hidden"} md:block border-blue-meridian`}
        style={{ backgroundColor: "var(--background)" }}
      >
        <CardContent className="p-6">{<FilterContent />}</CardContent>
      </Card>
    </>
  );
};

export default FlightFilter;
