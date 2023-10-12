import { useState } from "react";
import { Type } from "../enums/type.enum";
import { BreweryFilter } from "../interfaces/brewery-filter.interface";
import styles from "./brewery-list-filter-without-reload.module.scss";
import { BrewerylistWithoutReload } from "../components/brewery-list-without-reload/brewery-list-without-reload";

async function getMeta(type?: keyof typeof Type | string) {
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

export default async function BreweryListFiltrWithoutReload() {
    const meta: BreweryFilter = {
        totalPerType: {
            BAR: (await getMeta(Type[Type.BAR])).total,
            BREWPUB: (await getMeta(Type[Type.BREWPUB])).total,
            CLOSED: (await getMeta(Type[Type.CLOSED])).total,
            CONTRACT: (await getMeta(Type[Type.CONTRACT])).total,
            LARGE: (await getMeta(Type[Type.LARGE])).total,
            MICRO: (await getMeta(Type[Type.MICRO])).total,
            NANO: (await getMeta(Type[Type.NANO])).total,
            PLANNING: (await getMeta(Type[Type.PLANNING])).total,
            PROPRIETOR: (await getMeta(Type[Type.PROPRIETOR])).total,
            REGIONAL: (await getMeta(Type[Type.REGIONAL])).total,
            TODOS: (await getMeta()).total
        }

    };

    return (
        <>
            {
                meta.totalPerType.BAR &&
                    meta.totalPerType.BREWPUB &&
                    meta.totalPerType.CLOSED &&
                    meta.totalPerType.CONTRACT &&
                    meta.totalPerType.LARGE &&
                    meta.totalPerType.MICRO &&
                    meta.totalPerType.NANO &&
                    meta.totalPerType.PLANNING &&
                    meta.totalPerType.PROPRIETOR &&
                    meta.totalPerType.REGIONAL &&
                    meta.totalPerType.TODOS
                    ?
                    <div className={styles['box-brewery']}>
                        <BrewerylistWithoutReload totalPerType={meta.totalPerType}></BrewerylistWithoutReload>
                    </div>

                    :
                    <p>Loading...</p>
            }
        </>
    );
}