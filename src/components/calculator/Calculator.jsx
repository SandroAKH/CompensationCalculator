import React, { useState, useEffect } from "react";
import "./Calculator.scss";

import { Form, Formik } from "formik";
import * as Yup from "yup";

const MAXDAYS = 240;
const DAYS = 182;
const RATE = 0.7;
const UNPAYED_LEAVE = 3;
const EMPLOYER_LEAVE = 5;

function Calculator() {
  const [calculateInsuranceDays, setCalculateInsuranceDays] = useState(0);
  const [calculaEmployerDays, setCalculaEmployerDays] = useState(0);
  const [employerComp, seEmployerComp] = useState(0);
  const [insuranceComp, setInsuranceComp] = useState(0);
  const [dailyIncome, setDailyIncome] = useState(0);
  const [net, setNet] = useState(0);
  const [total, setTotal] = useState(0);

  // const onChange = () => {
  //   setPositive((prev) => (prev = !prev));
  // };
  // const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

  const calculationForm = Yup.object().shape({
    income: Yup.number()
      .required()
      .positive()
      .integer()
      .max(99999, "max charecters 5"),
    leave: Yup.number()
      .required()
      .positive()
      .integer()
      .min(4, "minimum days of compensation cant be lower then 4"),
  });
  const submitForm = (values) => {
    let dailyIncome = 0;
    let calculatedMaxDays = 0;
    let insuranceDays = 0;
    let employerDays = 0;

    const calculatedValues = {
      leave: values.leave,
      income: values.income,
      positive: values.positive,
    };
    calculatedValues.positive
      ? (calculatedMaxDays = MAXDAYS)
      : (calculatedMaxDays = DAYS);
    dailyIncome = (RATE * calculatedValues.income) / 30;
    setDailyIncome(dailyIncome);

    // console.log(dailyIncome);
    // console.log(calculatedMaxDays);
    // console.log(calculatedValues.positive);
    // console.log(calculatedMaxDays);
    // console.log(calculatedValues.leave, "leave");
    // console.log(calculatedValues.income, "income");

    if (calculatedValues.positive) {
      if (
        calculatedValues.leave > MAXDAYS + UNPAYED_LEAVE + EMPLOYER_LEAVE ||
        (calculatedValues.leave >= MAXDAYS + UNPAYED_LEAVE &&
          calculatedValues.leave <= MAXDAYS + UNPAYED_LEAVE + EMPLOYER_LEAVE)
      ) {
        employerDays = EMPLOYER_LEAVE;
        insuranceDays = calculatedMaxDays - EMPLOYER_LEAVE;
      } else if (
        calculatedValues.leave >= 9 &&
        calculatedValues.leave < MAXDAYS + UNPAYED_LEAVE
      ) {
        insuranceDays =
          calculatedValues.leave - (UNPAYED_LEAVE + EMPLOYER_LEAVE);
        employerDays = EMPLOYER_LEAVE;
      } else {
        employerDays = calculatedValues.leave - UNPAYED_LEAVE;

        insuranceDays = 0;
      }
    } else {
      if (
        calculatedValues.leave > DAYS + EMPLOYER_LEAVE + UNPAYED_LEAVE ||
        (calculatedValues.leave >= DAYS + UNPAYED_LEAVE &&
          calculatedValues.leave <= DAYS + EMPLOYER_LEAVE + UNPAYED_LEAVE)
      ) {
        insuranceDays = calculatedMaxDays - EMPLOYER_LEAVE;
        employerDays = EMPLOYER_LEAVE;
      } else if (
        calculatedValues.leave >= 9 &&
        calculatedValues.leave <= DAYS + UNPAYED_LEAVE
      ) {
        insuranceDays =
          calculatedValues.leave - (UNPAYED_LEAVE + EMPLOYER_LEAVE);
        employerDays = EMPLOYER_LEAVE;
      } else {
        employerDays = calculatedValues.leave - UNPAYED_LEAVE;
        insuranceDays = 0;
      }
    }
    setCalculaEmployerDays(employerDays);
    setCalculateInsuranceDays(insuranceDays);
    seEmployerComp(employerDays * dailyIncome);
    setInsuranceComp(insuranceDays * dailyIncome);
    setNet(employerDays + insuranceDays);
    setTotal(employerDays * dailyIncome + insuranceDays * dailyIncome);
  };
  useEffect(() => {}, [net, calculateInsuranceDays]);
  return (
    <div className="Calculator">
      <Formik
        initialValues={{
          leave: "",
          income: "",
          positive: false,
        }}
        validationSchema={calculationForm}
        // onSubmit={async (values, { resetForm }) => {
        //   await sleep(500);
        //   submitForm(values);
        //   resetForm();
        // }}
        onSubmit={(values, { resetForm }) => {
          submitForm(values);
          resetForm();
        }}
      >
        {({ errors, touched, values, handleChange, setFieldValue }) => (
          <Form>
            <h4>Compensation Calculator</h4>
            <div className="input-wrapper">
              <label htmlFor="income">Average income</label>
              <input
                id="income"
                onChange={handleChange}
                type="number"
                value={values.income}
                max="99999"
                className="income-num income"
              />
              {errors.income && touched.income ? (
                <div className="error">{errors.income}</div>
              ) : null}
            </div>
            <div className="input-wrapper">
              <label htmlFor="leave">Days on sick-leave</label>
              <input
                type="number"
                id="leave"
                onChange={handleChange}
                value={values.leave}
                max="1000"
                className="leave-days leave"
              />

              {errors.leave && touched.leave ? (
                <div className="error">{errors.leave}</div>
              ) : null}
            </div>
            <div className="checkbox-wrapper">
              <input
                type="checkbox"
                id="check"
                value={values.positive}
                checked={values.positive}
                onChange={() => setFieldValue("positive", !values.positive)}
              />
              <label htmlFor="check" className="checker"></label>
              <label
                htmlFor="check"
                onChange={() => setFieldValue("positive", !values.positive)}
              >
                I have tubercolosis
              </label>
            </div>
            <button type="submit" name="submit">
              Calculate
            </button>
          </Form>
        )}
      </Formik>
      <div className="calculator-payment">
        <div>
          <p>
            The employer compensates
            <span>{calculaEmployerDays} days</span>
          </p>
          <p>{employerComp.toFixed(2)}€</p>
          <p>
            Daily allowance <span>{dailyIncome.toFixed(2)} €</span>
          </p>
        </div>
        <div>
          <p>
            Health Insurance compensates
            <span>{calculateInsuranceDays} days</span>
          </p>
          <p>{insuranceComp.toFixed(2)}€</p>
          <p>
            Daily allowance <span> {dailyIncome.toFixed(2)} €</span>{" "}
          </p>
        </div>
      </div>
      <div className="calculator-total">
        <p>Compensation total for {net} days (net)</p>
        <p>{total.toFixed(2)}€</p>
      </div>
    </div>
  );
}

export default Calculator;
