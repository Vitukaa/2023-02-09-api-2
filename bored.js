const form = document.querySelector('#bored-form')
const typesInputElement = document.querySelector('#categories')
const submitButton = document.querySelector('#submit-button')
const priceRange = document.querySelector('#price-range')
const descriptionWrapper = document.querySelector('.activity-wrapper')

let typesArr = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]

function listSelectionOptions(arr, selectElement) {
    arr.map(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option
        optionElement.textContent = option[0].toUpperCase() + option.slice(1)
        selectElement.append(optionElement)
    }) 
}

let selectedOptionOutput = document.createElement('p')
selectedOptionOutput.classList.add('type-option-output')

const activityDescription = document.querySelector('.activity-description')



const activityOutput = document.createElement('p')

function getActivitiesByType() {

        let selectedOption = typesInputElement.value
        selectedOptionOutput.textContent = `Type selected: ${selectedOption[0].toUpperCase()+selectedOption.slice(1)}`
        activityDescription.append(selectedOptionOutput)

        fetch(`https://www.boredapi.com/api/activity?type=${selectedOption}`)
            .then(res => res.json())
            .then(data => {
                const activity = data.activity
                console.log(data)
                activityOutput.textContent = `Activity: ${activity}`
                activityDescription.append(activityOutput)
            })
}




const priceRangeOutput = document.createElement('p')
priceRangeOutput.classList.add('price-range-output')
const rangeOutput = document.querySelector('.range-output')

function addRangeInput(rangeInput, min, max, step) {
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

    fetch(`https://www.boredapi.com/api/activity?price=${rangeInput.value}`)
        .then(res => res.json())
        .then(data => {
            console.log(data)
        })
    priceRangeOutput.textContent = `Selected price: ${rangeInput.value}`

    
    activityDescription.append(priceRangeOutput)
    rangeInput.after(rangeOutput)
}
// addRangeInput(priceRange, 0, 1, 0.05)


function getActivityByParameters() {
    fetch(`https://www.boredapi.com/api/activity?type=${selectedOutput}&maxprice=${rangeInput.value}`)

}



function boredAPI() {
    listSelectionOptions(typesArr, typesInputElement)
    // addRangeInput(priceRange, 0, 1, 0.05)

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        getActivitiesByType()
        addRangeInput(priceRange, 0, 1, 0.05)

    })

}
boredAPI()