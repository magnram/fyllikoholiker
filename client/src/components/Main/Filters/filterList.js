
const productTypes = ["Akevitt", "Portvin", "Vodka", "Druebrennevin", "Whisky", "Likør", "Gin", "Bitter", "Rødvin", "Hvitvin", "Rosévin", "Musserende vin", "Rom", "India pale ale", "Sider", "Annen type"];

const countries = ["Norge", "Tyskland", "Portugal", "Frankrike", "Skottland", "Italia", "USA", "Spania", "Sør-Afrika", "Annet land"];




export default [
    {
        name:"Type",
        filterKey:"filterType",
        type:"checkbox",
        options: { alternatives: productTypes }
    },
    {
        name:"Land",
        filterKey:"filterCountry",
        type:"checkbox",
        options: { alternatives: countries }
    },
    {
        name:"Volum",
        filterKey:"volume",
        type:"slider",
        options: { min: 0, max: 2000, measurementType: "cl" }
    },
    {
        name:"Pris",
        filterKey:"price",
        type:"slider",
        options: { min: 0, max: 42000,measurementType: "kr" }
    },
    {
        name:"Pris per liter",
        filterKey:"pricePerLiter",
        type:"slider",
        options: { min: 0, max: 60000, measurementType: "kr"}
    },
    {
        name:"Alkohol",
        filterKey:"alcohol",
        type:"slider",
        options: { min: 0, max: 60, measurementType: "%" }
    }
];