import React, { Component } from "react";

import "../App.css";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

class DataParser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      data2: []
    };
    this.updateData = this.updateData.bind(this);
    this.updateData2 = this.updateData2.bind(this);
    this.numberWithCommas = this.numberWithCommas.bind(this);
  }
  componentWillMount() {
    const csvFilePath = require("../data/rotations.csv");
    const csvFilePath2 = require("../data/spots.csv");

    const Papa = require("papaparse/papaparse.min.js");
    Papa.parse(csvFilePath, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData
    });
    Papa.parse(csvFilePath2, {
      header: true,
      download: true,
      skipEmptyLines: true,
      complete: this.updateData2
    });
  }

  updateData(result) {
    const jsonData = result.data;
    this.setState({ data: jsonData });

    console.log("this.state.data", this.state.data);
  }
  updateData2(result) {
    const jsonData2 = result.data;
    this.setState({ data2: jsonData2 });

    console.log("this.state.data2", this.state.data2);
  }

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
  render() {
    const { data2 } = this.state;

    let totalSpend = 0;
    let totalViews = 0;
    let totalFirstCreativeSpend = 0;
    let totalFirstCreativeViews = 0;
    let totalSecondCreativeSpend = 0;
    let totalSecondCreativeViews = 0;

    let morningSpendOneDate = 0;
    let morningViewsOneDate = 0;
    let morningSpendSecondDate = 0;
    let morningViewsSecondDate = 0;
    let primeSpendOneDate = 0;
    let primeViewsOneDate = 0;
    let primeSpendSecondDate = 0;
    let primeViewsSecondDate = 0;
    let afternoonSpendOneDate = 0;
    let afternoonViewsOneDate = 0;

    let firstCreativeCPV = 0;
    let secondCreativeCPV = 0;

    let morningFirstCreativeCPV = 0;
    let morningSecondCreativeCPV = 0;
    let afternoonFirstCreativeCPV = 0;

    let primeSecondCreativeCPV = 0;

    for (let i = 0; i < data2.length; i++) {
      totalSpend += Number(data2[i].Spend);
    }
    for (let i = 0; i < data2.length; i++) {
      totalViews += Number(data2[i].Views);
    }
    let finalTotalSpend = this.numberWithCommas(totalSpend);
    console.log("total spend", finalTotalSpend);
    console.log("total views", totalViews);
    console.log("total creative", data2.length);
    for (let i = 0; i < data2.length; i++) {
      if (data2[i].Creative === "TEST001H") {
        totalFirstCreativeSpend += Number(data2[i].Spend);
        totalFirstCreativeViews += Number(data2[i].Views);
      } else {
        totalSecondCreativeSpend += Number(data2[i].Spend);
        totalSecondCreativeViews += Number(data2[i].Views);
      }
    }
    let finalFirstCreativeSpend = Number(totalFirstCreativeSpend).toFixed(2);
    let finalSecondCreativeSpend = Number(totalSecondCreativeSpend).toFixed(2);
    firstCreativeCPV = Number(totalFirstCreativeSpend / totalFirstCreativeViews).toFixed(2);
    secondCreativeCPV = Number(totalSecondCreativeSpend / totalSecondCreativeViews).toFixed(2);
    console.log("total First Creative spend", this.numberWithCommas(finalFirstCreativeSpend));
    console.log("total First Creative views", totalFirstCreativeViews);
    console.log("CPV First Creative", firstCreativeCPV);

    console.log("total Second Creative spend", finalSecondCreativeSpend);
    console.log("total Second Creative views", totalSecondCreativeViews);
    console.log("CPV Second Creative", secondCreativeCPV);
    for (let i = 0; i < data2.length; i++) {
      //evaluate Morning, Afternoon or Prime totals for each date
      if (data2[i].Time.indexOf("AM") !== -1 && data2[i].Date === "01/02/2016") {
        morningSpendOneDate += Number(data2[i].Spend);
        morningViewsOneDate += Number(data2[i].Views);

        morningFirstCreativeCPV = Number(morningSpendOneDate / morningViewsOneDate).toFixed(2);
      } else if (data2[i].Time.indexOf("AM") !== -1 && data2[i].Date === "02/02/2016") {
        morningSpendSecondDate += Number(data2[i].Spend);
        morningViewsSecondDate += Number(data2[i].Views);
        morningSecondCreativeCPV = Number(morningSpendSecondDate / morningViewsSecondDate).toFixed(2);
      } else if (
        data2[i].Time.indexOf("PM") !== -1 &&
        data2[i].Date === "01/02/2016" &&
        data2[i].Time[0] >= "3" &&
        data2[i].Time[0] <= "8"
      ) {
        primeSpendOneDate += Number(data2[i].Spend);
        primeViewsOneDate += Number(data2[i].Views);
        afternoonSpendOneDate += Number(data2[i].Spend);
        afternoonViewsOneDate += Number(data2[i].Views);
        afternoonFirstCreativeCPV = Number(afternoonSpendOneDate / afternoonViewsOneDate).toFixed(2);
      } else if (
        data2[i].Time.indexOf("PM") !== -1 &&
        data2[i].Date === "02/02/2016" &&
        data2[i].Time[0] >= "3" &&
        data2[i].Time[0] <= "8"
      ) {
        primeSpendSecondDate += Number(data2[i].Spend);
        primeViewsSecondDate += Number(data2[i].Views);
        primeSecondCreativeCPV = Number(primeSpendSecondDate / primeViewsSecondDate).toFixed(2);
      } else if (
        data2[i].Time.indexOf("PM") !== -1 &&
        data2[i].Date === "01/02/2016" &&
        data2[i].Time[0] >= "1" &&
        data2[i].Time[0] <= "4"
      ) {
        afternoonSpendOneDate += Number(data2[i].Spend);
        afternoonViewsOneDate += Number(data2[i].Views);
      }
    }

    console.log("morning Spend 01/02/2016", morningSpendOneDate);
    console.log("morning views 01/02/2016", morningViewsOneDate);
    console.log("morning Spend 02/02/2016", morningSpendSecondDate);
    console.log("morning views 02/02/2016", morningViewsSecondDate);

    console.log("prime Spend 01/02/2016", primeSpendOneDate);
    console.log("prime views 01/02/2016", primeViewsOneDate);
    console.log("prime Spend 02/02/2016", primeSpendSecondDate);
    console.log("prime views 02/02/2016", primeViewsSecondDate);

    console.log("afternoon Spend 01/02/2016", afternoonSpendOneDate);
    console.log("afternoon views 01/02/2016", afternoonViewsOneDate);

    return (
      <div>
        <Table size="small" style={{ marginBottom: "40px" }}>
          <TableHead>
            <TableRow>
              <TableCell className="tableCell__header">Total Spots</TableCell>
              <TableCell className="tableCell__header">Total Spend</TableCell>
              <TableCell className="tableCell__header">Total Views</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="tableCell__header__row">{data2.length}</TableCell>
              <TableCell className="tableCell__header__row">${finalTotalSpend}</TableCell>
              <TableCell className="tableCell__header__row">{totalViews}</TableCell>
            </TableRow>
          </TableHead>
        </Table>

        <Grid container spacing={3} style={{ backgroundColor: "#F7F9FD" }}>
          <Grid item xs={12}>
            <Paper
              style={{ margin: "100px", display: "flex", overflow: "auto", flexDirection: "column", backgroundColor: "#fff" }}
              id="totals"
            >
              <Table size="small">
                <TableHead>
                  <div className="tableRow__title__large">By Creative</div>
                  <TableRow>
                    <TableCell className="tableCell__title">Creative</TableCell>
                    <TableCell className="tableCell__title">Spend</TableCell>
                    <TableCell className="tableCell__title">Views</TableCell>
                    <TableCell className="tableCell__title">CPV</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">TEST001H</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(finalFirstCreativeSpend)}</TableCell>
                    <TableCell className="tableCell__row">{totalFirstCreativeViews}</TableCell>
                    <TableCell className="tableCell__row">${firstCreativeCPV}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">TEST002H</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(finalSecondCreativeSpend)}</TableCell>
                    <TableCell className="tableCell__row">{totalSecondCreativeViews}</TableCell>
                    <TableCell className="tableCell__row">${secondCreativeCPV}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={3} style={{ backgroundColor: "#F7F9FD" }}>
          <Grid item xs={12}>
            <Paper
              style={{
                margin: "100px",
                marginTop: "-70px",
                display: "flex",
                overflow: "auto",
                flexDirection: "column",
                backgroundColor: "#fff"
              }}
              id="totals"
            >
              <Table size="small">
                <TableHead>
                  <div className="tableRow__title__large">By Day - Rotation</div>
                  <TableRow>
                    <TableCell className="tableCell__title">Day - Rotation</TableCell>
                    <TableCell className="tableCell__title">Spend</TableCell>
                    <TableCell className="tableCell__title">Views</TableCell>
                    <TableCell className="tableCell__title">CPV</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">01/02/2016 MORNING</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(Number(morningSpendOneDate).toFixed(2))}</TableCell>
                    <TableCell className="tableCell__row">{morningViewsOneDate}</TableCell>
                    <TableCell className="tableCell__row">${morningFirstCreativeCPV}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">01/02/2016 AFTERNOON</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(Number(afternoonSpendOneDate).toFixed(2))}</TableCell>
                    <TableCell className="tableCell__row">{afternoonViewsOneDate}</TableCell>
                    <TableCell className="tableCell__row">${afternoonFirstCreativeCPV}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">01/02/2016 PRIME</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(Number(afternoonSpendOneDate).toFixed(2))}</TableCell>
                    <TableCell className="tableCell__row">{afternoonViewsOneDate}</TableCell>
                    <TableCell className="tableCell__row">${afternoonFirstCreativeCPV}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">02/02/2016 MORNING</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(Number(morningSpendSecondDate).toFixed(2))}</TableCell>
                    <TableCell className="tableCell__row">{morningViewsSecondDate}</TableCell>
                    <TableCell className="tableCell__row">${morningSecondCreativeCPV}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="tableCell__row">02/02/2016 PRIME</TableCell>
                    <TableCell className="tableCell__row">${this.numberWithCommas(Number(primeSpendSecondDate).toFixed(2))}</TableCell>
                    <TableCell className="tableCell__row">{primeViewsSecondDate}</TableCell>
                    <TableCell className="tableCell__row">${primeSecondCreativeCPV}</TableCell>
                  </TableRow>
                </TableHead>
              </Table>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default DataParser;
