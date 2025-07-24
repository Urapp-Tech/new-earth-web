import Loader from '@/components/common/Loader';
import { Button } from '@/components/ui/button';
import { fetchQuotationDetails } from '@/redux/features/quotationSlice';
import { useAppDispatch, useAppSelector } from '@/redux/redux-hooks';
import { CURRENCY } from '@/utils/constant';
import { formatCurrency } from '@/utils/helpers';
import dayjs from 'dayjs';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QuotationsDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { selectedQuotation, loading } = useAppSelector(
    (s) => s.quotationState
  );
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchQuotationsData = () => {
    dispatch(fetchQuotationDetails({ id }));
  };

  useEffect(() => {
    fetchQuotationsData();
  }, [dispatch]);

  return (
    <>
      {loading && <Loader />}
      <div className=" p-2 max-[1024px]:px-[40px] max-[768px]:p-0">
        <div className="mb-5 text-[28px] text-secondary max-[576px]:text-center">
          <h1 className="text-4xl">
            {' '}
            Quotation: {selectedQuotation?.quoteNumber}{' '}
          </h1>
          <h4 className="mt-2 text-xl text-gray-500">
            {' '}
            Expiry:{' '}
            {dayjs(selectedQuotation?.expiryDate).isValid() &&
              dayjs(selectedQuotation?.expiryDate).format(' DD, MMM-YYYY')}{' '}
          </h4>
        </div>
        <div className="rounded-[20px]  bg-white p-4">
          <table className="w-full">
            <thead>
              <tr className="text-left">
                <th className="p-5">Product</th>
                <th className="p-5">Color</th>
                <th className="p-5">Price</th>
                <th className="p-5">Quantity</th>
                <th className="p-5">Total</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {selectedQuotation?.items.map((item, i) => (
                <tr key={i}>
                  <td className=" px-5 py-3">{item.productName}</td>
                  <td className=" px-5 py-3">{item.color}</td>
                  <td className=" px-5 py-3">
                    {formatCurrency(item.unitPrice ?? 0, CURRENCY)}
                  </td>
                  <td className=" px-5 py-3">{item.quantity}</td>
                  <td className=" px-5 py-3">
                    {formatCurrency(item.total ?? 0, CURRENCY)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <hr className="my-4" />

          <div className="mt-5 flex justify-end gap-4 px-5">
            <div>
              <h2 className="mt-2 font-bold text-gray-500">SubTotal:</h2>
              <h2 className="mt-2 font-bold text-gray-500">Discount:</h2>
              <h2 className="mt-2 font-bold text-gray-500">Total:</h2>
            </div>
            <div className="w-[15%]">
              <h2 className="mt-2">
                {formatCurrency(
                  Number(selectedQuotation?.subtotal) ?? 0,
                  CURRENCY
                )}
              </h2>
              <h2 className="mt-2 border-b-2 border-black">
                {' '}
                {selectedQuotation?.discountType === 'percentage'
                  ? selectedQuotation?.discount
                  : formatCurrency(
                      Number(selectedQuotation?.discount ?? 0),
                      CURRENCY
                    )}{' '}
                {selectedQuotation?.discountType === 'percentage' ? '%' : ''}
              </h2>
              <h2 className="mt-2">
                {formatCurrency(
                  Number(selectedQuotation?.total) ?? 0,
                  CURRENCY
                )}
              </h2>
            </div>
          </div>
          <Button onClick={() => navigate(-1)}>Back</Button>
        </div>
      </div>
    </>
  );
};

export default QuotationsDetailsPage;
