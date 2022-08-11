//
const URL = "https://mindicador.cl/api/";
const btn = document.querySelector("#btn")
let input = document.querySelector("#input")
const selector = document.querySelector("#selector")
const result = document.querySelector(".result")
const myChart = document.querySelector("#myChart")
let canvas


// llamar a la api
const getCoin = async (coin) => {
    try {
        const res = await fetch(`${URL}${coin}`)
        const data = await res.json()
        return data
    } catch (error) {
        alert("Error ocurrido", e.message)
    }
}

//template render

const conversion = async (coin) => {
    const datos = await getCoin(coin)
    const valorcoin = datos.serie[0].valor
    const conversion = +input.value / +valorcoin
    result.textContent = conversion.toFixed(2)
}




    btn.addEventListener("click", async () => {
        await conversion(selector.value)
        await renderGrafica(selector.value)         
    })


//gráfica como sismos
    const getAndCreateDataToChart = (coinCodigo) => {
        if (canvas) canvas.destroy()

        const titulo = "Divisas y valores"
        const tipodeGrafica = "line"
        const color = "aqua"

        const diezDias = coinCodigo.serie.slice(0,10)
        const fechas = diezDias.map((f) => {
            const fecha = new Date(f.fecha)
            return fecha.toLocaleDateString()   
        });
        
        const valor = diezDias.map((val) => +val.valor)

        const config = {
                type: tipodeGrafica,
                data: {
                    labels: fechas,
                    datasets: [
                        {
                        label: titulo,
                        backgroundColor: color,
                        data: valor
                    },
                ],
            },
        }
        return config;            
    }

    const renderGrafica = async(valores) =>{
        const coinCodigo = await getCoin(valores)
        const config = getAndCreateDataToChart(coinCodigo)
        const chartDOM = document.getElementById("myChart")
        canvas = new Chart(chartDOM, config)
        
    }

