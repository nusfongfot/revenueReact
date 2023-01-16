import Transaction from "./components/Transaction";
import FormComponent from "./components/FormComponent";
import DataContext from "./data/DataContext";
import "./App.css";
import { useState, useEffect } from "react";
import ReportComponent from "./components/ReportComponent";

function App() {
  const design = { color: "red", textAlign: "center", fontSize: "1.5rem" };
  const [items, setItems] = useState(() => {
    const saveItems = localStorage.getItem("items")
    if (saveItems) {
      return JSON.parse(saveItems) //convert js(data) to Object
    } else {
      return []
    }
  })
  const [reportIncome, setrReportIncome] = useState(0);
  const [reportExpense, setrReportExpense] = useState(0);
  const onAddNewItem = (newItem) => {
    setItems((prevItem) => {
      return [newItem, ...prevItem];
    });
  };

  useEffect(() => {
    const amounts = items.map((items) => items.amount);
    const totalIncome = amounts
      .filter((element) => element > 0)
      .reduce((acc, sum) => (acc += sum), 0);
    const totalExpense = amounts
      .filter((element) => element < 0)
      .reduce((acc, sum) => (acc += sum), 0);
    setrReportIncome(totalIncome);
    setrReportExpense(totalExpense);
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  return (
    <DataContext.Provider
      value={{
        income: reportIncome,
        expense: reportExpense,
      }}
    >
      <div className="container">
        <h1 style={design}>แอพบัญชีรายรับ - รายจ่าย</h1>
        <ReportComponent />
        <FormComponent onAddNewItem={onAddNewItem} items={items} setItems={setItems} />
        <Transaction items={items} />
      </div>
    </DataContext.Provider>
  );
}

export default App;
