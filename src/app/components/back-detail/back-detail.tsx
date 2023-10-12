"use client";

import Link from "next/link";

export default function Back({ withoutReload }: { withoutReload?: boolean; }) {
    const type = localStorage.getItem('type') ?? '';
    const page = !(localStorage.getItem('page')) ? '1' : localStorage.getItem('page');

    const getSetFilter = (): string => {
        let query = '?' + (type ? 'type=' + type + '&' : '');
        return query + 'page=' + page;
    };

    return (
        <Link id="link-back" href={'/' + (withoutReload ? 'brewery-list-filter-without-reload' : getSetFilter())}>&lt; Back</Link>
    );
}