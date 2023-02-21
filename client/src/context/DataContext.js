import { createContext, useReducer } from 'react';

export const DataContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DATA':
      return { data: action.payload };
    case 'CREATE_DATA':
      return { data: [action.payload, ...state.data] };
    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, { data: null });

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
