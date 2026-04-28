import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, vi } from "vitest";
import { FilterPanel } from "./FilterPanel";
import "@testing-library/jest-dom";

describe("FilterPanel", () => {
    it('вызывает onChangeFilter при клике на кнопку Running', () => {
        const mockFn = vi.fn();

        render(
            <FilterPanel 
                currentFilter="all"
                onChangeFilter={mockFn}
            />
        )

        const button = screen.getByText("Running");
        fireEvent.click(button);
        expect(mockFn).toHaveBeenCalledWith("running");
    });

    it('подсвечивает активный фильтр', () => {
        render(
          <FilterPanel
            currentFilter="running"
            onChangeFilter={() => {}}
          />
        );
      
        const button = screen.getByText("Running");
      
        expect(button).toHaveStyle("font-weight: bold");
      });
    
})