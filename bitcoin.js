const bitcoinWrapper = document.querySelector("#bitcoin-wrapper")


const updateButton = document.createElement('button')
updateButton.classList.add('update-button')
const title = document.createElement('h1')
title.classList.add('title')
const updateTime = document.createElement('h4')
updateTime.classList.add('update-time')
const disclaimer = document.createElement('p')
disclaimer.classList.add('disclaimer')
const currenciesList = document.createElement('ol')

async function getCurrencies() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await res.json()
    for (const currency in data.bpi) {
        let currenciesListItem = document.createElement('li')
        let currencyInfoList = document.createElement('ul')
        currenciesListItem.textContent = currency
        
        for (const content in data.bpi[currency]) {
            let currencyListItem = document.createElement('li')
             currencyListItem.textContent = `${content}: ${data.bpi[currency][content]}`
             currencyInfoList.append(currencyListItem)
            }
            
            currenciesListItem.append(currencyInfoList)
            currenciesList.append(currenciesListItem)
    }
}

async function getContent() {
    const res = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
    const data = await res.json()

    title.textContent = data.chartName
    updateTime.textContent = `Last update: ${data.time.updated}`
    disclaimer.textContent = data.disclaimer
    updateButton.textContent = 'Update'

    getCurrencies()
}

function updateContent() {
    updateButton.addEventListener('click', () => {
        location.reload()
    })
}

bitcoinWrapper.append(title, updateButton, updateTime, currenciesList, disclaimer)


function bitcoinAPI() {
    getContent()
    updateContent()
}
bitcoinAPI()