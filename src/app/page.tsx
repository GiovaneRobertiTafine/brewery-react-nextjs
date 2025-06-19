import Image from 'next/image';
import styles from './page.module.scss';
import { Suspense } from 'react';
import { Type } from './enums/type.enum';
import { redirect } from 'next/navigation';
import type { InferGetStaticPropsType, GetStaticProps } from 'next';
import { Brewerylist } from './components/brewery-list/brewery-list';
import { BreweryFilterComponent } from './components/brewery-filter/brewery-filter';
import { Meta } from './models/meta.model';
import { BreweryList } from './interfaces/brewery-list.interface';
import { Brewery } from './models/brewery.model';
import { BreweryFilter } from './interfaces/brewery-filter.interface';

async function getMeta(type?: keyof typeof Type) {
    const res = await fetch('https://api.openbrewerydb.org/v1/breweries/meta' +
        (type ? '?by_type=' + type.toLocaleLowerCase() : ''), { next: { revalidate: 3600 } });
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res!.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error('Failed to fetch meta');
    }
    // console.log(res.json());
    console.log('meta');

    return await res.json();
}

async function getBreweryList(type: string, page: string) {
    const res = await fetch('https://api.openbrewerydb.org/v1/breweries?page=' + page + '&per_page=40' +
        (type ? '&by_type=' + type.toLocaleLowerCase() : ''));
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res!.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error('Failed to fetch meta');
    }

    return res!.json();

}

export default async function Home({
    searchParams,
}: {
    searchParams: { [key: string]: string; };
}) {

    const meta: BreweryFilter = {
        totalPerType: {
            BAR: (await getMeta('BAR')).total,
            BREWPUB: (await getMeta('BREWPUB')).total,
            CLOSED: (await getMeta('CLOSED')).total,
            CONTRACT: (await getMeta('CONTRACT')).total,
            LARGE: (await getMeta('LARGE')).total,
            MICRO: (await getMeta('MICRO')).total,
            NANO: (await getMeta('NANO')).total,
            PLANNING: (await getMeta('PLANNING')).total,
            PROPRIETOR: (await getMeta('PROPRIETOR')).total,
            REGIONAL: (await getMeta('REGIONAL')).total,
            TODOS: (await getMeta()).total
        }

    };

    const brewerys: Brewery[] = await getBreweryList(searchParams.type ?? "", searchParams.page ?? "1");

    return (
        <>
            {
                brewerys.length ?
                    <div className={styles['box-brewery']}>
                        <BreweryFilterComponent totalPerType={meta.totalPerType}></BreweryFilterComponent>
                        <p>{meta.totalPerType.TODOS}/ micro: {meta.totalPerType.MICRO}, nano: {meta.totalPerType.NANO},
                            regional: {meta.totalPerType.REGIONAL}, brewpug: {meta.totalPerType.BREWPUB}, large: {meta.totalPerType.LARGE}, planning: {meta.totalPerType.PLANNING},
                            bar: {meta.totalPerType.BAR}, contract: {meta.totalPerType.CONTRACT}, proprietor: {meta.totalPerType.PROPRIETOR}, closed: {meta.totalPerType.CLOSED}</p>
                        <Brewerylist
                            brewerys={brewerys}
                        ></Brewerylist>
                    </div>

                    :
                    <p>Loading...</p>
            }
        </>

    );
}






