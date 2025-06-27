// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-type-assertion, sonarjs/pseudo-random, unicorn/prefer-global-this */
;(() => {
  let remainingLives = 3
  let score = 0

  const mosquitoLifeMillis = 1100
  const pointsPerMosquito = 2
  const eatEvent: 'click' | 'mouseover' = 'mouseover'

  /*
   * Game screen size
   */

  const margin = 100
  const width = window.innerWidth
  const height = window.innerHeight

  /*
   * Mosquito Logic
   */

  const currentScoreElement = document.querySelector(
    '#current-score'
  ) as HTMLSpanElement

  function createRandomMosquito(): void {
    let mosquitoElement: HTMLImageElement | null =
      document.querySelector('#mosquito')

    // Remove the previous mosquito (if there's any...)

    if (mosquitoElement !== null) {
      mosquitoElement.remove()

      if (remainingLives > 0) {
        ;(
          document.querySelector('#life' + remainingLives) as HTMLInputElement
        ).src = 'images/empty_heart.png'
        remainingLives--
      }

      if (remainingLives <= 0) {
        window.location.href = 'gameOver.html?' + score
      }
    }

    // Calculate the position of the new mosquito

    const positionX = Math.floor(Math.random() * (width - margin * 3)) + margin
    const positionY = Math.floor(Math.random() * (height - margin * 3)) + margin

    // Create the mosquito element

    mosquitoElement = document.createElement('img')

    mosquitoElement.className = `animate__animated animate__shakeX ${randomMosquitoSize()} ${randomMosquitoDirection()}`

    mosquitoElement.id = 'mosquito'

    mosquitoElement.src = 'images/mosquito.png'

    mosquitoElement.style.left = `${positionX}px`
    mosquitoElement.style.top = `${positionY}px`

    mosquitoElement.addEventListener(eatEvent, () => {
      mosquitoElement.remove()
      score += pointsPerMosquito
      currentScoreElement.textContent = score.toString()
    })

    document.body.append(mosquitoElement)
  }

  function randomMosquitoSize(): string {
    const mosquitoSizeClass = Math.floor(Math.random() * 3) + 1

    return `mosquito${mosquitoSizeClass}`
  }

  function randomMosquitoDirection(): string {
    return Math.random() > 0.5 ? 'direction_left' : 'direction_right'
  }

  function scheduleNextMosquito(): void {
    window.setTimeout(function () {
      createRandomMosquito()
      scheduleNextMosquito()
    }, mosquitoLifeMillis)
  }

  scheduleNextMosquito()

  /*
   * Timer
   */

  let time = 60

  const chronometerElement = document.querySelector('#chronometer')

  if (chronometerElement === null) {
    throw new Error('Chronometer element not found')
  }

  chronometerElement.textContent = time.toString()

  window.setInterval(function () {
    time--
    if (time < 0) {
      window.location.href = 'gameOver.html?' + score
    } else {
      chronometerElement.textContent = time.toString()
    }
  }, 1000)
})()
