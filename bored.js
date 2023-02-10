const form = document.querySelector('#bored-form')
const typesInputElement = document.querySelector('#categories')
const submitButton = document.querySelector('#submit-button')
const priceRange = document.querySelector('#price-range')




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


function getParticipantsCount() {
    const participantsCount = form.participant.value
    return participantsCount
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

const noActivityError = document.createElement('p')
noActivityError.classList.add('no-activity-error')

function removeAllChildren(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

async function getActivityByParameters() {
    removeAllChildren(activityWrapper)

    let selectedType = typesInputElement.value
    let selectedPrice = priceRange.value/10.0

    const res = await fetch(`https://www.boredapi.com/api/activity?type=${selectedType}&participants=${getParticipantsCount()}&maxprice=${selectedPrice}`)
    const data = await res.json()

    form.after(activityWrapper)
    
    if (!data.hasOwnProperty('error')) {
        
        let price = data.price*10

        activityType.textContent = `Type: ${data.type}`
        console.log(data)
        activityDescription.textContent = `Activity: ${data.activity}`
        activityPrice.textContent = `Price (0-10): ${price}`
        activityParticipants.textContent = `Participants: ${getParticipantsCount()}`
        console.log(data)

        activityWrapper.append(activityType, activityDescription, activityPrice, activityParticipants)

    } else {

        noActivityError.textContent = `${data.error}`
        activityWrapper.append(noActivityError)
    }
 
}



function boredAPI() {
    listSelectionOptions(typesInputElement)
    addRangeInput(priceRange, 0, 10, 0.5)

    form.addEventListener('submit', async (event) => {
        event.preventDefault()
        getParticipantsCount()
        await getActivityByParameters()
        // form.reset()
    })

}
boredAPI()






