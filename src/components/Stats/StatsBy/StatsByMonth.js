import React, { useState, useEffect } from 'react';
import axios from 'axios'
import DotLoader from "react-spinners/DotLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const BETS_BASE_URL = 'https://api-tt.onrender.com/api/apuestas/'

const StatsByMonth = (props) => {

  const [ betList, loadBetList ] = useState([])
  const [ spinner, showSpinner ] = useState(false)
  const [ year, updateYear ] = useState({})


  const monthsTotalArray = Object.values(year)

  useEffect(() => {

    async function loadData() {
      try {
        showSpinner(true)
        const resBetList = await axios.get(`${BETS_BASE_URL}stats/${props.statYear}`)
        loadBetList(resBetList.data)
        showSpinner(false)
      } catch (error) {
        console.log(error)
        showSpinner(false)
      }
    }

    loadData()       
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    updateValues()
    // eslint-disable-next-line
  }, [betList])

  const updateValues = () => {

    //------------------BETS ARRAY----------------------------------------

        const betsJanuary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-01-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-01-31T23:59:59.951+00:00`)))
        const betsFebruary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-02-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)))
        const betsMarch = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-31T23:59:59.951+00:00`)))
        const betsApril = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-04-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-04-30T23:59:59.951+00:00`)))
        const betsMay = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-05-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-05-31T23:59:59.951+00:00`)))
        const betsJune = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-06-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-06-30T23:59:59.951+00:00`)))
        const betsJuly = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-07-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-07-31T23:59:59.951+00:00`)))
        const betsAugust = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-08-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-08-31T23:59:59.951+00:00`)))
        const betsSeptember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-09-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-09-30T23:59:59.951+00:00`)))
        const betsOctober = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-10-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-10-31T23:59:59.951+00:00`)))
        const betsNovember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-11-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-11-30T23:59:59.951+00:00`)))
        const betsDecember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-12-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-12-31T23:59:59.951+00:00`)))

    //------------------BETS WIN ARRAY----------------------------------------

        const betsWinJanuary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-01-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-01-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinFebruary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-02-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (elm.status === "win"))
        const betsWinMarch = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinApril = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-04-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-04-30T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinMay = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-05-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-05-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinJune = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-06-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-06-30T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinJuly = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-07-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-07-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinAugust = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-08-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-08-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinSeptember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-09-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-09-30T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinOctober = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-10-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-10-31T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinNovember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-11-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-11-30T23:59:59.951+00:00`)) && (elm.status === "win"))
        const betsWinDecember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-12-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-12-31T23:59:59.951+00:00`)) && (elm.status === "win"))

    //------------------BETS LOSS ARRAY----------------------------------------

        const betsLossJanuary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-01-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-01-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossFebruary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-02-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (elm.status === "loss"))
        const betsLossMarch = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossApril = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-04-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-04-30T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossMay = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-05-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-05-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossJune = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-06-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-06-30T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossJuly = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-07-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-07-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossAugust = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-08-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-08-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossSeptember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-09-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-09-30T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossOctober = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-10-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-10-31T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossNovember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-11-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-11-30T23:59:59.951+00:00`)) && (elm.status === "loss"))
        const betsLossDecember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-12-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-12-31T23:59:59.951+00:00`)) && (elm.status === "loss"))

    //------------------BETS VOID ARRAY----------------------------------------

        const betsVoidJanuary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-01-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-01-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidFebruary = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-02-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (elm.status === "void"))
        const betsVoidMarch = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-03-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-03-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidApril = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-04-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-04-30T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidMay = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-05-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-05-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidJune = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-06-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-06-30T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidJuly = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-07-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-07-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidAugust = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-08-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-08-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidSeptember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-09-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-09-30T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidOctober = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-10-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-10-31T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidNovember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-11-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-11-30T23:59:59.951+00:00`)) && (elm.status === "void"))
        const betsVoidDecember = betList.filter(elm => (new Date(elm.date) > new Date(`${props.statYear}-12-01T00:00:00.951+00:00`)) && (new Date(elm.date) < new Date(`${props.statYear}-12-31T23:59:59.951+00:00`)) && (elm.status === "void"))

    //------------------STAKE----------------------------------------

        const totalStakeJanuary = betsJanuary.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeFebruary = betsFebruary.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeMarch = betsMarch.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeApril = betsApril.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeMay = betsMay.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeJune = betsJune.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeJuly = betsJuly.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeAugust = betsAugust.reduce((acc, elm) => {
            return acc + elm.stake},0)  
        const totalStakeSeptember = betsSeptember.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeOctober = betsOctober.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeNovember = betsNovember.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const totalStakeDecember = betsDecember.reduce((acc, elm) => {
            return acc + elm.stake},0)  
            
    //------------------PROFIT----------------------------------------

        const januaryProfitUds = betsJanuary.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const februaryProfitUds = betsFebruary.reduce((acc, elm) => {
            return acc + elm.profit},0)            
        const marchProfitUds = betsMarch.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const aprilProfitUds = betsApril.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const mayProfitUds = betsMay.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const juneProfitUds = betsJune.reduce((acc, elm) => {
            return acc + elm.profit},0)            
        const julyProfitUds = betsJuly.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const augustProfitUds = betsAugust.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const septemberProfitUds = betsSeptember.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const octoberProfitUds = betsOctober.reduce((acc, elm) => {
            return acc + elm.profit},0)            
        const novemberProfitUds = betsNovember.reduce((acc, elm) => {
            return acc + elm.profit},0)
        const decemberProfitUds = betsDecember.reduce((acc, elm) => {
            return acc + elm.profit},0)

    //-----------------TOTALS-----------------------------------------------

        const betsYear = betList.length
        const betsWinYear = betList.filter(elm => elm.status === "win")
        const betsLossYear = betList.filter(elm => elm.status === "loss")
        const betsVoidYear = betList.filter(elm => elm.status === "void")
        const totalStakeYear = betList.reduce((acc, elm) => {
            return acc + elm.stake},0)
        const yearProfitUds = betList.reduce((acc, elm) => {
            return acc + elm.profit},0)


        updateYear({
            january : {
                bets: betsJanuary.length,
                wins: betsWinJanuary.length,
                loss: betsLossJanuary.length,
                void: betsVoidJanuary.length,
                percent: ((betsWinJanuary.length / (betsLossJanuary.length + betsWinJanuary.length)) * 100).toFixed(2),
                averageStake: (totalStakeJanuary / betsJanuary.length).toFixed(2),
                totalUds: totalStakeJanuary.toFixed(2),
                profitUds: januaryProfitUds.toFixed(2),
                yield: ((januaryProfitUds * 100) / totalStakeJanuary).toFixed(2),
                month: "Enero"
            },
            february: {
                bets: betsFebruary.length,
                wins: betsWinFebruary.length,
                loss: betsLossFebruary.length,
                void: betsVoidFebruary.length,
                percent: ((betsWinFebruary.length / (betsLossFebruary.length + betsWinFebruary.length)) * 100).toFixed(2),
                averageStake: (totalStakeFebruary / betsFebruary.length).toFixed(2),
                totalUds: totalStakeFebruary.toFixed(2),
                profitUds: februaryProfitUds.toFixed(2),
                yield: ((februaryProfitUds * 100) / totalStakeFebruary).toFixed(2),
                month: "Febrero"
            },
            march: {
                bets: betsMarch.length,
                wins: betsWinMarch.length,
                loss: betsLossMarch.length,
                void: betsVoidMarch.length,
                percent: ((betsWinMarch.length / (betsLossMarch.length + betsWinMarch.length)) * 100).toFixed(2),
                averageStake: (totalStakeMarch / betsMarch.length).toFixed(2),
                totalUds: totalStakeMarch.toFixed(2),
                profitUds: marchProfitUds.toFixed(2),
                yield: ((marchProfitUds * 100) / totalStakeMarch).toFixed(2),
                month: "Marzo"                
            },
            april: {
                bets: betsApril.length,
                wins: betsWinApril.length,
                loss: betsLossApril.length,
                void: betsVoidApril.length,
                percent: ((betsWinApril.length / (betsLossApril.length + betsWinApril.length)) * 100).toFixed(2),
                averageStake: (totalStakeApril / betsApril.length).toFixed(2),
                totalUds: totalStakeApril.toFixed(2),
                profitUds: aprilProfitUds.toFixed(2),
                yield: ((aprilProfitUds * 100) / totalStakeApril).toFixed(2),
                month: "Abril"
            },
            may: {
                bets: betsMay.length,
                wins: betsWinMay.length,
                loss: betsLossMay.length,
                void: betsVoidMay.length,
                percent: ((betsWinMay.length / (betsLossMay.length + betsWinMay.length)) * 100).toFixed(2),
                averageStake: (totalStakeMay / betsMay.length).toFixed(2),
                totalUds: totalStakeMay.toFixed(2),
                profitUds: mayProfitUds.toFixed(2),
                yield: ((mayProfitUds * 100) / totalStakeMay).toFixed(2),
                month: "Mayo"
            },
            june: {
                bets: betsJune.length,
                wins: betsWinJune.length,
                loss: betsLossJune.length,
                void: betsVoidJune.length,
                percent: ((betsWinJune.length / (betsLossJune.length + betsWinJune.length)) * 100).toFixed(2),
                averageStake: (totalStakeJune / betsJune.length).toFixed(2),
                totalUds: totalStakeJune.toFixed(2),
                profitUds: juneProfitUds.toFixed(2),
                yield: ((juneProfitUds * 100) / totalStakeJune).toFixed(2),
                month: "Junio"
            },
            july: {
                bets: betsJuly.length,
                wins: betsWinJuly.length,
                loss: betsLossJuly.length,
                void: betsVoidJuly.length,
                percent: ((betsWinJuly.length / (betsLossJuly.length + betsWinJuly.length)) * 100).toFixed(2),
                averageStake: (totalStakeJuly / betsJuly.length).toFixed(2),
                totalUds: totalStakeJuly.toFixed(2),
                profitUds: julyProfitUds.toFixed(2),
                yield: ((julyProfitUds * 100) / totalStakeJuly).toFixed(2),
                month: "Julio"
            },
            august: {
                bets: betsAugust.length,
                wins: betsWinAugust.length,
                loss: betsLossAugust.length,
                void: betsVoidAugust.length,
                percent: ((betsWinAugust.length / (betsLossAugust.length + betsWinAugust.length)) * 100).toFixed(2),
                averageStake: (totalStakeAugust / betsAugust.length).toFixed(2),
                totalUds: totalStakeAugust.toFixed(2),
                profitUds: augustProfitUds.toFixed(2),
                yield: ((augustProfitUds * 100) / totalStakeAugust).toFixed(2),
                month: "Agosto"
            },
            september: {
                bets: betsSeptember.length,
                wins: betsWinSeptember.length,
                loss: betsLossSeptember.length,
                void: betsVoidSeptember.length,
                percent: ((betsWinSeptember.length / (betsLossSeptember.length + betsWinSeptember.length)) * 100).toFixed(2),
                averageStake: (totalStakeSeptember / betsSeptember.length).toFixed(2),
                totalUds: totalStakeSeptember.toFixed(2),
                profitUds: septemberProfitUds.toFixed(2),
                yield: ((septemberProfitUds * 100) / totalStakeSeptember).toFixed(2),
                month: "Septiembre"
            },
            october: {
                bets: betsOctober.length,
                wins: betsWinOctober.length,
                loss: betsLossOctober.length,
                void: betsVoidOctober.length,
                percent: ((betsWinOctober.length / (betsLossOctober.length + betsWinOctober.length)) * 100).toFixed(2),
                averageStake: (totalStakeOctober / betsOctober.length).toFixed(2),
                totalUds: totalStakeOctober.toFixed(2),
                profitUds: octoberProfitUds.toFixed(2),
                yield: ((octoberProfitUds * 100) / totalStakeOctober).toFixed(2),
                month: "Octubre"
            },
            november: {
                bets: betsNovember.length,
                wins: betsWinNovember.length,
                loss: betsLossNovember.length,
                void: betsVoidNovember.length,
                percent: ((betsWinNovember.length / (betsLossNovember.length + betsWinNovember.length)) * 100).toFixed(2),
                averageStake: (totalStakeNovember / betsNovember.length).toFixed(2),
                totalUds: totalStakeNovember.toFixed(2),
                profitUds: novemberProfitUds.toFixed(2),
                yield: ((novemberProfitUds * 100) / totalStakeNovember).toFixed(2),
                month: "Noviembre"

            },
            december: {
                bets: betsDecember.length,
                wins: betsWinDecember.length,
                loss: betsLossDecember.length,
                void: betsVoidDecember.length,
                percent: ((betsWinDecember.length / (betsLossDecember.length + betsWinDecember.length)) * 100).toFixed(2),
                averageStake: (totalStakeDecember / betsDecember.length).toFixed(2),
                totalUds: totalStakeDecember.toFixed(2),
                profitUds: decemberProfitUds.toFixed(2),
                yield: ((decemberProfitUds * 100) / totalStakeDecember).toFixed(2),
                month: "Diciembre"
            },
            total: {
                bets: betsYear,
                wins: betsWinYear.length,
                loss: betsLossYear.length,
                void: betsVoidYear.length,
                percent: ((betsWinYear.length / (betsLossYear.length + betsWinYear.length)) * 100).toFixed(2),
                averageStake: (totalStakeYear / betsYear).toFixed(2),
                totalUds: totalStakeYear.toFixed(2),
                profitUds: yearProfitUds.toFixed(2),
                yield: ((yearProfitUds * 100) / totalStakeYear).toFixed(2),
                month: "Total Año"
            }
        })
    }

  return (
    <div className = "table-container-full">
      { spinner ?
        <div>
          <DotLoader 
            color={"#3860fb"} 
            loading={spinner} 
            css={override} 
            size={150} />
        </div>
        :
        <table className = "table-container-stats">
          <thead>
            <tr className = "stats-table-tr">
              <th>Mes</th>
              {!props.isDesktop &&
              <th>Picks</th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-win"></div></th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-loss"></div></th>}
              {!props.isDesktop &&
              <th><div className = "stats-th stats-th-void"></div></th>}
              
              <th>Acierto</th>
              {!props.isDesktop &&
              <th>Stake Medio</th>}
              {!props.isDesktop &&
              <th>Uds Jugadas</th>}
              <th>Yield</th>
              <th>{props.isDesktop ? 'Profit' : 'Uds Ganadas'}</th>
            </tr>
          </thead>

          <tbody>
            {monthsTotalArray.map((item => (
            <tr className = "stats-table-tr-body" key = {item.month}>
              <td className = "stats-item-name">{item.month}</td>
              {!props.isDesktop &&
              <td>{item.bets}</td>}
              {!props.isDesktop &&
              <td>{item.wins}</td>}
              {!props.isDesktop &&
              <td>{item.loss}</td>}
              {!props.isDesktop &&
              <td>{item.void}</td>}
              
              <td>{item.percent !== "NaN" ? `${item.percent}%` : "N/A"}</td>
              {!props.isDesktop &&
              <td>{item.averageStake === "NaN" ? "0.00" : item.averageStake}</td>}
              {!props.isDesktop &&
              <td>{item.totalUds}</td>}
              <td className = {item.yield === "NaN" ? "stats-blue" : (item.yield < 0 ? "stats-red" : "stats-green")}>{item.yield !== "NaN" ? `${item.yield}%` : "N/A"}</td>
              <td className = {parseInt(item.profitUds) === 0 ? "stats-blue" : (item.profitUds > 0 ? "stats-green" : "stats-red")}>{item.profitUds}</td>
            </tr>
            )))}
          </tbody>
        </table>
      }
    </div>
  );
}
 
export default StatsByMonth;