import {useCompanyData} from "./hooks/useCompanyData.ts";
import {FETCH_STATUS} from "./types/state.ts";
import {normalizeTree} from "./utils/normalizeTree.ts";

export const App = () => {
    const companyData = useCompanyData();

    if (companyData.status === FETCH_STATUS.LOADING) return <div>Loading...</div>;

    if (companyData.status === FETCH_STATUS.ERROR) return <div>{companyData.error}</div>;

    const normalizedData = normalizeTree(companyData.data);

    return <div>{JSON.stringify(normalizedData)}</div>
}
