import React, { useState, useEffect } from 'react';
import Select from 'react-select';

const Bridge = ({ options, customStyles }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [inputValue1, setInputValue1] = useState('');
  const [inputValue2, setInputValue2] = useState('');
  const [inputState, setInputState] = useState('initial');
  const [placeholder, setPlaceholder] = useState("Select a participating merchant");

  const handleMenuOpen = () => {
    setPlaceholder("Search by name");
  };

  const handleMenuClose = () => {
    setPlaceholder("Select a participating merchant");
  };

  const handleChange = (option) => {
    setSelectedOption(option);
    setInputState('initial');
    setInputValue1('');
    setInputValue2('');
  };

  const handleInputChange1 = (e) => {
    setInputValue1(e.target.value);
  };

  const handleInputChange2 = (e) => {
    setInputValue2(e.target.value);
  };

  const handleInputSubmit = (inputId) => {
    if (inputId === 'memIdBox') {
      if (inputValue1.trim() === '1234') {
        setInputState('validated');
      }
    } else if (inputId === 'amountBox') {
      // Handle amount submission
    }
  };

  const handleKeyDown = (e, inputId) => {
    if (e.key === 'Enter') {
      handleInputSubmit(inputId);
    }
  };

  useEffect(() => {
    const memIdBox = document.getElementById('memIdBox');
    const amountBox = document.getElementById('amountBox');

    if (memIdBox) {
      memIdBox.addEventListener('keydown', (e) => handleKeyDown(e, 'memIdBox'));
    }
    if (amountBox) {
      amountBox.addEventListener('keydown', (e) => handleKeyDown(e, 'amountBox'));
    }
    return () => {
      if (memIdBox) {
        memIdBox.removeEventListener('keydown', handleKeyDown);
      }
      if (amountBox) {
        amountBox.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [inputValue1, inputValue2]);

  const handleMaxClick = () => {
    setInputValue2('1000');
  };

  return (
    <section id="bridge-section" className="bridge-section">
      <div className="label"><p>Sender</p></div>
      <div className="fetch-box">
        <p className="fetch-label">Fetch</p>
        <p className="available-points">Available: 1000 Points</p>
      </div>
      <div className="label"><p>Receiver</p></div>
      <Select
        className="select-merchant-menu"
        classNamePrefix="select"
        isClearable
        isSearchable
        options={options}
        onChange={handleChange}
        placeholder={placeholder}
        onMenuOpen={handleMenuOpen}
        onMenuClose={handleMenuClose}
        value={selectedOption}
        styles={customStyles}
        onInputChange={(value, { action }) => {
          if (action === 'input-change' && value === '') {
            setSelectedOption(null);
            setInputState('initial');
          }
        }}
      />
      {selectedOption && (
        <div className="input-container">
          {inputState === 'initial' ? (
            <>
              <input
                type="text"
                id="memIdBox"
                name="memIdBox"
                placeholder="Your Membership ID e.g. ROYAL123456A"
                value={inputValue1}
                onChange={handleInputChange1}
                onKeyDown={(e) => handleKeyDown(e, 'memIdBox')}
              />
            </>
          ) : inputState === 'validated' && (
            <>
              <div className="label"><p>Amount You Are Sending</p></div>
              <div className="amount-container">
                <input
                  type="text"
                  id="amountBox"
                  name="amountBox"
                  placeholder="0"
                  value={inputValue2}
                  onChange={handleInputChange2}
                  onKeyDown={(e) => handleKeyDown(e, 'amountBox')}
                />
                <p className="fetch-points">FETCH Points</p>
                <button type="button" id="Max" onClick={handleMaxClick}>Max</button>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
};

export default Bridge;