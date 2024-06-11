import { ListProfile } from "@/shared/interfaces";
import Dashboard from "@/components/Dashboard";

export default async  function Page() {
    const list = await getList();

    return (
        <Dashboard data={list} />
    )
}
async function getList(): Promise<ListProfile> {
    const res = await fetch('http://127.0.0.1:8000/api/lists/1', {cache: "no-store", credentials: "include"});
    const list: ListProfile = await res.json();
    console.log(list);
    return list;
}; 