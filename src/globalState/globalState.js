import React, { createContext, useReducer, useContext, useEffect } from 'react';
import PropTypes from 'prop-types';

const initialState = {
  userData: {},
  pageValues: {}
};

const GlobalStateContext = createContext(initialState);

const globalStateReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER_DATA':
      return {
        ...state,
        userData: action.payload
      };
    case 'SET_PAGE_VALUES':
      return {
        ...state,
        pageValues: {
          ...state.pageValues,
          ...action.payload
        }
      };
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalStateReducer, initialState);

  useEffect(() => {
    console.log('Global State updated:', state);
  }, [state]);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

GlobalStateProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useGlobalState = () => useContext(GlobalStateContext);
