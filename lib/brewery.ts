import { redirect } from 'next/navigation';

export type Brewery = {
  name: string;
  address_1: string;
  city: string;
  state: string;
  country: string;
  brewery_type: string;
};

interface BreweryResponse {
  id: string;
  name: string;
  brewery_type: string;
  address_1: string;
  address_2: string;
  address_3: string;
  city: string;
  state_province: string;
  postal_code: string;
  country: string;
  longitude: string;
  latitude: string;
  phone: string;
  website_url: string;
  state: string;
  street: string;
}

export async function getTodaysBrewery() {
  const res = await fetch('https://api.openbrewerydb.org/breweries/random');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const [{ name, address_1, city, state, country, brewery_type }] =
    await res.json();
  const brewery: Brewery = {
    name,
    address_1,
    city,
    state,
    country,
    brewery_type,
  };
  return brewery;
}

export async function getBreweryByCity(city: string) {
  if (city.includes('-')) {
    city = city.replace('-', '_');
  }
  const res = await fetch(
    `https://api.openbrewerydb.org/v1/breweries?by_city=${city}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const resList = await res.json();
  if (resList.length == 0) {
    redirect('/');
  }
  const breweries: Brewery[] = resList.map((resp: BreweryResponse) => ({
    name: resp.name,
    address_1: resp.address_1,
    city: resp.city,
    state: resp.state,
    country: resp.country,
    brewery_type: resp.brewery_type,
  }));
  return breweries;
}
