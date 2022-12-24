import React, { useState } from "react";
import "./Info.scss";
import { styled } from "@mui/material/styles";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
function Info() {
  const [expanded, setExpanded] = useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  let data = [
    {
      title: "Tellus Ullamcorper Inceptos ",
      children: ["Tellus Ullamcorper 1", "atoos partos 1"],
    },
    {
      title: "Magna Condimentum",
      children: ["Mattis Tristique 2", "atoos partos 2"],
    },
    {
      title: "Aenean Inceptos ",
      children: ["Mattis Tristique 3", "atoos partos 3"],
    },
    {
      title: "Parturient Bibendum",
      children: ["Mattis Tristique 4", "atoos partos 4"],
    },
  ];

  const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
  ))(({ theme }) => ({
    border: `1px solid ${theme.palette.divider}`,
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&:hover": {
      backgroundColor: "#f8f8f8",
      transition: "0.2s ease-in-out",
    },
  }));

  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary {...props} />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));

  return (
    <div className="Info">
      <section className="info-text-section">
        <div>
          <h1>Quam Tristique Condimentum</h1>
          <p>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula,
            eget lacinia odio sem nec elit. Cum sociis natoque penatibus et
            magnis dis parturient montes, nascetur ridiculus mus.
            <span>Curabitur blandit </span> tempus porttitor. Integer posuere
            erat a ante venenatis dapibus posuere velit aliquet. Vestibulum id
            ligula porta felis euismod semper.
          </p>
        </div>
        <div>
          <div>
            <h2>Fringilla Euismod Adipiscing Ipsum</h2>
            <p>
              Cum sociis natoque penatibus et magnis dis parturient montes,
              nascetur ridiculus mus. Maecenas faucibus mollis interdum. Aenean
              lacinia bibendum nulla sed.
            </p>
          </div>
          <div className="info-image"></div>
        </div>
      </section>
      <section className="acordion-section">
        {" "}
        {data.map((item, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === item.title}
              onChange={handleChange(item.title)}
            >
              <AccordionSummary
                aria-controls="panel1bh-content"
                id="panel1bh-header"
              >
                <div className="acordion-logo"></div>
                <p className="acordion-name" id={index}>
                  {" "}
                  {item.title}
                </p>
              </AccordionSummary>
              <ul>
                {item.children.length > 0 &&
                  item.children.map((child, index) => {
                    return (
                      <li key={index} id={index} className="list-item">
                        {" "}
                        <div className="list-item-logo "></div>
                        {child}
                      </li>
                    );
                  })}
              </ul>
            </Accordion>
          );
        })}
      </section>
    </div>
  );
}

export default Info;
