import { convertAxios, convertFetch } from "./currency";
import { server, rest } from "../testServer";
import { LATEST_CURRENCY_URL } from '../utils/api/urls'

describe('using msw', () => {
  it("should convert correctly", async () => {
    const rate = await convertAxios();
    expect(rate).toEqual({ rates: { CAD: 1.42 } });
  });

  it("should handle failure", async () => {
    server.use(
      rest.get("http://api.exchangeratesapi.io/v1/latest", (_req, res, ctx) => {
        return res(ctx.status(404));
      })
    );

    await expect(convertAxios()).rejects.toThrow("404");
  });
})


describe('using jest-fetch-mock', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  it("should convert correctly", async () => {
    fetch.mockResponseOnce(JSON.stringify({ rates: { CAD: 1.42 } }));

    const rates = await convertFetch();

    expect(rates).toEqual({ rates: { CAD: 1.42 } });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(LATEST_CURRENCY_URL);
  });

  it("should catches errors and return null", async () => {
    fetch.mockReject(() => "API failure");

    const rates = await convertFetch();

    expect(rates).toEqual(null);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(LATEST_CURRENCY_URL);
  });
})
