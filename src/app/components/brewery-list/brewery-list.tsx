import { Type } from "../../enums/type.enum";
import "./brewery-list.scss";
import { Brewery } from "../../models/brewery.model";
import { BreweryList } from "../../interfaces/brewery-list.interface";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function Brewerylist(
    { brewerys }: BreweryList) {
    // Wait for the playlists
    // const [breweryList, setBreweryList] = useState<Brewery[]>([]);
    // const [typeBrewery, setTypeBrewery] = useState<string | null>(null);
    // const types: string[] = Object.keys(Type).filter(key => isNaN(Number(key)));
    // const [quantityPages, setQuantityPages] = useState<number[]>([]);
    // const [currentPage, setCurrentPage] = useState<number>(1);
    // const router = useRouter();

    // async function getBreweryList() {
    //     setBreweryList([]);
    //     const res = await fetch('https://api.openbrewerydb.org/v1/breweries?page=' + currentPage + '&per_page=20' +
    //         (typeBrewery ? '&by_type=' + typeBrewery.toLocaleLowerCase() : ''));
    //     // The return value is *not* serialized
    //     // You can return Date, Map, Set, etc.

    //     if (!res!.ok) {
    //         // This will activate the closest `error.js` Error Boundary
    //         console.error('Failed to fetch meta');
    //     }
    //     res!.json()
    //         .then((r) => {
    //             setBreweryList(r);
    //         });

    // }

    // const verifyPage = (): void => {
    //     if (!typeBrewery) {
    //         setQuantityPages([...listPagination(40, +totalPerType['TODOS'])]);
    //     } else {
    //         setQuantityPages([...listPagination(40, +(totalPerType[typeBrewery as keyof typeof Type]))]);
    //     }
    // };

    // useEffect(() => {
    //     setQuantityPages([]);
    //     verifyPage();
    //     getBreweryList();
    //     router.push('?type=' + typeBrewery || 'todos' + '&page=' + currentPage);
    // }, [typeBrewery, currentPage]);

    // const listPagination = (itemsPerPage: number, totalItems: number): number[] => {
    //     let totalPages = Math.ceil(totalItems / itemsPerPage);
    //     let halfWay = Math.floor(7 / 2);

    //     let isStart = currentPage <= halfWay;
    //     let isMiddle = currentPage > halfWay && currentPage <= (totalPages - halfWay);
    //     let isEnd = currentPage > (totalPages - halfWay);

    //     let list: number[] = [];
    //     let enumerator = 7 <= totalPages ? 7 : totalPages;

    //     for (let i = 1; i <= enumerator; i++) {
    //         if (7 > totalPages) {
    //             list.push(i);
    //         } else
    //             if (isMiddle) {
    //                 list.push(((currentPage - halfWay - 1) + i));
    //             } else
    //                 if (isStart) {
    //                     list.push(i);
    //                 } else
    //                     if (isEnd) {
    //                         list.push(((totalPages - 5) + i));
    //                     }

    //     }
    //     return list;
    // };


    // return (
    //     <div className="box-brewery-list">
    //         <div style={{ display: 'flex', gap: '10px' }}>
    //             <div>
    //                 <label>Type:</label>
    //                 <select name="type" id="select-type" onChange={(e) => { setTypeBrewery(() => e.target.value); setCurrentPage(() => 1); }}>
    //                     <option value={''} defaultValue={''}>Todos</option>
    //                     {
    //                         types.map((r) => <option key={r} value={r}>{r.toLocaleLowerCase()}</option>)
    //                     }
    //                 </select>

    //             </div>
    //             <div className="pagination">
    //                 <button className={"button-pagination " + (currentPage === 1 ? 'disabled' : '')}
    //                     onClick={() => { setCurrentPage(() => currentPage - 1); }}> &lt; </button>
    //                 {
    //                     quantityPages.map((p, index) => {
    //                         return (
    //                             <button key={index} className={"button-pagination " + (currentPage == p ? 'current-page' : '')}
    //                                 onClick={() => { setCurrentPage(() => p); }}>{p}</button>
    //                         );
    //                     })
    //                 }

    //                 <button className={"button-pagination " +
    //                     (currentPage === Math.ceil(+(totalPerType[typeBrewery as keyof typeof Type]) / 40) ? 'disabled' : '')}
    //                     onClick={() => { setCurrentPage(() => currentPage + 1); }}> &gt; </button>
    //             </div>

    //         </div>
    //         <p style={{ margin: '10px 0px' }}>{totalPerType.TODOS}/ micro: {totalPerType.MICRO}, nano: {totalPerType.NANO},
    //             regional: {totalPerType.REGIONAL}, brewpug: {totalPerType.BREWPUB}, large: {totalPerType.LARGE}, planning: {totalPerType.PLANNING},
    //             bar: {totalPerType.BAR}, contract: {totalPerType.CONTRACT}, proprietor: {totalPerType.PROPRIETOR}, closed: {totalPerType.CLOSED}</p>
    //         {
    //             breweryList.length ?
    //                 <div className="grid">
    //                     {breweryList.map((r: Brewery) => (
    //                         <div className="card card-list" key={r.id}>
    //                             <h2 className="card-title">
    //                                 <a href={'/brewery-detail/' + r.id}>{r.name}</a>
    //                             </h2>
    //                             <p className="card-info">
    //                                 {r.street} <br />
    //                                 {r.city} {r.state} - {r.postal_code}
    //                             </p>
    //                             <div className="card-type">
    //                                 <span className={'type-' + r.brewery_type.toLocaleUpperCase()}>{r.brewery_type}</span>
    //                             </div>
    //                         </div>
    //                     ))}
    //                 </div>

    //                 :
    //                 <div>Loading...</div>
    //         }

    //     </div >

    // );

    return (
        <>
            {
                <div className="grid">
                    {brewerys.map((r: Brewery) => (
                        <div className="card card-list" key={r.id}>
                            <h2 className="card-title">
                                <Link href={'/brewery-detail/' + r.id}>{r.name}</Link>
                            </h2>
                            <p className="card-info">
                                {r.street} <br />
                                {r.city} {r.state} - {r.postal_code}
                            </p>
                            <div className="card-type">
                                <span className={'type-' + r.brewery_type.toLocaleUpperCase()}>{r.brewery_type}</span>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </>
    );
} 