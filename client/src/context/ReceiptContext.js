import { createContext, useReducer } from 'react';

export const ReceiptContext = createContext();

export const receiptReducer = (state, action) => {
  switch (action.type) {
    case 'SET_RECEIPT':
      return { receipt: action.payload };
    case 'CREATE_RECEIPT':
      return { receipt: [action.payload, ...state.income] };
    default:
      return state;
  }
};

export const ReceiptContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(receiptReducer, { receipt: null });

  return (
    <ReceiptContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ReceiptContext.Provider>
  );
};
