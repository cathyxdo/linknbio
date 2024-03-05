
import Appearance from "@/components/Appearance";
import { ListProfile } from "@/shared/interfaces";

export default async function Page() {
    const list = await getList();

    return (
        <Appearance data={list} />
    )
}

async function getList(): Promise<ListProfile> {
    const res = await fetch('http://127.0.0.1:8000/api/lists/1', {cache: "no-store"});
    const list: ListProfile = await res.json();
    console.log(list);
    return list;
}; 