import { useDebugValue, useState } from "react";
import "./App.css";
import { InputBox } from "./Components";
import useCurrencyInfo from "./Hooks/UseCurrencyinfo";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [toFrom, setToFrom] = useState("pkr");
  const [convertAmount, setConvertAmount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);
  const swap = () => {
    setFrom(toFrom);
    setToFrom(from);
    setConvertAmount(amount);
    setAmount(convertAmount);
  };
  const Convert = () => {
    setConvertAmount(amount * currencyInfo[toFrom]);
  };
  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/6694543/pexels-photo-6694543.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              Convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 py-0.5"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="From"
                amount={convertAmount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setToFrom(currency)}
                amountDisable
                selectCurrency={toFrom}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from} to {toFrom}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
