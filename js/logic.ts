// eslint-disable-next-line @eslint-community/eslint-comments/disable-enable-pair
/* eslint-disable sonarjs/pseudo-random, unicorn/prefer-global-this */
;(() => {
  let remainingLives = 3
  let score = 0

  const mosquitoLifeMillis = 950
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

  function randomMosquitoPosition(): void {
    let mosquitoElement: HTMLImageElement | null =
      document.querySelector('#mosquito')

    // Remove the previous mosquito (if there's any...)
    if (mosquitoElement !== null) {
      mosquitoElement.remove()

      if (remainingLives > 0) {
        document.getElementById('life' + remainingLives).src =
          'images/empty_heart.png'
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
    mosquitoElement.src = 'images/mosquito.png'
    mosquitoElement.className =
      randomMosquitoSize() + ' ' + randomMosquitoDirection()
    mosquitoElement.style.left = positionX + 'px'
    mosquitoElement.style.top = positionY + 'px'
    mosquitoElement.style.position = 'absolute'
    mosquitoElement.id = 'mosquito'

    mosquitoElement.addEventListener(eatEvent, function () {
      mosquitoElement.remove()
      score += pointsPerMosquito
      currentScoreElement.textContent = score.toString()
    })

    document.body.append(mosquitoElement)
  }

  function randomMosquitoSize(): string {
    const mosquitoSizeClass = Math.floor(Math.random() * 3)

    switch (mosquitoSizeClass) {
      case 0: {
        return 'mosquito1'
      }
      case 1: {
        return 'mosquito2'
      }
      default: {
        return 'mosquito3'
      }
    }
  }

  function randomMosquitoDirection(): string {
    const mosquitoDirectionClass = Math.floor(Math.random() * 2)

    return mosquitoDirectionClass === 0 ? 'direction_left' : 'direction_right'
  }

  const createMosquitoInterval = setInterval(function () {
    randomMosquitoPosition()
  }, mosquitoLifeMillis)

  /*
   * Timer
   */

  let time = 60

  const chronometerElement = document.querySelector('#chronometer')

  if (chronometerElement === null) {
    throw new Error('Chronometer element not found')
  }

  chronometerElement.textContent = time.toString()

  const chronometerInterval = setInterval(function () {
    time--
    if (time < 0) {
      clearInterval(chronometerInterval)
      clearInterval(createMosquitoInterval)
      window.location.href = 'gameOver.html?' + score
    } else {
      chronometerElement.textContent = time.toString()
    }
  }, 1000)
})()
