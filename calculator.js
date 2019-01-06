class CalculatorDisplay extends React.Component {
  render() {
    const {value, ...props} = this.props
  return ( 
    <div {...props} className="calculator-display">{value}</div>
  )
  }
}

class CalculatorKey extends React.Component {
  render() {
    const {className, ...props} = this.props

    return (
      <button className={`calculator-key ${className}`} {...props}/>
    )
  }
}

const CalculatorOperations = {
    '/': (prevValue, nextValue) => prevValue / nextValue,
    '*': (prevValue, nextValue) => prevValue * nextValue,
    '-': (prevValue, nextValue) => prevValue - nextValue,
    '+': (prevValue, nextValue) => prevValue + nextValue,
    '=': (prevValue, nextValue) => nextValue,
}

class Calculator extends React.Component {
    state = {
      value: null,
      displayValue: "0",
      waitingForOperand: false,
      operator: null    
    }

    clearAll() {
      this.setState({
        value: null,
        displayValue: '0',
        operator: null,
        waitingForOperand: false
      })
    }
  
    clearDisplay() {
      this.setState({
        displayValue: '0'
      })
    }
    
    inputDot() {
      const { displayValue } = this.state
      
      if (!(/\./).test(displayValue)) {
        this.setState({
          displayValue: displayValue + '.',
          waitingForOperand: false
        })
      }
    }
  
    toggleSign() {
      const {displayValue} = this.state
      this.setState({displayValue: displayValue.charAt(0) === "-" ? displayValue.substr(1) : "-" + displayValue })
    }
    
    inputPercent() {
      const { displayValue } = this.state
      const currentValue = parseFloat(displayValue)
      
      if (currentValue === 0)
        return
      
      const fixedDigits = displayValue.replace(/^-?\d*\.?/, '')
      const newValue = parseFloat(displayValue) / 100
      
      this.setState({
        displayValue: String(newValue.toFixed(fixedDigits.length + 2))
      })
    }

    inputDigit(digit) {
      const {displayValue, waitingForOperand} = this.state

      if (waitingForOperand && displayValue.length < 6) {
        this.setState({
          displayValue: String(digit),
          waitingForOperand: false
        })
      } else if (displayValue.length < 6) {
      this.setState({displayValue: displayValue === "0" ? 
          String(digit) : displayValue + digit})
      } else {
        alert ("Too many digits")
      }
      console.log(this.state)
    }

    performOperation(nextOperator) {
      const {value, displayValue, operator} = this.state
      const inputValue = parseFloat(displayValue)

      this.setState({
        waitingForOperand: true,
        operator: nextOperator
      })

      if (value === null) {
        this.setState({
          value: inputValue
        })
      } else if (operator) {
        const currentValue = value || 0
        const newValue = CalculatorOperations[operator](currentValue, inputValue)

        this.setState({
          value: newValue,
          displayValue: String(newValue)
        })
      }
    }
  
    render() {
      const {displayValue} = this.state
      const clearDisplay = displayValue !== "0"
      const clearText = clearDisplay ? "C" : "AC"
      return (
      <div className="calculator">
       <CalculatorDisplay value ={displayValue}/>
        <div className="calculator-keypad">
          <div className="function-key">
            <CalculatorKey className="calculator-key key-clear" onClick={() => clearDisplay ? this.clearDisplay() : this.clearAll()}>{clearText}</CalculatorKey>
            <CalculatorKey className="calculator-key key-sign" onClick={() => this.toggleSign()}>±</CalculatorKey>
            <CalculatorKey className="calculator-key key-percent" onClick={() => this.percent()}>%</CalculatorKey>
          </div>
          <div className="digit-keys">
            <CalculatorKey className="calculator-key key-9" onClick={() => this.inputDigit(9)}>9</CalculatorKey>
            <CalculatorKey className="calculator-key key-8" onClick={() => this.inputDigit(8)}>8</CalculatorKey>
            <CalculatorKey className="calculator-key key-7" onClick={() => this.inputDigit(7)}>7</CalculatorKey>
            <CalculatorKey className="calculator-key key-6" onClick={() => this.inputDigit(6)}>6</CalculatorKey>
            <CalculatorKey className="calculator-key key-5" onClick={() => this.inputDigit(5)}>5</CalculatorKey>
            <CalculatorKey className="calculator-key key-4" onClick={() => this.inputDigit(4)}>4</CalculatorKey>
            <CalculatorKey className="calculator-key key-3" onClick={() => this.inputDigit(3)}>3</CalculatorKey>
            <CalculatorKey className="calculator-key key-2" onClick={() => this.inputDigit(2)}>2</CalculatorKey>
            <CalculatorKey className="calculator-key key-1" onClick={() => this.inputDigit(1)}>1</CalculatorKey>
            <CalculatorKey className="calculator-key key-0" onClick={() => this.inputDigit(0)}>0</CalculatorKey>
            <CalculatorKey className="calculator-key key-dot" onClick={() => this.inputDot()}>●</CalculatorKey>
          </div>
          <div className="operator-keys">
            <CalculatorKey className="calculator-key key-divide" onClick={() => this.performOperation("/")}>÷</CalculatorKey>
            <CalculatorKey className="calculator-key key-multiply" onClick={() => this.performOperation("*")}>x</CalculatorKey>
            <CalculatorKey className="calculator-key key-subtract" onClick={() => this.performOperation("-")}>-</CalculatorKey>
            <CalculatorKey className="calculator-key key-add" onClick={() => this.performOperation("+")}>+</CalculatorKey>
            <CalculatorKey className="calculator-key key-equals" onClick={() => this.performOperation("=")}>=</CalculatorKey>
          </div>
        </div>
      </div>      
    )
   }
  }
  
  ReactDOM.render(<Calculator/>, document.getElementById("app"));