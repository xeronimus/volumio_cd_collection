import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {uiLockDigit, uiLockDigitClear} from '../actions';

const UiLock = ({digits, uiLockDigit, uiLockDigitClear}) => (
  <div className="ui-lock">

    <div className="digits">
      <div className="digits-row">
        <Digit onClick={uiLockDigit} digit={1} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={2} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={3} digits={digits}/>
      </div>
      <div className="digits-row">
        <Digit onClick={uiLockDigit} digit={4} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={5} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={6} digits={digits}/>
      </div>
      <div className="digits-row">
        <Digit onClick={uiLockDigit} digit={7} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={8} digits={digits}/>
        <Digit onClick={uiLockDigit} digit={9} digits={digits}/>
      </div>
      <div className="digits-row">
        <button className="digit pure-button"
                onClick={uiLockDigitClear}>X
        </button>
        <Digit onClick={uiLockDigit} digit={0} digits={digits}/>
      </div>
    </div>
  </div>
);

UiLock.propTypes = {
  digits: PropTypes.array,
  uiLockDigit: PropTypes.func.isRequired,
  uiLockDigitClear: PropTypes.func.isRequired
};

const Digit = ({digit, digits, onClick}) => (
  <button className={'digit pure-button ' + (digits.indexOf(digit) > -1 ? 'digit-active' : '') }
          onClick={onClick.bind(undefined, digit)}>{digit}</button>
);

Digit.propTypes = {
  digits: PropTypes.array,
  digit: PropTypes.number,
  onClick: PropTypes.func.isRequired
};

export default connect(
  (state) => ({
    digits: state.uiState.uiLockDigits
  }),
  {uiLockDigit, uiLockDigitClear}
)(UiLock);
