import React from 'react';
import { Chart } from 'react-google-charts';
import { useQuery } from '@apollo/react-hooks'; 

import { GET_WATCHES } from '../../queries/queries';
import ProductList from "../Main/ProductList/ProductList";


const Overview = () => {

    // Queries the watches from the backend
    const query = useQuery(GET_WATCHES);
    const { loading, error, data } = query;

    const loader = (
        <div className="spinner-grow text-warning ml-3" role="status">
            <span className="sr-only">Loading...</span>
        </div>
    );

    if (loading) return loader;

    if (error) return <p> Error..... </p>;
    
    let { countries, types } = data.watches;



    // Converts the data to be integers, so the google charts can understand them
    countries = countries.map(a => [a[0], parseInt(a[1])]);
    types = types.map(a => [a[0], parseInt(a[1])]);

    // If there's no data, insert empty data.
    if(countries.length === 0) countries = ["", 0]
    if(types.length === 0) types = ["", 0]


    return (
        <div className="gl-main-container container">

            <h1> Besøkstatistikk </h1> 
            <h6 className="text-polet-dark"><i> Et besøk registreres når en bruker klikker seg inn på et produkt </i></h6>
            <hr/>


            <div className="row">
                <div className="col-lg-6">
                    <Chart
                        height="400px"
                        chartType="BarChart"
                        loader={"Loading"}
                        data={[
                            ["Type", "Besøk"],
                            ...types
                        ]}
                        options={{
                            title: 'Antall besøk per produkttype',
                            colors: ['#C2B067'],
                            legend: "none",
                            toggle: false,

                        }}
                    />
                </div>

                <div className="col-lg-6">
                    <Chart
                        height="400px"
                        chartType="BarChart"
                        loader={"Loading"}
                        data={[
                            ["Land", "Besøk"],
                            ...countries
                        ]}
                        options={{
                            title: 'Antall besøk per land',
                            colors: ['#C2B067'],
                            legend: "none"
                            
                        }}
                    />
                </div>

            </div>


            <div className="row">
                <div className="col">
                    <h1> Dine favoritter </h1>
                    <hr/>
                    <ProductList isFavorited={true} />
                </div>
            </div>
        </div>
    );
};


export default Overview;