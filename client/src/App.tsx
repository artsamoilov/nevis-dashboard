import {useCompanyData} from "./hooks/useCompanyData.ts";
import {FETCH_STATUS} from "./types/state.ts";
import {normalizeTree} from "./utils/normalizeTree.ts";
import {getChannelTotals} from "./utils/getChannelTotals.ts";
import {Table} from "./components/Table/Table.tsx";
import {Chart} from "./components/Chart/Chart.tsx";
import {MONTHS} from "./constants/months.const.ts";
import {Layout} from "./components/Layout/Layout.tsx";

import * as S from "./App.styled.ts";

export const App = () => {
    const companyData = useCompanyData();
    const normalizedData = companyData.status === FETCH_STATUS.SUCCESS ? normalizeTree(companyData.data) : null;

    return (
        <Layout>
            <h1>Clients</h1>

            {companyData.status === FETCH_STATUS.LOADING && (
                <S.StatusCard role="status" aria-live="polite">
                    <S.Spinner aria-hidden="true"/>
                    Loading client data…
                </S.StatusCard>
            )}

            {companyData.status === FETCH_STATUS.ERROR && (
                <S.StatusCard role="alert">
                    Couldn't load client data: {companyData.error}
                    <S.RetryButton onClick={companyData.refetch}>Try again</S.RetryButton>
                </S.StatusCard>
            )}

            {normalizedData && (
                <>
                    <Chart node={getChannelTotals(normalizedData)} months={MONTHS}/>
                    <Table data={normalizedData} months={MONTHS}/>
                </>
            )}
        </Layout>
    );
}
