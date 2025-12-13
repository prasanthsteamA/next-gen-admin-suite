import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Car, MapPin, AlertTriangle, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { vehicles, alerts, chargingHubs } from "@/data/mockData";
import { cn } from "@/lib/utils";

interface SearchResult {
  id: string;
  type: "vehicle" | "depot" | "alert" | "hub";
  title: string;
  subtitle: string;
  path: string;
}

export function GlobalSearch() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Search logic
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const searchResults: SearchResult[] = [];

    // Search vehicles
    vehicles.forEach((vehicle) => {
      if (
        vehicle.vrn.toLowerCase().includes(searchTerm) ||
        vehicle.name.toLowerCase().includes(searchTerm) ||
        vehicle.make.toLowerCase().includes(searchTerm) ||
        vehicle.model.toLowerCase().includes(searchTerm) ||
        vehicle.depot.toLowerCase().includes(searchTerm)
      ) {
        searchResults.push({
          id: vehicle.id,
          type: "vehicle",
          title: `${vehicle.vrn} - ${vehicle.name}`,
          subtitle: `${vehicle.depot} • SOC: ${vehicle.soc}%`,
          path: "/vehicles",
        });
      }
    });

    // Search depots
    const depots = [...new Set(vehicles.map((v) => v.depot))];
    depots.forEach((depot, index) => {
      if (depot.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: `depot-${index}`,
          type: "depot",
          title: depot,
          subtitle: `${vehicles.filter((v) => v.depot === depot).length} vehicles`,
          path: "/depots",
        });
      }
    });

    // Search alerts
    alerts.forEach((alert) => {
      if (alert.message.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: alert.id,
          type: "alert",
          title: alert.message.slice(0, 50) + (alert.message.length > 50 ? "..." : ""),
          subtitle: `${alert.type} • ${alert.time}`,
          path: "/",
        });
      }
    });

    // Search charging hubs
    chargingHubs.forEach((hub) => {
      if (hub.name.toLowerCase().includes(searchTerm)) {
        searchResults.push({
          id: hub.id,
          type: "hub",
          title: hub.name,
          subtitle: `${hub.power} • ${hub.pricePerKwh}`,
          path: "/charging",
        });
      }
    });

    setResults(searchResults.slice(0, 10));
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen(true);
        setTimeout(() => inputRef.current?.focus(), 0);
      }
      if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle result keyboard navigation
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[selectedIndex]) {
      handleSelect(results[selectedIndex]);
    }
  };

  const handleSelect = (result: SearchResult) => {
    navigate(result.path);
    setIsOpen(false);
    setQuery("");
  };

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getIcon = (type: SearchResult["type"]) => {
    switch (type) {
      case "vehicle":
        return <Car className="h-4 w-4" />;
      case "depot":
        return <MapPin className="h-4 w-4" />;
      case "alert":
        return <AlertTriangle className="h-4 w-4" />;
      case "hub":
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {isOpen ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search vehicles, depots, alerts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleInputKeyDown}
            className="w-72 pl-9 pr-8 h-9 bg-muted/50"
            autoFocus
          />
          <button
            type="button"
            onClick={() => {
              setIsOpen(false);
              setQuery("");
            }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>

          {/* Search Results Dropdown */}
          {query && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg overflow-hidden z-50">
              {results.length > 0 ? (
                <ul className="py-1 max-h-80 overflow-y-auto">
                  {results.map((result, index) => (
                    <li
                      key={`${result.type}-${result.id}`}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 cursor-pointer transition-colors",
                        index === selectedIndex
                          ? "bg-accent text-accent-foreground"
                          : "hover:bg-muted"
                      )}
                      onClick={() => handleSelect(result)}
                      onMouseEnter={() => setSelectedIndex(index)}
                    >
                      <div className="flex-shrink-0 text-muted-foreground">
                        {getIcon(result.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{result.title}</p>
                        <p className="text-xs text-muted-foreground truncate">
                          {result.subtitle}
                        </p>
                      </div>
                      <span className="text-xs text-muted-foreground capitalize">
                        {result.type}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="px-4 py-6 text-center text-muted-foreground">
                  <p className="text-sm">No results found for "{query}"</p>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        <button
          onClick={() => {
            setIsOpen(true);
            setTimeout(() => inputRef.current?.focus(), 0);
          }}
          className="flex items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted/50 transition-colors"
        >
          <Search className="h-4 w-4" />
          <span className="hidden md:inline">Search</span>
          <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 text-xs text-muted-foreground">
            ⌘K
          </kbd>
        </button>
      )}
    </div>
  );
}
