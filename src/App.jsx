import { useEffect, useState } from "react";
import { tenureData } from "./utils/constants";
import { numberWithCommas } from "./utils/config";
import TextInput from "./components/text-input";
import "./App.css";
import SliderInput from "./components/slider-input";

function App() {
  const [cost, setCost] = useState();
  const [interest, setInterest] = useState(10);
  const [fee, setFee] = useState(1);
  const [downPayment, setdownPayment] = useState(0);
  const [tenure, setTenure] = useState(12);
  const [emi, setEmi] = useState(0);

  useEffect(() => {
    if (!(cost > 0)) {
      setdownPayment(0);
      setEmi(0);
    }

    const emi = calculateEMI(downPayment);
    setEmi(emi);
  }, [tenure, cost, downPayment]);

  const calculateEMI = (downPayment) => {
    if (!cost) return;
    const loanAmt = cost - downPayment;
    const rateOfInterest = interest / 100;
    const numOfYears = tenure / 12;

    const EMI =
      (loanAmt * rateOfInterest * (1 + rateOfInterest) ** numOfYears) /
      ((1 + rateOfInterest) ** numOfYears - 1);

    return Number(EMI / 12).toFixed(0);
  };

  const calculateDP = (emi) => {
    if (!cost) return;

    const downPaymentPercent = 100 - (emi / calculateEMI(0)) * 100;
    return Number((downPaymentPercent / 100) * cost).toFixed(0);
  };

  const updateEMI = (e) => {
    if (!cost) return;

    const dp = Number(e.target.value);
    setdownPayment(dp.toFixed(0));

    const emi = calculateEMI(dp);
    setEmi(emi);
  };

  const updateDownPayment = (e) => {
    if (!cost) return;

    const emi = Number(e.target.value);
    setEmi(emi.toFixed(0));

    const dp = calculateDP(emi);
    setdownPayment(dp);
  };

  const totalDownPayment = () => {
    return numberWithCommas(
      (Number(downPayment) + (cost - downPayment) * (fee / 100)).toFixed(0)
    );
  };
  const totalEMI = () => numberWithCommas((emi * tenure).toFixed(0));

  return (
    <>
      <span className="title">EMI Calculator</span>
      <br />
      <TextInput
        title={"Total Cost of Asset:"}
        state={cost}
        setState={setCost}
      />
      <TextInput
        title={"Interest Rate (in %):"}
        state={interest}
        setState={setInterest}
      />
      <TextInput
        title={"Processing Fee (in %):"}
        state={fee}
        setState={setFee}
      />
      <br />
      <SliderInput
        title="DownPayment"
        state={downPayment}
        min={0}
        max={cost}
        labelMin={"0%"}
        labelMax={"100%"}
        underlineTitle={`Total Down Payment: $ ${totalDownPayment()}`}
        onChange={updateEMI}
      />
      <SliderInput
        title="Loan per Month"
        state={emi}
        min={calculateEMI(cost)}
        max={calculateEMI(0)}
        labelMin={calculateEMI(cost)}
        labelMax={calculateEMI(0)}
        underlineTitle={`Total Loan Payment: $ ${totalEMI()}`}
        onChange={updateDownPayment}
      />
      <br />
      <span className="title">Tenure</span>
      <div className="tenureContainer">
        {tenureData.map((t) => {
          return (
            <button
              className={`tenure ${t === tenure ? "selected" : ""}`}
              onClick={() => {
                setTenure(t);
              }}
              key={t}
            >
              {t}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default App;
