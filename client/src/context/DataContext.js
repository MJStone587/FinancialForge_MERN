import { createContext, useReducer } from 'react';

export const DataContext = createContext();

export const dataReducer = (state, action) => {
  switch (action.type) {
    case 'SET_INCDATA':
      return { data: action.payload };
    case 'SET_EXPDATA':
      return { expData: action.payload };
    case 'CREATE_INCDATA':
      return { data: [action.payload, ...state.data] };
    case 'CREATE_EXPDATA':
      return { expData: [action.payload, ...state.expData] };
    case 'DELETE_INCDATA':
      return { data: state.data.filter((d) => d._id !== action.payload._id) };
    case 'DELETE_EXPDATA':
      return {
        expData: state.expData.filter((d) => d._id !== action.payload._id),
      };
    case 'UPDATE_INCDATA':
      return {
        data: [...state.data],
      };
    case 'UPDATE_EXPDATA':
      return {
        expData: [
          action.payload.filter((d) => d._id === action.payload._id),
          ...state.expData,
        ],
      };
    case 'GET_SINGLE_DATA':
      return { data: state.data.filter((d) => d._id !== action.payload._id) };
    default:
      return state;
  }
};

export const DataContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(dataReducer, {
    data: null,
    expData: null,
  });

  return (
    <DataContext.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
};
