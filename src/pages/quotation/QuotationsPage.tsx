import { Button } from "@/components/ui/button";
import Quotation from "@/interfaces/Quotation";
import { fetchQuotations } from "@/redux/features/quotationSlice";
import { useAppDispatch, useAppSelector } from "@/redux/redux-hooks";
import { CURRENCY } from "@/utils/constant";
import { formatCurrency, sortArrayByKey } from "@/utils/helpers";
import dayjs from "dayjs";
import { EyeIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const QuotationsPage = () => {

    const dispatch = useAppDispatch();
    const { quotations } = useAppSelector(s => s.quotationState);
    const  navigate = useNavigate();

    const fetchQuotationsData = () => {
        dispatch(fetchQuotations({}));
    }


    useEffect(() => {
        fetchQuotationsData();
    }, [dispatch])




    const handleQuoteSelection = (q: Quotation) => {
        navigate(`./${q.id}`);
    }

    return (
        <>
            <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
                <div className="text-[28px] text-secondary mb-5 max-[576px]:text-center">
                    Quotations
                </div>
                <div className="bg-white  rounded-[20px]">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left">
                                <th className="p-5">Quote</th>
                                <th className="p-5">Total</th>
                                <th className="p-5">Valid Till</th>
                                <th className="p-5">Created At</th>
                                <th>&nbsp;</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortArrayByKey(quotations, 'createdAt', 'desc').map((item, index) => {
                                return (
                                    <tr key={index} className="text-left border-grey-100 border-[1px]">
                                        <td className=" px-5 py-1">{item.quoteNumber}</td>
                                        <td className=" px-5 py-1 ">{ formatCurrency(Number(item.total?? 0), CURRENCY) }</td>
                                        <td className=" px-5 py-1">{ dayjs(item.expiryDate).isValid() && dayjs(item.expiryDate).format('DD, MM-YYYY') }</td>
                                        <td className=" px-5 py-1">{ dayjs(item.createdAt).isValid() && dayjs(item.createdAt).format('DD, MM-YYYY') }</td>
                                        <td className=" px-2 py-1">
                                            <Button onClick={() => handleQuoteSelection(item)} className="bg-transparent  my-[10px] rounded-[28px] w-[56px] h-[56px] btn-flips bg-[#F5F5F5] text-primary hover:bg-primary hover:text-white" >
                                                <EyeIcon />
                                            </Button>
                                        </td>
                                    </tr>
                                )
                            })}

                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default QuotationsPage