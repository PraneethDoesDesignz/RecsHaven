"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { ListFilter, ChevronRight } from "lucide-react";
import { nanoid } from "nanoid";
import * as React from "react";
import { FilterOption, FilterType, filterViewOptions, filterViewToFilterOptions } from "@/components/ui/filters";

export function BookFilters({ screenType, onApply }: { screenType: "books" | "restaurants" | "movies" | "travel"; onApply?: (filters: any[]) => void }) {
  const [open, setOpen] = React.useState(false);
  const [selectedView, setSelectedView] = React.useState<FilterType | null>(null);
  const [filters, setFilters] = React.useState<any[]>([]);
  const [pendingFilters, setPendingFilters] = React.useState<any[]>([]);

  React.useEffect(() => {
    if (open) {
      setPendingFilters(filters);
    }
  }, [open]);

  const handleApply = () => {
    setFilters(pendingFilters);
    setOpen(false);
    if (onApply) onApply(pendingFilters);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {filters.filter((filter) => filter.value?.length > 0).length > 0 ? (
        <Button
          variant="outline"
          size="sm"
          className="transition group h-6 text-xs items-center rounded-sm"
          onClick={() => { setFilters([]); setPendingFilters([]); if (onApply) onApply([]); }}
        >
          Clear
        </Button>
      ) : null}
      <Popover
        open={open}
        onOpenChange={(open) => {
          setOpen(open);
          if (!open) {
            setTimeout(() => {
              setSelectedView(null);
            }, 200);
          }
        }}
      >
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            size="sm"
            className={cn(
              "transition group h-8 text-lg items-center rounded-sm flex gap-2 items-center",
              filters.length > 0 && "w-8"
            )}
          >
            <ListFilter className="size-6 shrink-0 transition-all text-muted-foreground group-hover:text-primary" />
            {!filters.length && "Filter"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[220px] p-0 bg-white mr-[30px]">
          <React.Fragment>
            <Command>
              <CommandList>
                {selectedView ? (
                  <CommandGroup>
                    {filterViewToFilterOptions[selectedView].map((filter: FilterOption) => (
                      <CommandItem
                        className="group text-muted-foreground flex gap-2 items-center cursor-pointer hover:bg-gray-200"
                        key={filter.name as string}
                        value={filter.name as string}
                        onSelect={(currentValue) => {
                          setPendingFilters((prev) => [
                            ...prev.filter(f => f.type !== selectedView),
                            {
                              id: nanoid(),
                              type: selectedView,
                              operator: "is",
                              value: [currentValue],
                            },
                          ]);
                          setTimeout(() => {
                            setSelectedView(null);
                          }, 200);
                        }}
                      >
                        {filter.icon}
                        <span className="text-accent-foreground">{filter.name}</span>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  filterViewOptions(screenType).map((group, index) => (
                    <React.Fragment key={index}>
                      <CommandGroup>
                        {group.map((filter: FilterOption) => (
                          <CommandItem
                            className="group text-muted-foreground flex gap-2 items-center cursor-pointer hover:bg-gray-200"
                            key={filter.name as string}
                            value={filter.name as string}
                            onSelect={() => {
                              if (filter.name === FilterType.LIKES || 
                                  filter.name === FilterType.GENRE || 
                                  filter.name === FilterType.CUISINE || 
                                  filter.name === FilterType.AUTHOR ||
                                  filter.name === FilterType.DIRECTOR ||
                                  filter.name === FilterType.LOCATION ||
                                  filter.name === FilterType.APPROX_EXPENDITURE) {
                                setSelectedView(filter.name as FilterType);
                              } else {
                                setPendingFilters((prev) => [
                                  ...prev.filter(f => f.type !== filter.name),
                                  {
                                    id: nanoid(),
                                    type: filter.name as FilterType,
                                    operator: "is",
                                    value: [filter.name as string],
                                  },
                                ]);
                              }
                            }}
                          >
                            {filter.icon}
                            <span className="text-accent-foreground">{filter.name}</span>
                            {filter.name === FilterType.LIKES && (
                              <ChevronRight className="ml-auto size-4" />
                            )}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                      {index < filterViewOptions(screenType).length - 1 && <CommandSeparator />}
                    </React.Fragment>
                  ))
                )}
              </CommandList>
              <div className="flex justify-end p-2 border-t bg-white">
                <Button size="sm" onClick={handleApply} className="ml-auto">Apply</Button>
              </div>
            </Command>
          </React.Fragment>
        </PopoverContent>
      </Popover>
    </div>
  );
}
