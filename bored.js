const form = document.querySelector('#bored-form')
const typesInputElement = document.querySelector('#categories')
const submitButton = document.querySelector('#submit-button')
const priceRange = document.querySelector('#price-range')
const descriptionWrapper = document.querySelector('.activity-wrapper')



function listSelectionOptions(selectElement) {
    let typesArr = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    typesArr.map(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option
        optionElement.textContent = option[0].toUpperCase() + option.slice(1)
        selectElement.append(optionElement)
    }) 
}



function addRangeInput(rangeInput, min, max, step) {
    const rangeOutput = document.querySelector('.range-output')
    rangeInput.min = min
    rangeInput.max = max
    rangeInput.step = step
    // rangeInput.value = max/2
    let defaultValue = rangeInput.value
    
    rangeOutput.textContent = defaultValue
    console.log(rangeInput.value)
    
    rangeInput.addEventListener('input', (event) => {
        rangeOutput.textContent = event.target.value
        console.log(event.target.value)
        
    })

}


const activityType = document.createElement('p')
activityType.classList.add('activity-type')

const activityDescription = document.createElement('p')
activityDescription.classList.add('activity-description')


const activityPrice = document.createElement('p')
activityPrice.classList.add('activity-price')






function getActivityByParameters() {

    let selectedType = typesInputElement.value
    let selectedPrice = priceRange.value/10.0

    fetch(`https://www.boredapi.com/api/activity?type=${selectedType}&maxprice=${selectedPrice}`)
    .then(res => res.json())
    .then(data => {

        let price = data.price*10

        activityType.textContent = `Type: ${data.type}`
        activityDescription.textContent = `Activity: ${data.activity}`
        activityPrice.textContent = `Price (0-10): ${price}`
        console.log(data)
    })
}

descriptionWrapper.append(activityType, activityDescription, activityPrice)


function boredAPI() {
    listSelectionOptions(typesInputElement)
    addRangeInput(priceRange, 0, 10, 0.5)

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        getActivityByParameters()

    })

}
boredAPI()