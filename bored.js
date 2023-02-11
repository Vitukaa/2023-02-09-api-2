const form = document.querySelector('#bored-form')
const typesInputElement = document.querySelector('#categories')
const submitButton = document.querySelector('#submit-button')





function listSelectionOptions(selectElement) {
    let typesArr = ["education", "recreational", "social", "diy", "charity", "cooking", "relaxation", "music", "busywork"]
    typesArr.map(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option
        optionElement.textContent = option[0].toUpperCase() + option.slice(1)
        selectElement.append(optionElement)
    }) 
}

const priceRange = document.querySelector('#price-range')
const priceOutput = document.querySelector('.price-output')
const accessibilityRange = document.querySelector('#accessibility-range')
const accessibilityOutput = document.querySelector('.accessibility-output')

function addRangeInput(rangeInput, min, max, step, output) {
    output
    rangeInput.min = min
    rangeInput.max = max
    rangeInput.step = step
    // rangeInput.value = max/2
    let defaultValue = rangeInput.value
    
    output.textContent = defaultValue
    
    rangeInput.addEventListener('input', (event) => {
        output.textContent = event.target.value
    })
}



const activityWrapper = document.createElement('div')
activityWrapper.classList.add('activity-wrapper')



const activityType = document.createElement('p')
activityType.classList.add('activity-type')

const activityDescription = document.createElement('p')
activityDescription.classList.add('activity-description')


const activityPrice = document.createElement('p')
activityPrice.classList.add('activity-price')

const activityParticipants = document.createElement('p')
activityParticipants.classList.add('activity-participants')

const activityAccessibility = document.createElement('p')
activityAccessibility.classList.add('activity-accessibility')

const noActivityError = document.createElement('p')
noActivityError.classList.add('no-activity-error')



function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function getActivityByParameters() {
    removeAllChildren(activityWrapper)

    let selectedParticipant = form.participant.value
    let selectedType = typesInputElement.value
    let selectedPrice = priceRange.value / 10.0
    let selectedAccessibility = accessibilityRange.value / 10.0

    parametersArr = [
        ['type', selectedType],
        ['participants', selectedParticipant],
        ['maxaccessibility', selectedAccessibility],
        ['maxprice', selectedPrice]
    ]

    let parameters = parametersArr.reduce((result, parameterArr, index, arr) => {
        if (index === arr.length - 1) {
            return result + `${parameterArr[0]}=${parameterArr[1]}`
        }
       return result + `${parameterArr[0]}=${parameterArr[1]}&`
    }, '')
    console.log(parameters)

//    console.log(parametersArr.reduce((result, parameterArr) => result + `${parameterArr[0]}=${parameterArr[1]}&`, ''))
//    console.log(parametersArr.map(parameter => `${parameter[0]}=${parameter[1]}`).join('&'))
   
    


    const res = await fetch(`https://www.boredapi.com/api/activity?${parameters}`)
    const data = await res.json()

    form.after(activityWrapper)
    
    if (!data.hasOwnProperty('error')) {
        
        let price = data.price * 10
        let accessibility = data.accessibility * 10


        activityType.textContent = `Type: ${data.type}`
        activityDescription.textContent = `Activity: ${data.activity}`
        activityPrice.textContent = `Price (0-10): ${price}`
        activityParticipants.textContent = `Participants: ${data.participants}`
        activityAccessibility.textContent = `Accessibility (0-10): ${accessibility}`

        activityWrapper.append(activityType, activityDescription, activityPrice, activityParticipants, activityAccessibility)

    } else {
        noActivityError.textContent = `${data.error}`
        activityWrapper.append(noActivityError)
    }
 
}



function boredAPI() {
    listSelectionOptions(typesInputElement)
    addRangeInput(priceRange, 0, 10, 0.5, priceOutput)
    addRangeInput(accessibilityRange, 0, 10, 0.5, accessibilityOutput)

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        await getActivityByParameters()
    })

}
boredAPI()






