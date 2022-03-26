export const getCountryByIp = async (): Promise<
  (Record<string, any> & { countryCode: string }) | false
> => {
  try {
    const res = await fetch(
      `https://extreme-ip-lookup.com/json/?key=${process.env.REACT_APP_EXTREME_IP_KEY}`
    );
    return await res.json();
  } catch (error) {
    return false;
  }
};
