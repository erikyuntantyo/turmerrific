import { cn } from "@/shared/utils/utils";

describe("cn()", () => {
  it("merges class names from multiple inputs", () => {
    expect(cn("px-2", "py-4", "text-sm")).toBe("px-2 py-4 text-sm");
  });

  it("dedupes Tailwind utility conflicts (last wins)", () => {
    expect(cn("px-2 py-4", "px-4")).toBe("py-4 px-4");
    expect(cn("text-sm text-foreground", "text-base")).toBe("text-foreground text-base");
  });
});
