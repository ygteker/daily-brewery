import Link from 'next/link';
import { Brewery, getTodaysBrewery } from '../lib/brewery';
import Image from 'next/image';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import { signOut } from '@/lib/auth';

export default async function Home() {
  const todaysBrewery: Brewery = await getTodaysBrewery();
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <nav>
        <ol className='flex space-x-20'>
          <li>
            <h1>Daily Brewery</h1>
          </li>
          <li>
            <Link href='/login'>Login</Link>
          </li>
          <li>
            <Link href='/signup'>Sign Up</Link>
          </li>
          <li>
            <Link href='/profile'>Profile</Link>
          </li>
        </ol>
      </nav>
      <div>
        <h1>Welcome to Daily Brewery</h1>
        <p>
          Explore the finest breweries across the United States and discover
          their unique flavors and craft beers. From hoppy IPAs to smooth
          stouts, we have it all. Join us on a journey through the rich world of
          brewing and indulge in the art of beer-making. Cheers!
        </p>
      </div>
      <div>
        <h1 className='text-2xl'>Todays Brewery</h1>
        <h2>{todaysBrewery.name}</h2>
        <Image
          src='/brewery.webp'
          alt='generic brewery'
          width={200}
          height={200}
        />
        <p>{todaysBrewery.address_1}</p>
        <p>{todaysBrewery.city}</p>
        <p>{todaysBrewery.state}</p>
        <p>{todaysBrewery.country}</p>
        <p className='text-red-700'>
          Great Central Brewing Company is a renowned brewery located in
          Chicago, Illinois. They are known for their exceptional craft beers
          and dedication to quality. With a wide range of beer styles to choose
          from, including hoppy IPAs, rich stouts, and refreshing lagers, Great
          Central Brewing Company has something for every beer lover. Visit
          their brewery at 123 Main Street, Chicago, and experience the art of
          beer-making firsthand. Cheers!
        </p>
      </div>
      <div className='flex flex-row justify-center space-x-20 w-screen'>
        <Card className='w-2/12'>
          <CardMedia
            sx={{ height: 140 }}
            image='/brewery.webp'
            title='New York'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              New York
            </Typography>
          </CardContent>
          <CardActions>
            <Link href='/new-york'>
              <Button size='small'>Explore Breweries</Button>
            </Link>
          </CardActions>
        </Card>
        <Card className='w-2/12'>
          <CardMedia
            sx={{ height: 140 }}
            image='/brewery.webp'
            title='Los Angeles'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Los Angeles
            </Typography>
          </CardContent>
          <CardActions>
            <Link href='/los-angeles'>
              <Button size='small'>Explore Breweries</Button>
            </Link>
          </CardActions>
        </Card>
        <Card className='w-2/12'>
          <CardMedia
            sx={{ height: 140 }}
            image='/brewery.webp'
            title='San Francisco'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              San Francisco
            </Typography>
          </CardContent>
          <CardActions>
            <Link href='/san-francisco'>
              <Button size='small'>Explore Breweries</Button>
            </Link>
          </CardActions>
        </Card>
        <Card className='w-2/12'>
          <CardMedia
            sx={{ height: 140 }}
            image='/brewery.webp'
            title='Chicago'
          />
          <CardContent>
            <Typography gutterBottom variant='h5' component='div'>
              Chicago
            </Typography>
          </CardContent>
          <CardActions>
            <Link href='/chicago'>
              <Button size='small'>Explore Breweries</Button>
            </Link>
          </CardActions>
        </Card>
      </div>
      <form
        action={async () => {
          'use server';
          await signOut();
        }}
      >
        <button>SignOut</button>
      </form>
    </main>
  );
}
