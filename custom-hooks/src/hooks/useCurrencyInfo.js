import { useState, useEffect } from "react";

function useCurrencyInfo(currency) {
    const [currencyInfo, setCurrencyInfo] = useState({});

    useEffect(() => {
        if (!currency) return;

        const fetchCurrencyInfo = async () => {
            try {
                const response = await fetch(
                    `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch currency data");
                }

                const data = await response.json();

                setCurrencyInfo(data[currency] || {});
            } catch (error) {
                console.error("Error fetching currency data:", error);
                setCurrencyInfo({});
            }
        };

        fetchCurrencyInfo();
    }, [currency]);

    return currencyInfo;
}

export default useCurrencyInfo;
