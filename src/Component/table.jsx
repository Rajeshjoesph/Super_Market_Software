import { useState } from "react";
import { handleChangeCoustomerdtl } from "../Sale/Sale";

const PaymentScreen = ({
  totalAmount,
  onClose,
  onSubmit,
  onPaymentTypeChange,
}) => {
  const paymentTypes = ["Cash", "Card", "UPI", "Bank Transfer"];
  const [activePaymentType, setActivePaymentType] = useState(paymentTypes[0]);

  const [paymentDetails, setPaymentDetails] = useState(
    paymentTypes.reduce((acc, type) => ({ ...acc, [type]: "" }), {})
  );

  const handlePaymentTypeSelect = (type) => {
    setActivePaymentType(type);
    if (onPaymentTypeChange) {
      onPaymentTypeChange({ target: { name: "paymentType", value: type } }); // Pass mock event
    }
  };

  const handleAmountChange = (e, type) => {
    const { value } = e.target;
    setPaymentDetails((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  const calculateTotalReceived = () =>
    Object.values(paymentDetails).reduce(
      (total, amount) => total + (parseFloat(amount) || 0),
      0
    );

  const pendingAmount = totalAmount - calculateTotalReceived();

  const handleSubmit = (e) => {
    // e.preventDefault();
    const totalReceived = calculateTotalReceived();

    if (totalReceived !== totalAmount) {
      alert("Total received amount must match the total bill amount!");
      return;
    }
    onSubmit();
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/3">
        <h2 className="text-xl font-bold mb-4">Select Payment Type</h2>

        <div className="flex space-x-4 mb-6">
          {paymentTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handlePaymentTypeSelect(type)}
              className={`py-2 px-4 rounded-lg font-semibold ${
                activePaymentType === type
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        <div>
          {paymentTypes.map((type) => (
            <div
              key={type}
              className={`mb-4 ${
                activePaymentType === type ? "block" : "hidden"
              }`}
            >
              <label className="block text-lg font-medium mb-2">
                Enter {type} Amount:
              </label>
              <input
                type="number"
                value={paymentDetails[type]}
                onChange={(e) => handleAmountChange(e, type)}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder={`Enter ${type} amount`}
              />
            </div>
          ))}

          <div className="mt-4">
            <h3 className="text-lg font-semibold">
              Total Bill Amount: {totalAmount.toFixed(2)}
            </h3>
            <h3
              className={`text-lg font-semibold ${
                pendingAmount > 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              Pending: {Math.abs(pendingAmount).toFixed(2)}
            </h3>
          </div>

          <div className="flex justify-end mt-6 space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="py-2 px-4 bg-gray-400 text-white rounded-lg hover:bg-gray-500"
            >
              Cancel
            </button>
            <button
              onSubmit={handleSubmit}
              type="submit"
              className="py-2 px-4 bg-green-500 text-white rounded-lg hover:bg-green-600"
              // onClick={onClose}
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentScreen;
