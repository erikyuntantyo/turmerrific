/**
 * @jest-environment node
 */
import { GET } from "@/app/api/health/route";

describe("GET /api/health", () => {
  it("returns 200 with status: ok", async () => {
    const res = GET();
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
  });

  it("includes timestamp and version fields", async () => {
    const res = GET();
    const body = await res.json();
    expect(typeof body.timestamp).toBe("string");
    expect(typeof body.version).toBe("string");
    expect(Date.parse(body.timestamp)).not.toBeNaN();
  });
});
