import React, { useState, useEffect } from "react";
import CalculatorKey from "./CalculatorKey";
import "./Calculator.css";
import axios from 'axios';
import usePrevious from "./usePrevious";
function Calculator() {
  const [loading, setLoading] = useState(false);
  const [prevValue, setPrevValue] = useState(null);
  const [nextValue, setNextValue] = useState("0");
  const [op, setOp] = useState(null);
  const [prev_op, setPrevOp] = useState(null);
  const [message, setMessage] = useState(null);

const divisionUrl = "http://localhost:3001/division";
const multiplicationUrl = "http://localhost:3001/multiplication";
const additionUrl = "http://localhost:3001/addition";
const soustractionUrl = "http://localhost:3001/soustraction";

const calculateOp = (firstValue,secondValue) => {
    setOp(null);
    setPrevValue(null);
    setNextValue(null);
    setLoading(true);
    console.log('prev_op : ' + prev_op);
    if(prev_op === '/') {
        axios.post(divisionUrl,  { firstinput: firstValue, secondinput: secondValue} )
        .then(res => {
          console.log({res});
          setLoading(false);
          setNextValue(res.data.resultat);
          setPrevValue(null);
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
          if(err.message){
            setMessage(err.message)
          }else{
            setMessage(err.response.data)
          }
        })
    }

    if(prev_op === '*') {
      axios.post(multiplicationUrl,  { firstinput: firstValue, secondinput: secondValue} )
      .then(res => {
        console.log({res});
        setLoading(false);
        setNextValue(res.data.resultat);
        setPrevValue(null);
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if(err.message){
          setMessage(err.message)
        }else{
          setMessage(err.response.data)
        }
      })
    }
     
    if(prev_op === '+') {
      
      axios.post(additionUrl,  { firstinput: parseFloat(firstValue), secondinput: parseFloat(secondValue) } )
      .then(res => {
        console.log({res});
        setLoading(false);
        setNextValue(res.data.resultat);
        setPrevValue(null);
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if(err.message){
          setMessage(err.message)
        }else{
          setMessage(err.response.data)
        }
      
      })
    }

    if(prev_op === '-') {
      axios.post(soustractionUrl,  { firstinput: firstValue, secondinput: secondValue} )
      .then(res => {
        console.log({res});
        setLoading(false);
        setNextValue(res.data.resultat);
        setPrevValue(null);
      })
      .catch(err => {
        setLoading(false)
        console.log(err)
        if(err.message){
          setMessage(err.message)
        }else{
          setMessage(err.response.data)
        }
        
      })
    }
};



  const prevLoading = usePrevious(loading);

  useEffect(() => {

    if(prevLoading && !loading && message){
      alert(message)
      setMessage(null)
    }
 
  }, [op,nextValue,prevValue, loading, prevLoading]);

 
  const CalculatorOperations = {
  
    "/": (firstValue, secondValue) => firstValue / secondValue
    

 ,
    "*": (firstValue, secondValue) => firstValue * secondValue 
  
    
    
 ,
    "+": (firstValue, secondValue) => firstValue + secondValue,
    "-": (firstValue, secondValue) => firstValue - secondValue,
    "=": (firstValue, secondValue) => secondValue,
  };

  const handleNum = (number) => {
    setNextValue(nextValue === "0" ? String(number) : nextValue + number);
  };

  const insertDot = () => {
    if (!/\./.test(nextValue)) {
      setNextValue(nextValue + ".");
    }
  };


  const clearData = () => {
    setNextValue("0");
    setPrevValue(0);
  };

  const handleOperation = (value) => {

    console.log((value))
    
    if (Number.isInteger(value)) {
      handleNum(parseInt(value, 10));
    } else if (value in CalculatorOperations) {
      if (op === null) {
        setPrevOp(value);
        setOp(value);
        setPrevValue(nextValue);
        setNextValue("");
      }
      if (op) {
        setOp(value);
      }
      if (prevValue && op && nextValue) {

        calculateOp(prevValue, nextValue);
        
      }
    } else if (value === "c") {
      clearData();
    }  else if (value === ".") {
      insertDot();
    }
  };

  return (
    <div className="calculator">
     
      {/* <div className="result">  {prevValue}  {op} {nextValue}    </div>  */}
      <div className="calculator-input">
     

        <div className="result"> 
        
        
        
        {prevValue}  {op} {nextValue}   </div>
      </div>
      <div className="calculator-keypad">
        <div className="keys-function">
          
          <CalculatorKey keyValue={"c"} onClick={handleOperation} />

      
        </div>
        <div className="keys-operators">
          <CalculatorKey keyValue={"+"} onClick={handleOperation} />
          <CalculatorKey keyValue={"-"} onClick={handleOperation} />
          <CalculatorKey keyValue={"*"} onClick={handleOperation} />
          <CalculatorKey keyValue={"/"} onClick={handleOperation} />
          <CalculatorKey keyValue={"="} onClick={handleOperation} />
        </div>
        <div className="keys-numbers">
          <CalculatorKey keyValue={9} onClick={handleOperation} />
          <CalculatorKey keyValue={8} onClick={handleOperation} />
          <CalculatorKey keyValue={7} onClick={handleOperation} />
          <CalculatorKey keyValue={6} onClick={handleOperation} />
          <CalculatorKey keyValue={5} onClick={handleOperation} />
          <CalculatorKey keyValue={4} onClick={handleOperation} />
          <CalculatorKey keyValue={3} onClick={handleOperation} />
          <CalculatorKey keyValue={2} onClick={handleOperation} />
          <CalculatorKey keyValue={1} onClick={handleOperation} />
          <CalculatorKey
            className="key-dot"
            keyValue={"."}
            onClick={handleOperation}
          />
          <CalculatorKey
            className="key-zero"
            keyValue={0}
            onClick={handleOperation}
          />
        </div>
      </div>
    </div>
  );
}

export default Calculator;