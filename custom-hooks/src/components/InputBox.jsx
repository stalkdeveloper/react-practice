function InputBox({
  label,
  amount,
  onAmountChange,
  currency,
  onCurrencyChange,
  currencyOptions = [],
  amountDisable = false,
  currencyDisable = false,
}) {
  const inputId = `${label.toLowerCase().replaceAll(" ", "-")}-amount`;
  const currencyId = `${label.toLowerCase().replaceAll(" ", "-")}-currency`;

  return (
    <div className="input-box">
      <div className="input-box-header">
        <label htmlFor={inputId}>{label}</label>
        <label htmlFor={currencyId}>Currency</label>
      </div>

      <div className="input-box-body">
        <input
          id={inputId}
          type="number"
          value={amount}
          disabled={amountDisable}
          onChange={(e) => onAmountChange?.(e.target.value)}
          placeholder="Amount"
        />

        <select
          id={currencyId}
          value={currency}
          disabled={currencyDisable}
          onChange={(e) => onCurrencyChange?.(e.target.value)}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default InputBox;