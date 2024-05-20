import { Brewery } from '@/lib/brewery';
import { getBreweryByCity } from '@/lib/brewery';
import PieChart from '@/components/graph';
import Data from '@/lib/Data';

export default async function ({ params }: { params: { slug: string } }) {
  const breweries: Brewery[] = await getBreweryByCity(params.slug);
  const data: Data[] = Object.entries(
    Object.groupBy(breweries, ({ brewery_type }) => brewery_type)
  ).map(([type, brewList]) => ({
    id: type,
    label: type,
    value: brewList!.length,
    color: `hsl(${(Math.random() * 359).toFixed()}, 100%, 50%)`,
  }));
  console.log(data);

  return (
    <div>
      <h1>{params.slug}</h1>
      <ul>
        {breweries.map((brewery) => (
          <li key={brewery.address_1}>{brewery.name}</li>
        ))}
      </ul>
      <PieChart data={data} />
    </div>
  );
}
