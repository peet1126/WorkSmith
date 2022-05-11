import { useState } from "react";

export default function MakeChange() {
  const [initialAmount, setInitialAmount] = useState(null);
  const [coins, setCoins] = useState([0.25, 0.1, 0.05, 0.01]);
  const [change, setChange] = useState(null);
  const [coinOne, setCoinOne] = useState(null);
  const [coinTwo, setCoinTwo] = useState(null);
  const [coinThree, setCoinThree] = useState(null);
  const [coinFour, setCoinFour] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    makeChange();
  };

  // Calculates the least number of coins required to product the input amount.
  const makeChange = () => {
    let amount = initialAmount;
    let changeArray = [];
    coins.map((coin) => {
      const coinAmount = Math.floor(amount / coin);
      changeArray.push(coinAmount);
      return (amount = Math.round(100 * (amount - coinAmount * coin)) / 100);
    });
    return setChange(changeArray);
  };

  // Changes the coin values from the default values to the user input values.
  const changeCoinValues = (e) => {
    e.preventDefault();
    const newCoins = [coinOne, coinTwo, coinThree, coinFour];
    // Sorts the coin values from highest to lowest so the coins array is in the proper order for the makeChange function.
    newCoins.sort((a, b) => {
      return b - a;
    });
    // If the user does not add a coin value of 1 cent it will automatically be added.
    if (!newCoins.includes(0.01)) {
      newCoins.push(0.01);
    }
    setCoins(newCoins);
    setChange(null);
    return;
  };

  return (
    <div className="make-change">
      <h1>Calculate Change</h1>
      <form onSubmit={handleSubmit}>
        <label>Amount: </label>
        <input
          type="number"
          step="0.01"
          placeholder="4.37"
          onChange={(e) => setInitialAmount(e.target.value)}
        />
        <button type="submit">Calculate</button>
      </form>
      <p>The default coin values are 0.25, 0.10, 0.05, 0.01</p>
      <h1>Set New coin Values</h1>
      <form onSubmit={changeCoinValues}>
        <label>Set coin value 1: </label>
        <input
          required
          type="number"
          step="0.01"
          placeholder="0.25"
          onChange={(e) => setCoinOne(e.target.value)}
        />
        <label>Set coin value 2: </label>
        <input
          required
          type="number"
          step="0.01"
          placeholder="0.10"
          onChange={(e) => setCoinTwo(e.target.value)}
        />
        <label>Set coin value 3: </label>
        <input
          required
          type="number"
          step="0.01"
          placeholder="0.05"
          onChange={(e) => setCoinThree(e.target.value)}
        />
        <label>Set coin value 4: </label>
        <input
          required
          type="number"
          step="0.01"
          placeholder="0.01"
          onChange={(e) => setCoinFour(e.target.value)}
        />
        <button type="submit">Set Values</button>
      </form>
      <div>
        <h2>Results</h2>
        {coins &&
          change &&
          coins.map((coin, index) => {
            return (
              <h4 key={coin}>
                Coin value: {coin} - Number of Coins: {change[index]}
              </h4>
            );
          })}
      </div>
    </div>
  );
}
