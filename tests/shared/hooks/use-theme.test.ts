import { act, renderHook } from "@testing-library/react";
import { useTheme } from "@/shared/hooks/use-theme";

describe("useTheme", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.classList.remove("dark");
    (window.matchMedia as jest.Mock).mockImplementation((query: string) => ({
      matches: false,
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    }));
  });

  it("defaults to light when no localStorage and OS preference is light", () => {
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);
    expect(document.documentElement.classList.contains("dark")).toBe(false);
  });

  it("respects localStorage override when set", () => {
    localStorage.setItem("theme", "dark");
    const { result } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });

  it("toggleTheme writes to localStorage and updates DOM class", () => {
    const { result, rerender } = renderHook(() => useTheme());
    expect(result.current.isDark).toBe(false);

    act(() => result.current.toggleTheme());
    rerender();

    expect(localStorage.getItem("theme")).toBe("dark");
    expect(result.current.isDark).toBe(true);
    expect(document.documentElement.classList.contains("dark")).toBe(true);
  });
});
