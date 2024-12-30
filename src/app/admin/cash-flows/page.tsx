"use client";
import React from "react";
import { Row, Tabs } from "antd";
import FeeGrid from "components/Grids/Fee/page";
import SalariesGrid from "components/Grids/Salaries";
import ExpensesGrid from "components/Grids/Expenses";
import "./index.scss"

const onChange = (key: string) => {
  console.log(key);
};

function CashFlows() {
  return (
    <div>
      <div className="p-[20px] bg-white">
        <span className="font-roboto text-base font-medium leading-[18.75px] text-center text-[#5B626B]">
          CashFlows
        </span>
      </div>
      <Row className="settings-page bg-white py-[10px] px-[60px]">
        <Tabs
          className="w-full"
          onChange={onChange}
          type="card"
          size="large"
          items={[
            {
              label: `Cash In-Flows`,
              key: "1",
              children: <FeeGrid />,
            },
            {
              label: `Cash Out-Flows`,
              key: "2",
              children: (
                <>
                  {/* <div className="p-[20px] bg-white">
                  <span className="font-roboto text-base font-medium leading-[18.75px] text-center text-[#5B626B]">
                    Salaries & Expenses
                  </span>
                </div> */}
                  <Row className="settings-page bg-white py-[10px] px-[20px]">
                    <Tabs
                      className="w-full"
                      onChange={onChange}
                      type="card"
                      size="small"
                      items={[
                        {
                          label: `Salaries`,
                          key: "1",
                          children: <SalariesGrid />,
                        },
                        {
                          label: `Expenses`,
                          key: "2",
                          children: <ExpensesGrid />,
                        },
                      ]}
                    />
                  </Row>
                </>
              ),
            },
          ]}
        />
      </Row>
    </div>
  );
}

export default CashFlows;
