import { Server } from 'socket.io'

import { getCurrentPlayingTrackInSpotify } from '../utils/get-current-track-spotify'

let globalTimer: Timer | null = null

export function startGlobalTimer(io: Server) {
  if (globalTimer) {
    return
  }

  console.log('Starting global timer')
  globalTimer = setInterval(async () => {
    try {
      const track = await getCurrentPlayingTrackInSpotify()
      io.emit('current-track', track)
    } catch (error) {
      console.error('Error fetching track:')
    }
  }, 5000)
}

export function stopGlobalTimer() {
  if (globalTimer) {
    clearInterval(globalTimer)
    globalTimer = null
  }
}
