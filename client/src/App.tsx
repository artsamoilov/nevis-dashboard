import {useCompanyData} from "./hooks/useCompanyData.ts";
import {FETCH_STATUS} from "./types/state.ts";
import {normalizeTree} from "./utils/normalizeTree.ts";
import {Table} from "./components/Table/Table.tsx";
import {MONTHS} from "./constants/months.const.ts";
import {Layout} from "./components/Layout/Layout.tsx";

export const App = () => {
    const companyData = useCompanyData();

    if (companyData.status === FETCH_STATUS.LOADING) return <div>Loading...</div>;

    if (companyData.status === FETCH_STATUS.ERROR) return <div>{companyData.error}</div>;

    const normalizedData = normalizeTree(companyData.data);

    return (
        <Layout>
            <h1>Clients</h1>
            <Table data={normalizedData} months={MONTHS} />
        </Layout>
    )
}
