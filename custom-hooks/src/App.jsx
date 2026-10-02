import { useState } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import "./App.css";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);

  const currencyInfo = useCurrencyInfo(from);

  const currencyOptions = Object.keys(currencyInfo);

  const convertCurrency = () => {
    if (!currencyInfo[to]) return;

    setConvertedAmount(amount * currencyInfo[to]);
  };

  const swapCurrency = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedAmount);
    setConvertedAmount(amount);
  };

  const exchangeRate = currencyInfo[to];

  return (
    <div className="app">
      <header className="topbar">
      <div className="brand">
        <span className="brand-mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M5 8.5h14M5 15.5h14M9 5l-4 3.5L9 12m6 0 4 3.5L15 19"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
            />
          </svg>
        </span>
        <span>Exchange</span>
      </div>
      <span className="topbar-note">Simple conversions, wherever life takes you.</span>
      <div className="market-status">
        <span className="status-dot" aria-hidden="true" />
        Currency rates
      </div>
      </header>

      <main className="main-content">
      <section className="intro">
        <p className="eyebrow">Your money, in every language</p>
        <h1>
          Make every
          <br />
          currency <span>count.</span>
        </h1>
        <p className="intro-copy">
          Convert currencies in a moment with clear, up-to-date exchange rates.
          A simpler way to plan your next move.
        </p>
        <div className="trust-note">
          <span className="trust-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" fill="none">
              <path
                d="m5 12 4.2 4.2L19 6.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </span>
          <span>Fast, clear, and easy to use</span>
        </div>
      </section>

      <div className="converter">
        <div className="converter-heading">
          <div>
            <h2>Currency converter</h2>
            <p>Get your conversion in seconds</p>
          </div>
          <span className="secure-badge">
            <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M8 1.75 13 3.5v3.9c0 3.2-2.1 5.5-5 6.85-2.9-1.35-5-3.65-5-6.85V3.5l5-1.75Z"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
              <path
                d="m5.8 7.8 1.45 1.45 3-3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.3"
              />
            </svg>
            NO SIGN-UP
          </span>
        </div>

        <InputBox
          label="You send"
          amount={amount}
          onAmountChange={(value) => setAmount(value)}
          currency={from}
          onCurrencyChange={(value) => setFrom(value)}
          currencyOptions={currencyOptions}
        />

        <div className="swap-row">
          <button
            className="swap-btn"
            type="button"
            onClick={swapCurrency}
            aria-label="Swap currencies"
            title="Swap currencies"
          >
            <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M4 6h11m0 0-3-3m3 3-3 3M16 14H5m0 0 3-3m-3 3 3 3"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>

        <InputBox
          label="Recipient gets"
          amount={convertedAmount}
          currency={to}
          onCurrencyChange={(value) => setTo(value)}
          currencyOptions={currencyOptions}
          amountDisable={true}
        />

        <div className="rate-line" aria-live="polite">
          <span>Exchange rate</span>
          <span className="rate-value">
            {exchangeRate
              ? `1 ${from.toUpperCase()} = ${Number(exchangeRate).toLocaleString(
                  undefined,
                  { maximumSignificantDigits: 6 },
                )} ${to.toUpperCase()}`
              : "Fetching rate..."}
          </span>
        </div>

        <button className="convert-btn" type="button" onClick={convertCurrency}>
          Convert {from.toUpperCase()} to {to.toUpperCase()}
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10h12m0 0-4-4m4 4-4 4"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.7"
            />
          </svg>
        </button>
      </div>
      </main>

      <footer className="footer">
      <span>Exchange rates are provided for reference.</span>
      <span>
        Made for <strong>wherever you’re going.</strong>
      </span>
      </footer>
    </div>
  );
}

export default App;
