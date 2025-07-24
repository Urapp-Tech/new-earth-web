import { Button } from '@/components/ui/button';
import Quotation from '@/interfaces/Quotation';
import { fetchQuotations } from '@/redux/features/quotationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY } from '@/utils/constant';
import { formatCurrency, sortArrayByKey } from '@/utils/helpers';
import dayjs from 'dayjs';
import { EyeIcon } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const QuotationsPage = () => {
  const dispatch = useAppDispatch();
  const { quotations } = useAppSelector((s) => s.quotationState);
  const navigate = useNavigate();

  const fetchQuotationsData = () => {
    dispatch(fetchQuotations({}));
  };

  useEffect(() => {
    fetchQuotationsData();
  }, [dispatch]);

  const handleQuoteSelection = (q: Quotation) => {
    navigate(`./${q.id}`);
  };

  return (
    <>
      <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center">
          Project Quotations and Payments.
        </div>
        <div className="rounded-[20px]  bg-white">
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
              {sortArrayByKey(quotations, 'createdAt', 'desc').map(
                (item, index) => {
                  return (
                    <tr
                      key={index}
                      className="border-grey-100 border-[1px] text-left"
                    >
                      <td className=" px-5 py-1">{item.quoteNumber}</td>
                      <td className=" px-5 py-1 ">
                        {formatCurrency(Number(item.total ?? 0), CURRENCY)}
                      </td>
                      <td className=" px-5 py-1">
                        {dayjs(item.expiryDate).isValid() &&
                          dayjs(item.expiryDate).format('DD, MM-YYYY')}
                      </td>
                      <td className=" px-5 py-1">
                        {dayjs(item.createdAt).isValid() &&
                          dayjs(item.createdAt).format('DD, MM-YYYY')}
                      </td>
                      <td className=" px-2 py-1">
                        <Button
                          onClick={() => handleQuoteSelection(item)}
                          className="btn-flips  my-[10px] h-[56px] w-[56px] rounded-[28px] bg-[#F5F5F5] bg-transparent text-primary hover:bg-primary hover:text-white"
                        >
                          <EyeIcon />
                        </Button>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default QuotationsPage;
