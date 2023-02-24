import React, { useEffect, useState } from 'react';
import { useDataContext } from '../hooks/useDataContext';
import IncomeDetails from '../components/IncomeDetails';

function Income() {
  const { data, dispatch } = useDataContext();
  const [incDisp, setIncDisp] = useState(5);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchIncome = async () => {
      const response = await fetch('/catalog/income');
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_DATA', payload: json });
      }
    };

    fetchIncome();
  }, []);

  // COME BACK TO SHOW MORE AND LESS, MAKE BETTER OONGA BOONGA
  const showMore = () => {
    if (incDisp !== data.length) {
      setIncDisp(incDisp + 3);
    }
  };
  const showLess = () => {
    if (incDisp > 3) {
      setIncDisp(incDisp - 3);
    }
  };

  //toggle modal state
  const modalOn = () => {
    setModal(true);
  };
  const modalOff = (e) => {
    setModal(false);
  };

  return (
    <section className="income_container">
      <div className="income_header">
        <h1>Income</h1>
        <p>Add, update, delete, and review your income.</p>
      </div>

      <div className="income_list">
        {data &&
          data
            .slice(0, incDisp)
            .map((income) => (
              <IncomeDetails
                modalOn={modalOn}
                key={income._id}
                name={income.name}
                id={income._id}
                date={income.date_formatted}
                description={income.description}
                amount={income.amount}
              />
            ))}
        <button onClick={showMore}>Show More</button>
        <button onClick={showLess}>Show Less</button>
      </div>

      <div
        className="modal"
        style={modal ? { display: 'flex' } : { display: 'none' }}
      >
        <div className="modal_content">
          <span onClick={modalOff} className="close">
            X
          </span>
          <p>Put Data of Clicked Income / Receipt here</p>
          <p>FK U REACT, BE MORE INTUITIVE</p>
        </div>
      </div>
    </section>
  );
}

export default Income;
