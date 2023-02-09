let hours = minutes = seconds = currentHourRotation = currentMinuteRotation = currentSecondRotation = 0

const hourEl = document.querySelector('#hour')
const minuteEl = document.querySelector('#minute')
const secondEl = document.querySelector('#second')
const clockNumbers = document.querySelectorAll('.clock-numbers')

const getHands = () => {
  const currentHourElTransform = window.getComputedStyle(hourEl).transform
  if (currentHourElTransform !== 'none') {
    const values = currentHourElTransform.split('(')[1].split(')')[0].split(',')
    const a = values[0]
    const b = values[1]
    currentMinuteRotation = currentSecondRotation = currentHourRotation = Math.round(Math.atan2(b, a) * (180 / Math.PI))
  }
}

const time = () => {
  const currentTime = new Date()
  hours = currentTime.getHours()
  minutes = currentTime.getMinutes()
  seconds = currentTime.getSeconds()
  moveHands()
  clockNumbers.forEach(num => {
    (+num.dataset.num === hours || +num.dataset.num === (hours - 12)) ? num.classList.add('selected-hour') : num.classList.remove('selected-hour') 
    return (hours.toString().length > 1) ? num.innerText = +num.dataset.num + 12 : num.innerText = num.datset.num     
  })
}

window.onload = () => {
  getHands()
  time()
  setInterval(() => {
    time()
  }, 1000)
}

const moveHands = () => {
  hourEl.style.transform = `rotate(${currentHourRotation + (hours * 30) + (minutes / 2)}deg)`
  minuteEl.style.transform = `rotate(${currentMinuteRotation + minutes * 6}deg)`
  secondEl.style.transform = `rotate(${currentSecondRotation + seconds * 6}deg)`
}

