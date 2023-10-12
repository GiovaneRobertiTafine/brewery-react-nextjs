import { Brewery } from "@/app/models/brewery.model";
import "./brewery-detail.scss";
import { redirect } from 'next/navigation';
import Link from "next/link";
import Back from "@/app/components/back-detail/back-detail";

async function getBreweryDetail(id: string) {
    const res = await fetch('https://api.openbrewerydb.org/v1/breweries?by_ids=' + id);
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res!.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.error('Failed to fetch meta');
    }
    // console.log(res.json());
    console.log('detail');
    return await res.json();
}

export default async function BreweryList({ params }: { params: { slug: string; }; }) {
    const breweryDetail: Brewery[] = await getBreweryDetail(params.slug);

    return (
        <div className="box-detail">
            <Back />
            {
                breweryDetail.length ?
                    <div className="card card-detail">
                        <h2 className="card-title">{breweryDetail[0].name}</h2>
                        <dl className="card-info">
                            <dd>Type: {breweryDetail[0].brewery_type}</dd>
                            <dd>Street: {breweryDetail[0].street}</dd>
                            <dd>City: {breweryDetail[0].city}</dd>
                            <dd>State: {breweryDetail[0].state}</dd>
                            <dd>Postal: {breweryDetail[0].postal_code}</dd>
                            <dd>Country: {breweryDetail[0].country}</dd>
                            <dd>Website: <a href={breweryDetail[0].website_url} target="_blank">{breweryDetail[0].website_url}</a></dd>
                            <dd>Phone: {breweryDetail[0].phone}</dd>
                            <dd>Open in maps: <a href={"https://www.google.com.br/maps/search/?api=1&query=" + breweryDetail[0].latitude + "%2C" + breweryDetail[0].longitude + "%2C" + breweryDetail[0].name} target="_blank">{breweryDetail[0].latitude}, {breweryDetail[0].longitude}</a></dd>
                        </dl>
                    </div>
                    : <p>Brewery not found</p>
            }
        </div>
    );
}
