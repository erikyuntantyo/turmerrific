import { act, renderHook } from "@testing-library/react";
import { useDebounced } from "@/shared/hooks/use-debounced";

describe("useDebounced", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounced("hello", 300));
    expect(result.current).toBe("hello");
  });

  it("updates value after delay", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounced(value, 300), {
      initialProps: { value: "first" },
    });

    rerender({ value: "second" });
    expect(result.current).toBe("first");

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(result.current).toBe("second");
  });

  it("cancels pending timeout on rapid value changes", () => {
    const { result, rerender } = renderHook(({ value }) => useDebounced(value, 300), {
      initialProps: { value: "a" },
    });

    rerender({ value: "ab" });
    act(() => jest.advanceTimersByTime(100));
    rerender({ value: "abc" });
    act(() => jest.advanceTimersByTime(100));
    rerender({ value: "abcd" });

    expect(result.current).toBe("a");
    act(() => jest.advanceTimersByTime(300));
    expect(result.current).toBe("abcd");
  });
});
