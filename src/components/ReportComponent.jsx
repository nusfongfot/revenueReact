import { useContext } from "react";
import DataContext from "../data/DataContext";

function ReportComponent() {
  const { income, expense } = useContext(DataContext);
  const formatNumber=(num)=> {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
  return (
    <div>
      <p>ยอดคงเหลือ : {(income + expense).toLocaleString('en-US')}</p>
      <p>รายรับ : {formatNumber(income)}</p>
      <p>รายจ่าย : {formatNumber(expense)}</p>
    </div>
  );
}
export default ReportComponent;
