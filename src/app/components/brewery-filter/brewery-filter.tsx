"use client";

import { Type } from "@/app/enums/type.enum";
import { BreweryFilter } from "@/app/interfaces/brewery-filter.interface";
import { BreweryList } from "@/app/interfaces/brewery-list.interface";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import "./brewery-filter.scss";

interface Filter {
    type: string;
    page: string;
}
let search: URLSearchParams;
if (typeof window !== "undefined") {
    search = new URLSearchParams(window.location.search);
    // browser code
    localStorage.setItem('type', search.get('type') ?? '');
    localStorage.setItem('page', search.get('page') ?? '');
}

export function BreweryFilterComponent(
    { totalPerType }: BreweryFilter) {
    const searchParams = useSearchParams();
    const currentPage: number = !(+searchParams.get('page')!) ? 1 : +searchParams.get('page')!;
    const listPagination = (itemsPerPage: number, totalItems: number): (number | string)[] => {
        let totalPages = Math.ceil(totalItems / itemsPerPage);
        let halfWay = Math.floor(7 / 2);

        let isStart = currentPage <= halfWay;
        let isMiddle = currentPage > halfWay && currentPage <= (totalPages - halfWay);
        let isEnd = currentPage > (totalPages - halfWay);

        let list: (number | string)[] = [];
        let enumerator = 7 <= totalPages ? 7 : totalPages;

        for (let i = 1; i <= enumerator; i++) {
            if (7 > totalPages) {
                list.push(i);
            } else
                if (isMiddle) {
                    list.push(((currentPage - halfWay - 1) + i));
                } else
                    if (isStart) {
                        list.push(i);
                    } else
                        if (isEnd) {
                            list.push(((totalPages - 7) + i));
                        }

        }
        if (isStart) list.push(...['...', totalPages]);
        if (isEnd) list.unshift(...[1, '...']);
        if (isMiddle) {
            list.push(...['...', totalPages]);
            list.unshift(...[1, '...']);
        }
        return list;
    };
    const typeBrewery: string = searchParams.get('type') ?? '';
    const types: string[] = Object.keys(Type).filter(key => isNaN(Number(key)));
    let quantityPages: (number | string)[] = !typeBrewery ?
        [...listPagination(40, +totalPerType['TODOS'])] :
        [...listPagination(40, +(totalPerType[typeBrewery as keyof typeof Type]))];

    const router = useRouter();

    const handlerChangeFilter = (filter: Filter) => {
        let query = '?' + (filter.type ? 'type=' + filter.type + '&' : '');
        console.log(filter);
        localStorage.setItem('type', filter.type ?? '');
        localStorage.setItem('page', filter.page.toString());
        router.push(query + 'page=' + filter.page);
    };



    return (
        <div className="box-pagination">
            <div>
                <label>Type:</label>
                <select name="type" id="select-type" value={searchParams.get('type') ?? ''} onChange={(e) => {
                    handlerChangeFilter({ type: e.target.value, page: '1' });
                }}>
                    <option value={''}>Todos</option>
                    {
                        types.map((r) => <option key={r} value={r}>{r.toLocaleLowerCase()}</option>)
                    }
                </select>

            </div>
            <div className="pagination">
                <button className={"button-pagination " + (currentPage === 1 ? 'disabled' : '')}
                    onClick={() => handlerChangeFilter({ type: typeBrewery!, page: (currentPage - 1).toString() })}> &lt; </button>
                {
                    quantityPages.map((p, index) => {
                        return (
                            p !== '...' ?
                                <button key={index} className={"button-pagination " + (currentPage == p ? 'current-page' : '')}
                                    onClick={() => {
                                        handlerChangeFilter({ type: typeBrewery!, page: (p).toString() });
                                    }}>{p}</button>
                                :
                                <button key={index} className="button-pagination dot">{p}</button>
                        );
                    })
                }

                <button className={"button-pagination " +
                    (currentPage === Math.ceil(+(totalPerType[typeBrewery as keyof typeof Type]) / 40) ? 'disabled' : '')}
                    onClick={() => handlerChangeFilter({ type: typeBrewery!, page: (currentPage + 1).toString() })}> &gt; </button>
            </div>

        </div>
    );
}